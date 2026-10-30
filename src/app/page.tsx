import { Categories } from "@/components/home/categories";
import { CitiesStrip } from "@/components/home/cities-strip";
import { FeaturedTalent } from "@/components/home/featured-talent";
import { FinalCta } from "@/components/home/final-cta";
import { Hero } from "@/components/home/hero";
import type { FeedItem } from "@/components/home/hero-feed";
import { HowItWorks } from "@/components/home/how-it-works";
import { RecentJobs } from "@/components/home/recent-jobs";
import { Vindima } from "@/components/home/vindima";
import { WhyLocal } from "@/components/home/why-local";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getFeaturedTalent, getRecentJobs } from "@/lib/data";
import { formatBudget, formatRate } from "@/lib/format";
import { CATEGORIES, CITIES } from "@/lib/mock-data";

export default async function Home() {
  const [jobs, talent] = await Promise.all([getRecentJobs(8), getFeaturedTalent(8)]);

  const jobsFeed: FeedItem[] = jobs.map((job) => ({
    id: job.id,
    kind: "vaga",
    title: job.title,
    subtitle: job.company,
    city: job.city,
    aside: formatBudget(job.budgetKind, job.budgetMinCents, job.budgetMaxCents).replace(/\s?–.*$/, "+"),
  }));

  const talentFeed: FeedItem[] = talent.map((person) => ({
    id: person.id,
    kind: "profissional",
    title: person.name,
    subtitle: person.headline.split(" · ")[0],
    city: person.city,
    aside: formatRate(person.hourlyRateCents),
    initials: person.initials,
  }));

  return (
    <>
      <noscript>
        <style>{`.reveal{opacity:1;transform:none}`}</style>
      </noscript>
      <SiteHeader />
      <main className="flex-1">
        <Hero cities={CITIES} jobsFeed={jobsFeed} talentFeed={talentFeed} />
        <CitiesStrip cities={CITIES} />
        <HowItWorks />
        <RecentJobs />
        <FeaturedTalent />
        <Categories categories={CATEGORIES} />
        <Vindima />
        <WhyLocal />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
