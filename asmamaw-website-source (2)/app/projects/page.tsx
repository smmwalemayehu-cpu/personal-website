import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { profile, projects } from "@/lib/content";
import { PlanViewPlaceholder } from "@/components/Drawings";
import { CtaBand, PageBanner, Pending } from "@/components/ui";

export const metadata: Metadata = {
  title: "Projects",
  description: `Road construction and infrastructure projects managed by ${profile.name}.`,
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const anyPlaceholder = projects.some((p) => p.placeholder);
  return (
    <>
      <PageBanner image="roadNetwork" title="Projects and portfolio"
        lead="Road construction, maintenance and infrastructure work, with my role, the scope and the outcome of each project." />
      <section className="py-20 md:py-28">
        <div className="container-site">
          {anyPlaceholder && (
            <div className="mb-12 max-w-3xl">
              <Pending>
                verified project details. The cards below are marked placeholders linked to the employers in my CV. No
                project names, budgets, quantities or results have been filled in yet.
              </Pending>
            </div>
          )}
          <ul className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((p, i) => (
              <li key={p.slug}>
                <Link href={`/projects/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[4px] border border-line bg-white transition-shadow hover:shadow-[0_18px_40px_-22px_rgba(7,20,38,0.45)]">
                  <div className="zoom-wrap relative aspect-[16/10]">
                    {p.images[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.images[0].src} alt={p.images[0].alt} loading="lazy" className="photo h-full w-full" />
                    ) : (
                      <PlanViewPlaceholder variant={i} />
                    )}
                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-navy-900">{p.type}</span>
                    {p.placeholder && <span className="absolute right-4 top-4 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-navy-950">Placeholder</span>}
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <p className="flex items-center gap-2 text-sm text-muted"><MapPin className="h-4 w-4" aria-hidden="true" />{p.location}</p>
                    <h2 className="mt-3 text-xl md:text-[1.4rem]">{p.title}</h2>
                    <p className="mt-3 text-slate">{p.role}, {p.employer}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[0.95rem] font-semibold text-navy-700">
                      View project <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand title="Have a project in mind?" text="Let's discuss how I can support its planning, delivery or management." cvFile={profile.cvFile} />
    </>
  );
}
