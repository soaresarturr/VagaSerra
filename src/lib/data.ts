import { cacheLife } from "next/cache";
import { JOBS, TALENT } from "./mock-data";
import { createAnonClient, isSupabaseConfigured } from "./supabase/server";
import type { JobCard, TalentCard } from "./types";

// Leituras públicas da home. Sem Supabase configurado, devolvem os dados de
// exemplo para que o layout possa ser desenvolvido antes do banco existir.

export async function getRecentJobs(limit = 6): Promise<JobCard[]> {
  "use cache";
  cacheLife("minutes");

  if (!isSupabaseConfigured()) return JOBS.slice(0, limit);

  const { data, error } = await createAnonClient()
    .from("jobs")
    .select(
      `id, title, work_mode, budget_kind, budget_min_cents, budget_max_cents, published_at,
       company:companies(profile:profiles(display_name)),
       city:cities(name),
       category:categories(name)`,
    )
    .eq("status", "aberta")
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) throw error;

  return data.map((row) => ({
    id: row.id,
    title: row.title,
    company: one(one(row.company)?.profile)?.display_name ?? "Empresa",
    city: one(row.city)?.name ?? "",
    category: one(row.category)?.name ?? "",
    workMode: row.work_mode,
    budgetKind: row.budget_kind,
    budgetMinCents: row.budget_min_cents,
    budgetMaxCents: row.budget_max_cents,
    publishedAt: row.published_at,
  }));
}

export async function getFeaturedTalent(limit = 4): Promise<TalentCard[]> {
  "use cache";
  cacheLife("minutes");

  if (!isSupabaseConfigured()) return TALENT.slice(0, limit);

  const { data, error } = await createAnonClient()
    .from("freelancers")
    .select(
      `profile_id, headline, hourly_rate_cents, available,
       profile:profiles(display_name, city:cities(name)),
       freelancer_categories(category:categories(name))`,
    )
    .order("available", { ascending: false })
    .limit(limit);

  if (error) throw error;

  return data.map((row) => {
    const profile = one(row.profile);
    const name: string = profile?.display_name ?? "Profissional";
    return {
      id: row.profile_id,
      name,
      headline: row.headline,
      city: one(profile?.city)?.name ?? "",
      skills: row.freelancer_categories
        .map((fc) => one(fc.category)?.name)
        .filter((s): s is string => Boolean(s)),
      hourlyRateCents: row.hourly_rate_cents,
      available: row.available,
      initials: initialsOf(name),
    };
  });
}

// O PostgREST tipa relações sem tipos gerados como objeto ou array.
function one<T>(value: T | T[] | null | undefined): T | undefined {
  return Array.isArray(value) ? value[0] : (value ?? undefined);
}

function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts.at(-1)?.[0] ?? "")).toUpperCase();
}
