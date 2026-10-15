import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { profile, services } from "@/lib/content";
import { Photo } from "@/components/Photo";
import { ServiceIcon } from "@/components/icons";
import { CtaBand, PageBanner } from "@/components/ui";

export const metadata: Metadata = {
  title: "Services",
  description: `Areas of expertise of ${profile.name}: construction project management, road construction, road maintenance and equipment, cost and contracts, strategy and corporate governance.`,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageBanner image="earthworks" title="Services and expertise"
        lead="What I bring to construction companies, infrastructure organisations, government agencies and engineering consultancies." />

      {/* Quick index */}
      <nav aria-label="Services on this page" className="border-b border-line bg-white">
        <div className="container-site">
          <ul className="flex gap-2 overflow-x-auto py-4 [scrollbar-width:none]">
            {services.map((s) => (
              <li key={s.id} className="shrink-0">
                <a href={`#${s.id}`} className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-[0.9rem] font-medium text-ink hover:border-navy-600">
                  <ServiceIcon name={s.icon} className="h-4 w-4 text-gold-ink" />{s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="py-16 md:py-24">
        {services.map((s, i) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="scroll-mt-24 py-10 md:py-14">
            <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
              <div className={`relative ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="aspect-[4/3] overflow-hidden rounded-[4px]">
                  <Photo name={s.image} sizes="(min-width:1024px) 600px, 100vw" className="h-full w-full" />
                </div>
                <span className={`absolute -bottom-6 grid h-20 w-20 place-items-center rounded-[4px] bg-gold text-navy-950 shadow-lg ${i % 2 === 1 ? "left-6" : "right-6"}`}>
                  <ServiceIcon name={s.icon} className="h-9 w-9" />
                </span>
              </div>
              <div>
                <p className="kicker">Service {String(i + 1).padStart(2, "0")}</p>
                <h2 id={`${s.id}-title`} className="mt-4 text-3xl md:text-[2.3rem]">{s.title}</h2>
                <p className="mt-5 text-lg text-slate">{s.summary}</p>
                <ul className="mt-7 grid gap-3">
                  {s.includes.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-navy-900 text-gold-light"><Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" /></span>
                      <span className="text-ink">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-7 border-l-2 border-gold pl-4 text-[0.95rem] text-muted">Experience: {s.basis}</p>
                <Link href="/contact" className="text-link mt-7 inline-flex items-center gap-2">Discuss this service <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              </div>
            </div>
          </section>
        ))}
      </div>

      <CtaBand title="Need experience like this on your team?" text="Tell me about the role or project, and I will reply by email." cvFile={profile.cvFile} />
    </>
  );
}
