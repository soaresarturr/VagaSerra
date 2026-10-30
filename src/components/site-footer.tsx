import Link from "next/link";
import { Logo } from "./logo";

const COLUMNS = [
  {
    title: "Plataforma",
    links: [
      { href: "/vagas", label: "Vagas" },
      { href: "/profissionais", label: "Profissionais" },
      { href: "/#categorias", label: "Categorias" },
      { href: "/#como-funciona", label: "Como funciona" },
    ],
  },
  {
    title: "Comece",
    links: [
      { href: "/vagas/nova", label: "Publicar vaga" },
      { href: "/cadastro?tipo=profissional", label: "Criar perfil" },
      { href: "/entrar", label: "Entrar" },
    ],
  },
  {
    title: "FreeSerra",
    links: [
      { href: "/sobre", label: "Sobre" },
      { href: "/contato", label: "Contato" },
      { href: "/termos", label: "Termos de uso" },
      { href: "/privacidade", label: "Privacidade" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            Freelas, projetos e serviços entre empresas e profissionais da Serra Gaúcha.
          </p>
        </div>
        {COLUMNS.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted">{column.title}</p>
            <ul className="mt-4 flex flex-col gap-2.5 text-[0.95rem]">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-ink-soft transition-colors duration-200 hover:text-grape">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-sm text-muted sm:flex-row sm:justify-between sm:px-8">
          <p>© 2026 FreeSerra</p>
          <p>
            Feito na <span className="font-medium text-ink-soft">Serra Gaúcha</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}
