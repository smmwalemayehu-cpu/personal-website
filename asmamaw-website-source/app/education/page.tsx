import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Award, GraduationCap } from "lucide-react";
import { education, profile } from "@/lib/content";
import { CtaBand, PageBanner } from "@/components/ui";

export const metadata: Metadata = {
  title: "Education",
  description: `Education of ${profile.name}: Master of Engineering in Construction Technology and Management and BSc in Civil Engineering, Bahir Dar University.`,
  alternates: { canonical: "/education" },
};

export default function EducationPage() {
  return (
    <>
      <PageBanner image="survey" title="Education" crumb={{ href: "/about", label: "About" }}
        lead="Civil engineering degrees from Bahir Dar University." />
      <section className="py-20 md:py-28">
        <div className="container-site">
          <ol className="relative space-y-8 border-l-2 border-line pl-8 md:pl-12">
            {education.map((e) => (
              <li key={e.id} className="relative">
                <span className="absolute -left-[3.05rem] top-1 grid h-10 w-10 place-items-center rounded-full bg-navy-900 text-gold-light md:-left-[4.05rem]" aria-hidden="true">
                  <GraduationCap className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <div className="rounded-[4px] border border-line bg-white p-7 md:p-9">
                  <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-gold-ink">{e.year}</p>
                  <h2 className="mt-2 text-2xl md:text-3xl">{e.degree}</h2>
                  {e.specialisation && <p className="mt-2 text-lg font-medium text-navy-700">{e.specialisation}</p>}
                  <p className="mt-2 text-slate">{e.institution}, {e.location}</p>
                  {e.notes.length > 0 && (
                    <ul className="mt-6 space-y-3">
                      {e.notes.map((n) => (
                        <li key={n} className="flex gap-3 text-ink"><Award className="mt-0.5 h-5 w-5 shrink-0 text-gold-ink" aria-hidden="true" />{n}</li>
                      ))}
                    </ul>
                  )}
                  {e.id === "meng" && (
                    <Link href="/research" className="text-link mt-6 inline-flex items-center gap-2">About the thesis <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <CtaBand title="Let's work together" text="I welcome conversations about senior roles, collaboration and consulting." cvFile={profile.cvFile} />
    </>
  );
}
