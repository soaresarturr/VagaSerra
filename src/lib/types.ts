// Formas que a interface consome. Espelham as tabelas em
// supabase/migrations, já com os joins resolvidos (nome da cidade etc.).

export type WorkMode = "presencial" | "hibrido" | "remoto";

export type BudgetKind = "projeto" | "hora" | "mensal" | "a_combinar";

export type Category = {
  slug: string;
  name: string;
  description: string;
};

export type JobCard = {
  id: string;
  title: string;
  company: string;
  city: string;
  category: string;
  workMode: WorkMode;
  budgetKind: BudgetKind;
  budgetMinCents: number | null;
  budgetMaxCents: number | null;
  publishedAt: string;
};

export type TalentCard = {
  id: string;
  name: string;
  headline: string;
  city: string;
  skills: string[];
  hourlyRateCents: number | null;
  available: boolean;
  initials: string;
};
