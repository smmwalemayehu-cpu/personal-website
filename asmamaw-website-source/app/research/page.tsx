import type { Metadata } from "next";
import { Building, Calendar, Download, GraduationCap, Wallet } from "lucide-react";
import { profile, research } from "@/lib/content";
import { PavementSections } from "@/components/Drawings";
import { CtaBand, PageBanner, Pending } from "@/components/ui";

export const metadata: Metadata = {
  title: "Research",
  description: `Master's thesis by ${profile.name}: ${research.title}.`,
  alternates: { canonical: "/research" },
};

const sections: { key: "abstract" | "methodology" | "findings"; title: string; pending: string }[] = [
  { key: "abstract", title: "Abstract", pending: "the thesis abstract." },
  { key: "methodology", title: "Methodology", pending: "a short description of the research methodology." },
  { key: "findings", title: "Findings", pending: "the main findings and conclusions, as written in the thesis." },
];

export default function ResearchPage() {
  const facts = [
    { icon: GraduationCap, label: "Degree", value: research.degree },
    { icon: Building, label: "Institution", value: research.institution },
    { icon: Calendar, label: "Year", value: research.year },
    { icon: Wallet, label: "Funding", value: research.funding },
  ];
  return (
    <>
      <PageBanner image="excavator" title="Research and academic work" crumb={{ href: "/about", label: "About" }}
        lead="Master's thesis in Construction Technology and Management." />

      <section className="py-20 md:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_21rem] lg:gap-16">
          <article className="min-w-0 max-w-[46rem]">
            <p className="kicker">Master&apos;s thesis</p>
            <h2 className="mt-4 text-3xl md:text-[2.6rem]">{research.title}</h2>

            <h3 className="mt-12 text-2xl">Research topic</h3>
            <p className="mt-4 text-[1.08rem] leading-[1.8] text-slate">{research.topicSummary}</p>

            <figure className="mt-10 rounded-[4px] border border-line bg-mist p-6 md:p-8">
              <PavementSections />
              <figcaption className="mt-5 text-sm text-muted">
                The two pavement types compared in the thesis. Illustrative cross-sections only; layer thicknesses are not to scale and are not taken from the study.
              </figcaption>
            </figure>

            {sections.map((s) => (
              <div key={s.key} className="mt-12">
                <h3 className="text-2xl">{s.title}</h3>
                <div className="mt-4">
                  {research[s.key] ? <p className="text-[1.08rem] leading-[1.8] text-slate">{research[s.key]}</p> : <Pending>{s.pending}</Pending>}
                </div>
              </div>
            ))}
          </article>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[4px] bg-navy-900 p-7 text-white">
              <h2 className="text-lg">Thesis details</h2>
              <dl className="mt-5 space-y-5">
                {facts.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex gap-3">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-gold-light" strokeWidth={1.7} aria-hidden="true" />
                    <div><dt className="text-sm text-white/60">{label}</dt><dd className="font-semibold">{value}</dd></div>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-[4px] border border-line p-7">
              <h2 className="text-lg">Thesis document</h2>
              {research.thesisPdf ? (
                <a href={research.thesisPdf} download className="btn btn-navy mt-4"><Download className="h-4 w-4" aria-hidden="true" /> Download thesis (PDF)</a>
              ) : (
                <div className="mt-4"><Pending>the thesis PDF, once you decide to publish it.</Pending></div>
              )}
            </div>
          </aside>
        </div>
      </section>
      <CtaBand title="Interested in this research?" text="Get in touch to discuss pavement selection, cost or environmental considerations on your project." cvFile={profile.cvFile} />
    </>
  );
}
