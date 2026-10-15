import type { Metadata } from "next";
import { BookOpen, Briefcase, Calendar, ChevronDown, HardHat, Landmark, MapPin, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { categoryLabel, experience, formatMonth, profile, type Category } from "@/lib/content";
import { CtaBand, PageBanner, SectionHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "Experience",
  description: `Professional experience of ${profile.name}: General Manager, District Manager, Site Engineer, board member, project coordinator and teacher.`,
  alternates: { canonical: "/experience" },
};

const categoryIcon: Record<Category, LucideIcon> = {
  management: Briefcase,
  engineering: HardHat,
  governance: Landmark,
  community: Users,
  education: BookOpen,
};

export default function ExperiencePage() {
  const leadership = experience.filter((r) => r.highlight);
  const earlier = experience.filter((r) => !r.highlight);

  const RoleCard = ({ r }: { r: (typeof experience)[number] }) => {
    const Icon = categoryIcon[r.category];
    const cut = r.responsibilities.length > 4 ? 3 : r.responsibilities.length;
    const first = r.responsibilities.slice(0, cut);
    const more = r.responsibilities.slice(cut);
    return (
      <article id={r.id} className="scroll-mt-28 overflow-hidden rounded-[4px] border border-line bg-white">
        <div className="grid md:grid-cols-[17rem_1fr]">
          <div className="bg-navy-900 p-7 text-white md:p-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[0.82rem] font-semibold text-gold-light">
              <Icon className="h-4 w-4" aria-hidden="true" />{categoryLabel[r.category]}
            </span>
            <p className="mt-6 flex items-start gap-2.5 text-[0.95rem] text-white/85">
              <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-gold-light" aria-hidden="true" />
              <span><time dateTime={r.start}>{formatMonth(r.start)}</time> to <time dateTime={r.end}>{formatMonth(r.end)}</time></span>
            </p>
            <p className="mt-3 flex items-start gap-2.5 text-[0.95rem] text-white/85">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-light" aria-hidden="true" />{r.location}
            </p>
          </div>
          <div className="p-7 md:p-9">
            <h3 className="text-2xl">{r.role}</h3>
            <p className="mt-1 text-lg font-semibold text-navy-700">{r.organization}</p>
            <p className="mt-4 text-slate">{r.summary}</p>
            <ul className="mt-5 space-y-2.5">
              {first.map((item) => (
                <li key={item} className="flex gap-3 text-[0.98rem] text-ink">
                  <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />{item}
                </li>
              ))}
            </ul>
            {more.length > 0 && (
              <details className="group mt-4">
                <summary className="inline-flex cursor-pointer list-none items-center gap-2 text-[0.95rem] font-semibold text-navy-700 [&::-webkit-details-marker]:hidden">
                  <span className="group-open:hidden">Show {more.length} more</span>
                  <span className="hidden group-open:inline">Show less</span>
                  <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <ul className="mt-3 space-y-2.5">
                  {more.map((item) => (
                    <li key={item} className="flex gap-3 text-[0.98rem] text-ink">
                      <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />{item}
                    </li>
                  ))}
                </ul>
              </details>
            )}
          </div>
        </div>
      </article>
    );
  };

  return (
    <>
      <PageBanner image="fleet" title="Professional experience"
        lead="Engineering, operations and leadership roles, with dates as recorded in my CV." />

      {/* Career at a glance */}
      <section aria-label="Career at a glance" className="border-b border-line bg-mist">
        <div className="container-site">
          <ol className="flex gap-0 overflow-x-auto py-8 [scrollbar-width:thin]">
            {[...experience].reverse().map((r, i, arr) => (
              <li key={r.id} className="relative min-w-[10.5rem] flex-1 pr-4">
                <div className="flex items-center">
                  <span className="h-3.5 w-3.5 shrink-0 rounded-full border-2 border-gold bg-white" aria-hidden="true" />
                  {i < arr.length - 1 && <span className="h-0.5 flex-1 bg-line" aria-hidden="true" />}
                </div>
                <a href={`#${r.id}`} className="mt-3 block hover:text-navy-700">
                  <span className="block font-[family-name:var(--font-display)] text-lg font-bold text-ink">{r.start.slice(0, 4)}</span>
                  <span className="block text-[0.9rem] leading-snug text-slate">{r.role}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-20 md:py-28" aria-labelledby="leadership">
        <div className="container-site">
          <SectionHead kicker="Engineering, management and governance" id="leadership" title="Leadership roles" />
          <div className="mt-12 space-y-6">
            {leadership.map((r) => <RoleCard key={r.id} r={r} />)}
          </div>
        </div>
      </section>

      {earlier.length > 0 && (
        <section className="bg-mist py-20 md:py-28" aria-labelledby="earlier">
          <div className="container-site">
            <SectionHead kicker="Before engineering" id="earlier" title="Earlier career" lead="Community programme coordination and a decade of teaching mathematics." />
            <div className="mt-12 space-y-6">
              {earlier.map((r) => <RoleCard key={r.id} r={r} />)}
            </div>
          </div>
        </section>
      )}

      <CtaBand title="Want the full picture?" text="Download my CV or get in touch to discuss how my experience fits your organisation." cvFile={profile.cvFile} />
    </>
  );
}
