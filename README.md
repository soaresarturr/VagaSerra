<<<<<<< HEAD
# VagaSerra
Plataforma de vagas fixas e freelance focada na Serra Gaúcha.
=======
# FreeSerra

Marketplace de freelas da Serra Gaúcha: empresas publicam vagas, profissionais
publicam o que sabem fazer, e os dois se encontram por cidade e categoria.

Next.js 16 (App Router, Cache Components) · TypeScript · Tailwind CSS 4 · Supabase (Postgres).

## Rodando

```bash
npm install
npm run dev
```

Sem Supabase configurado, a home usa os dados de exemplo de `src/lib/mock-data.ts`.

## Supabase

1. Crie um projeto no Supabase.
2. Rode `supabase/migrations/20261030000000_init.sql` no SQL Editor (ou `supabase db push`).
3. Copie `.env.example` para `.env.local` e preencha a URL e a publishable key.

## Estrutura

- `src/app/page.tsx`: página inicial
- `src/components/home/`: seções da home
- `src/lib/data.ts`: leituras públicas (Supabase ou dados de exemplo)
- `src/lib/supabase/`: clientes para browser e servidor
- `supabase/migrations/`: schema, catálogos (cidades e categorias) e políticas RLS
>>>>>>> 89b98a5 (FreeSerra V1)
