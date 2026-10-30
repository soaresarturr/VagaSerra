-- FreeSerra — schema inicial
-- Marketplace de freelas da Serra Gaúcha: empresas publicam vagas,
-- profissionais publicam serviços, e ambos se encontram por cidade e categoria.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Tipos
-- ---------------------------------------------------------------------------

create type account_type as enum ('empresa', 'profissional');
create type work_mode as enum ('presencial', 'hibrido', 'remoto');
create type budget_kind as enum ('projeto', 'hora', 'mensal', 'a_combinar');
create type job_status as enum ('rascunho', 'aberta', 'em_andamento', 'encerrada');

-- ---------------------------------------------------------------------------
-- Catálogos
-- ---------------------------------------------------------------------------

create table cities (
  slug text primary key,
  name text not null,
  sort_order int not null default 0
);

create table categories (
  slug text primary key,
  name text not null,
  description text,
  sort_order int not null default 0
);

insert into cities (slug, name, sort_order) values
  ('caxias-do-sul',   'Caxias do Sul',   1),
  ('bento-goncalves', 'Bento Gonçalves', 2),
  ('farroupilha',     'Farroupilha',     3),
  ('garibaldi',       'Garibaldi',       4),
  ('carlos-barbosa',  'Carlos Barbosa',  5),
  ('flores-da-cunha', 'Flores da Cunha', 6),
  ('gramado',         'Gramado',         7),
  ('canela',          'Canela',          8),
  ('nova-petropolis', 'Nova Petrópolis', 9),
  ('veranopolis',     'Veranópolis',     10),
  ('sao-marcos',      'São Marcos',      11),
  ('vacaria',         'Vacaria',         12);

insert into categories (slug, name, description, sort_order) values
  ('design',        'Design & Marca',         'Identidade visual, embalagens, rótulos, UI', 1),
  ('desenvolvimento','Desenvolvimento',        'Sites, sistemas, e-commerce, automações',    2),
  ('marketing',     'Marketing & Social',     'Tráfego pago, social media, conteúdo',       3),
  ('foto-video',    'Foto & Vídeo',           'Eventos, produtos, vinícolas, drone',        4),
  ('engenharia',    'Engenharia & Projetos',  'CAD, projetos mecânicos, laudos',            5),
  ('turismo',       'Turismo & Eventos',      'Guias, receptivo, produção de eventos',      6),
  ('idiomas',       'Idiomas & Tradução',     'Italiano, inglês, espanhol, versões',        7),
  ('financas',      'Finanças & Contábil',    'BPO financeiro, contabilidade, fiscal',      8);

-- ---------------------------------------------------------------------------
-- Perfis
-- ---------------------------------------------------------------------------

-- Um perfil por usuário do Supabase Auth.
create table profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  account_type account_type not null,
  display_name text not null,
  avatar_url text,
  city_slug text references cities (slug),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table companies (
  profile_id uuid primary key references profiles (id) on delete cascade,
  legal_name text,
  cnpj text unique,
  segment text,
  website text,
  about text
);

create table freelancers (
  profile_id uuid primary key references profiles (id) on delete cascade,
  headline text not null,
  bio text,
  hourly_rate_cents int check (hourly_rate_cents >= 0),
  available boolean not null default true,
  work_modes work_mode[] not null default '{presencial,hibrido,remoto}',
  portfolio_url text
);

create table freelancer_categories (
  freelancer_id uuid references freelancers (profile_id) on delete cascade,
  category_slug text references categories (slug),
  primary key (freelancer_id, category_slug)
);

-- ---------------------------------------------------------------------------
-- Vagas (empresas) e serviços (profissionais)
-- ---------------------------------------------------------------------------

create table jobs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies (profile_id) on delete cascade,
  title text not null,
  description text not null,
  category_slug text not null references categories (slug),
  city_slug text not null references cities (slug),
  work_mode work_mode not null default 'hibrido',
  budget_kind budget_kind not null default 'a_combinar',
  budget_min_cents int check (budget_min_cents >= 0),
  budget_max_cents int check (budget_max_cents >= budget_min_cents),
  status job_status not null default 'rascunho',
  published_at timestamptz,
  created_at timestamptz not null default now()
);

create index jobs_open_idx on jobs (published_at desc) where status = 'aberta';
create index jobs_city_idx on jobs (city_slug);
create index jobs_category_idx on jobs (category_slug);

create table services (
  id uuid primary key default gen_random_uuid(),
  freelancer_id uuid not null references freelancers (profile_id) on delete cascade,
  title text not null,
  description text not null,
  category_slug text not null references categories (slug),
  price_from_cents int check (price_from_cents >= 0),
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table proposals (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references jobs (id) on delete cascade,
  freelancer_id uuid not null references freelancers (profile_id) on delete cascade,
  message text not null,
  amount_cents int check (amount_cents >= 0),
  created_at timestamptz not null default now(),
  unique (job_id, freelancer_id)
);

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------

alter table cities enable row level security;
alter table categories enable row level security;
alter table profiles enable row level security;
alter table companies enable row level security;
alter table freelancers enable row level security;
alter table freelancer_categories enable row level security;
alter table jobs enable row level security;
alter table services enable row level security;
alter table proposals enable row level security;

create policy "catálogo público" on cities for select using (true);
create policy "catálogo público" on categories for select using (true);

create policy "perfis públicos" on profiles for select using (true);
create policy "dono cria perfil" on profiles for insert with check (auth.uid() = id);
create policy "dono edita perfil" on profiles for update using (auth.uid() = id);

create policy "empresas públicas" on companies for select using (true);
create policy "dono gerencia empresa" on companies for all
  using (auth.uid() = profile_id) with check (auth.uid() = profile_id);

create policy "profissionais públicos" on freelancers for select using (true);
create policy "dono gerencia profissional" on freelancers for all
  using (auth.uid() = profile_id) with check (auth.uid() = profile_id);

create policy "categorias públicas" on freelancer_categories for select using (true);
create policy "dono gerencia categorias" on freelancer_categories for all
  using (auth.uid() = freelancer_id) with check (auth.uid() = freelancer_id);

create policy "vagas abertas são públicas" on jobs for select
  using (status = 'aberta' or auth.uid() = company_id);
create policy "empresa gerencia suas vagas" on jobs for all
  using (auth.uid() = company_id) with check (auth.uid() = company_id);

create policy "serviços publicados são públicos" on services for select
  using (published or auth.uid() = freelancer_id);
create policy "profissional gerencia seus serviços" on services for all
  using (auth.uid() = freelancer_id) with check (auth.uid() = freelancer_id);

-- Proposta: visível para quem enviou e para a empresa dona da vaga.
create policy "partes veem a proposta" on proposals for select using (
  auth.uid() = freelancer_id
  or auth.uid() = (select company_id from jobs where jobs.id = job_id)
);
create policy "profissional envia proposta" on proposals for insert
  with check (auth.uid() = freelancer_id);
