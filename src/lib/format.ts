import type { BudgetKind, WorkMode } from "./types";

const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

const shortDate = new Intl.DateTimeFormat("pt-BR", {
  day: "numeric",
  month: "short",
  timeZone: "America/Sao_Paulo",
});

const SUFFIX: Record<BudgetKind, string> = {
  projeto: "",
  hora: "/h",
  mensal: "/mês",
  a_combinar: "",
};

export function formatBudget(kind: BudgetKind, min: number | null, max: number | null) {
  if (kind === "a_combinar" || (min == null && max == null)) return "A combinar";
  const suffix = SUFFIX[kind];
  if (min != null && max != null) return `${brl.format(min / 100)} – ${brl.format(max / 100)}${suffix}`;
  if (min != null) return `A partir de ${brl.format(min / 100)}${suffix}`;
  return `Até ${brl.format(max! / 100)}${suffix}`;
}

export function formatRate(cents: number | null) {
  return cents == null ? "Sob consulta" : `${brl.format(cents / 100)}/h`;
}

export function formatDate(iso: string) {
  return shortDate.format(new Date(iso)).replace(".", "");
}

export const WORK_MODE_LABEL: Record<WorkMode, string> = {
  presencial: "Presencial",
  hibrido: "Híbrido",
  remoto: "Remoto",
};
