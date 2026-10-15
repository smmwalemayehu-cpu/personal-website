import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Download } from "lucide-react";
import { getProject, profile, projects } from "@/lib/content";
import { PlanViewPlaceholder } from "@/components/Drawings";
import { CtaBand, PageBanner, Pending } from "@/components/ui";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description || `${p.type} project: ${p.role}, ${p.employer}.`,
    alternates: { canonical: `/projects/${p.slug}` },
    // Placeholder pages stay out of search results until real content is added.
    robots: p.placeholder ? { index: false, follow: true } : undefined,
  };
}

const textSections = [
  { key: "description", title: "Project overview", pending: "a description of the project." },
  { key: "scope", title: "Scope of work", pending: "the scope of works (lengths, structures, quantities) from project records." },
  { key: "challenges", title: "Challenges", pending: "the main technical or management challenges." },
  { key: "solutions", title: "Solutions", pending: "how those challenges were addressed." },
  { key: "outcomes", title: "Outcomes", pending: "verified results, such as completion, quality or handover." },
] as const;

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const facts = [
    { label: "Location", value: p.location },
    { label: "Project type", value: p.type },
    { label: "Period", value: p.period },
    { label: "Employer", value: p.employer },
    { label: "My role", value: p.role },
  ];

  return (
    <>
      <PageBanner image="roadNetwork" title={p.title} crumb={{ href: "/projects", label: "Projects" }} />

      <section className="py-16 md:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_21rem] lg:gap-16">
          <div className="min-w-0">
            {p.placeholder && (
              <div className="mb-10">
                <Pending>
                  this is a placeholder. Replace it with a verified project in <code>content/projects.json</code> and set{" "}
                  <code>&quot;placeholder&quot;: false</code>.
                </Pending>
              </div>
            )}

            <div className="overflow-hidden rounded-[4px]">
              {p.images.length ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.images[0].src} alt={p.images[0].alt} className="photo aspect-[16/9] w-full" />
              ) : (
                <div className="aspect-[16/9]"><PlanViewPlaceholder variant={1} /></div>
              )}
            </div>

            {textSections.map((s) => (
              <div key={s.key} className="mt-12">
                <h2 className="text-2xl md:text-[1.75rem]">{s.title}</h2>
                <div className="mt-4">
                  {p[s.key] ? <p className="text-[1.05rem] leading-relaxed text-slate">{p[s.key]}</p> : <Pending>{s.pending}</Pending>}
                </div>
              </div>
            ))}

            <div className="mt-12">
              <h2 className="text-2xl md:text-[1.75rem]">My responsibilities</h2>
              <div className="mt-4">
                {p.responsibilities.length ? (
                  <ul className="space-y-2.5">
                    {p.responsibilities.map((r) => (
                      <li key={r} className="flex gap-3 text-ink"><span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />{r}</li>
                    ))}
                  </ul>
                ) : (
                  <Pending>your specific responsibilities on this project.</Pending>
                )}
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl md:text-[1.75rem]">Photographs and drawings</h2>
              {p.images.length > 1 ? (
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {p.images.slice(1).map((img) => (
                    <figure key={img.src}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.src} alt={img.alt} loading="lazy" className="photo aspect-[4/3] w-full rounded-[4px]" />
                      {img.caption && <figcaption className="mt-2 text-sm text-muted">{img.caption}</figcaption>}
                    </figure>
                  ))}
                </div>
              ) : (
                <div className="mt-4"><Pending>site photographs and engineering drawings (place files in <code>public/projects/</code>).</Pending></div>
              )}
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[4px] bg-navy-900 p-7 text-white">
              <h2 className="text-lg">Project facts</h2>
              <dl className="mt-5 divide-y divide-white/10">
                {facts.map((f) => (
                  <div key={f.label} className="py-3">
                    <dt className="text-sm text-white/60">{f.label}</dt>
                    <dd className="mt-0.5 font-semibold">{f.value || <span className="font-normal text-gold-light">To be added</span>}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-[4px] border border-line p-7">
              <h2 className="text-lg">Supporting documents</h2>
              {p.documents.length ? (
                <ul className="mt-4 space-y-3">
                  {p.documents.map((d) => (
                    <li key={d.href}><a href={d.href} download className="text-link inline-flex items-center gap-2"><Download className="h-4 w-4" aria-hidden="true" />{d.label}</a></li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-[0.95rem] text-muted">No documents published yet.</p>
              )}
            </div>
            <Link href="/projects" className="inline-flex items-center gap-2 font-semibold text-navy-700"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> All projects</Link>
          </aside>
        </div>
      </section>

      <CtaBand title="Discuss a similar project" text="Get in touch to talk about planning, delivery or management support." cvFile={profile.cvFile} />
    </>
  );
}
