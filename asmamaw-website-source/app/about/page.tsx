import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BookOpen, Code2, Download, GraduationCap, Languages, Users, Wrench } from "lucide-react";
import { education, profile, skills } from "@/lib/content";
import { LinkedInIcon } from "@/components/icons";
import { CtaBand, PageBanner, SectionHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description: `About ${profile.name}: civil engineer with experience in road construction, maintenance operations, construction management and corporate governance.`,
  alternates: { canonical: "/about" },
};

const skillIcons = [Wrench, Users, Code2];

export default function AboutPage() {
  const refs = profile.references;
  return (
    <>
      <PageBanner image="survey" title="About me" lead="Civil engineer, road infrastructure manager and board member, based in Bahir Dar, Ethiopia." />

      {/* Biography */}
      <section className="py-24 md:py-28">
        <div className="container-site grid gap-14 lg:grid-cols-[22rem_1fr] lg:gap-20">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-[4px] border border-line bg-white">
              <Image src={profile.photo} alt={`Portrait of ${profile.name}`} width={365} height={366} sizes="352px" className="h-auto w-full" />
              <div className="p-6">
                <p className="font-[family-name:var(--font-display)] text-xl font-bold">{profile.name}</p>
                <p className="mt-1 text-slate">Civil Engineer, {profile.location}</p>
                <dl className="mt-5 space-y-3 border-t border-line pt-5 text-[0.95rem]">
                  <div className="flex gap-3"><Languages className="mt-0.5 h-5 w-5 shrink-0 text-gold-ink" aria-hidden="true" /><div><dt className="sr-only">Languages</dt><dd>{profile.languages.join(", ")}</dd></div></div>
                  <div className="flex gap-3"><GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-gold-ink" aria-hidden="true" /><div><dt className="sr-only">Highest degree</dt><dd>MEng, Bahir Dar University</dd></div></div>
                </dl>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={profile.cvFile} download className="btn btn-navy !min-h-[2.75rem] !px-4 text-sm"><Download className="h-4 w-4" aria-hidden="true" /> Download CV</a>
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="btn btn-ghost !min-h-[2.75rem] !px-3.5"><LinkedInIcon className="h-4 w-4" /></a>
                </div>
              </div>
            </div>
          </aside>

          <div>
            <SectionHead kicker="Biography" title="Engineering, operations and leadership in road infrastructure" />
            <div className="mt-8 max-w-[44rem] space-y-5 text-[1.08rem] leading-[1.8] text-slate">
              {profile.biography.map((p, i) => <p key={i}>{p}</p>)}
            </div>

            <h3 className="mt-14 text-2xl">How I can contribute</h3>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {profile.overview.map((o) => (
                <li key={o.title} className="rounded-[4px] border border-line bg-mist p-6">
                  <p className="font-[family-name:var(--font-display)] text-lg font-bold">{o.title}</p>
                  <p className="mt-2 text-[0.96rem] text-slate">{o.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="bg-mist py-24 md:py-28" aria-labelledby="credentials">
        <div className="container-site">
          <SectionHead kicker="Education" id="credentials" title="Academic credentials" />
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {education.map((e) => (
              <li key={e.id} className="flex gap-6 rounded-[4px] bg-white p-8 shadow-[0_10px_30px_-20px_rgba(7,20,38,0.4)]">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-[3px] bg-navy-900 text-gold-light"><GraduationCap className="h-7 w-7" strokeWidth={1.6} aria-hidden="true" /></span>
                <div>
                  <p className="text-sm font-semibold text-gold-ink">{e.year}</p>
                  <h3 className="mt-1 text-xl">{e.degree}</h3>
                  {e.specialisation && <p className="mt-1 font-medium text-navy-700">{e.specialisation}</p>}
                  <p className="mt-2 text-slate">{e.institution}, {e.location}</p>
                  {e.id === "meng" && (
                    <Link href="/research" className="text-link mt-4 inline-flex items-center gap-2 text-[0.95rem]">
                      <BookOpen className="h-4 w-4" aria-hidden="true" /> Thesis and ERA scholarship
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Skills */}
      <section className="py-24 md:py-28" aria-labelledby="skills">
        <div className="container-site">
          <SectionHead kicker="Capabilities" id="skills" title="Skills and tools" center />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {skills.map((group, i) => {
              const Icon = skillIcons[i] ?? Wrench;
              return (
                <div key={group.category} className="rounded-[4px] border border-line p-8">
                  <Icon className="h-8 w-8 text-gold-ink" strokeWidth={1.6} aria-hidden="true" />
                  <h3 className="mt-5 text-xl">{group.category}</h3>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li key={item} className="rounded-full bg-mist px-3.5 py-1.5 text-[0.9rem] font-medium text-ink">{item}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {refs.enabled && (
        <section className="bg-mist py-24" aria-labelledby="references">
          <div className="container-site">
            <SectionHead kicker="References" id="references" title="Professional references" lead={refs.note} />
            <ul className="mt-10 grid gap-6 sm:grid-cols-3">
              {refs.people.map((p) => (
                <li key={p.name} className="rounded-[4px] bg-white p-6">
                  <p className="font-semibold">{p.name}</p>
                  {p.organization && <p className="text-[0.95rem] text-slate">{p.organization}</p>}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="pb-24">
        <div className="container-site">
          <Link href="/experience" className="group flex flex-wrap items-center justify-between gap-6 rounded-[4px] bg-navy-900 p-8 text-white md:p-10">
            <span className="font-[family-name:var(--font-display)] text-2xl font-bold">See my full professional experience</span>
            <span className="btn btn-gold">Explore My Experience <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
          </Link>
        </div>
      </section>

      <CtaBand title="Let's work together" text="I welcome conversations about senior roles, collaboration and consulting in construction and infrastructure." cvFile={profile.cvFile} />
    </>
  );
}
