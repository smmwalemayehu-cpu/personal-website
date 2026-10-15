import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Award, Briefcase, Building2, Download, GraduationCap, Landmark, Users } from "lucide-react";
import { experience, profile, projects, services, skills } from "@/lib/content";
import { Photo } from "@/components/Photo";
import { ServiceIcon } from "@/components/icons";
import { CtaBand, SectionHead } from "@/components/ui";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const credentials = [
  { icon: Briefcase, title: "15+ years", text: "in civil engineering, construction and management" },
  { icon: Building2, title: "General Manager", text: "GC-1 road works enterprise, 2017–2022" },
  { icon: Landmark, title: "Board member", text: "Abay Insurance, 2020–2023" },
  { icon: GraduationCap, title: "MEng", text: "Construction Technology and Management" },
];

const audiences = [
  { title: "Construction companies", text: "Project delivery, site operations and contract management." },
  { title: "Infrastructure organisations", text: "Road construction, maintenance programmes and equipment fleets." },
  { title: "Government agencies", text: "Public road authorities and district-level operations." },
  { title: "Engineering consultancies", text: "Supervision, cost estimation and technical review." },
];

export default function HomePage() {
  const track = experience.filter((r) => r.highlight);
  const realProjects = projects.filter((p) => !p.placeholder);
  const software = skills.find((g) => g.category === "Software")?.items ?? [];

  return (
    <>
      {/* ================= Hero ================= */}
      <section className="relative isolate overflow-hidden bg-navy-950 text-white">
        <Photo name="hero" priority className="absolute inset-0 -z-20 h-full w-full" alt="" />
        <div className="shade-hero absolute inset-0 -z-10" aria-hidden="true" />
        <div className="container-site grid items-center gap-12 pb-36 pt-36 md:pt-48 lg:grid-cols-[1fr_21rem] lg:pb-44">
          <div className="max-w-[44rem]">
            <Image src={profile.photo} alt={`Portrait of ${profile.name}`} width={365} height={366} priority
              sizes="88px" className="hero-in mb-7 h-22 w-22 rounded-full border-2 border-gold-light object-cover lg:hidden" />
            <p className="kicker kicker-light hero-in">Civil Engineer and General Manager</p>
            <h1 className="hero-in mt-5 text-[2.7rem] leading-[1.04] sm:text-6xl lg:text-[4.2rem]" style={{ animationDelay: "0.08s" }}>
              {profile.name}
            </h1>
            <p className="hero-in mt-6 text-lg font-medium text-gold-light md:text-xl" style={{ animationDelay: "0.16s" }}>
              {profile.headline.replaceAll(" | ", "  /  ")}
            </p>
            <p className="hero-in mt-6 max-w-[38rem] text-lg leading-relaxed text-white/80" style={{ animationDelay: "0.24s" }}>
              {profile.intro}
            </p>
            <div className="hero-in mt-10 flex flex-wrap gap-3" style={{ animationDelay: "0.32s" }}>
              <Link href="/experience" className="btn btn-gold">Explore My Experience <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              <a href={profile.cvFile} download className="btn btn-ghost-light"><Download className="h-4 w-4" aria-hidden="true" /> Download My CV</a>
              <Link href="/contact" className="btn btn-ghost-light">Get in Touch</Link>
            </div>
          </div>

          <div className="hero-in hidden lg:block" style={{ animationDelay: "0.2s" }}>
            <div className="rounded-[4px] border border-white/15 bg-navy-950/60 p-3 backdrop-blur-sm">
              <Image src={profile.photo} alt={`Portrait of ${profile.name}`} width={365} height={366} priority
                sizes="320px" className="h-auto w-full rounded-[2px]" />
              <div className="px-2 pb-2 pt-4">
                <p className="font-[family-name:var(--font-display)] text-lg font-bold">{profile.shortName}</p>
                <p className="text-sm text-white/70">Civil Engineer, {profile.location}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Credentials bar ================= */}
      <section aria-label="Credentials" className="relative z-10 -mt-20 lg:-mt-24">
        <div className="container-site">
          <ul className="grid overflow-hidden rounded-[4px] bg-white shadow-[0_20px_50px_-20px_rgba(7,20,38,0.35)] sm:grid-cols-2 lg:grid-cols-4">
            {credentials.map(({ icon: Icon, title, text }, i) => (
              <li
                key={title}
                className={[
                  "flex gap-4 border-line p-6 md:p-7",
                  i > 0 ? "border-t sm:border-t-0" : "",
                  i % 2 === 1 ? "sm:border-l" : "",
                  i > 1 ? "sm:border-t lg:border-t-0" : "",
                  i > 0 ? "lg:border-l" : "",
                ].join(" ")}
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[3px] bg-navy-900 text-gold-light">
                  <Icon className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <div>
                  <p className="font-[family-name:var(--font-display)] text-xl font-bold text-ink">{title}</p>
                  <p className="mt-1 text-[0.93rem] leading-snug text-slate">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= About split ================= */}
      <section className="py-24 md:py-32" aria-labelledby="about-title">
        <div className="container-site grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="relative pb-8">
            <div className="aspect-[4/3] overflow-hidden rounded-[4px]">
              <Photo name="about" sizes="(min-width:1024px) 600px, 100vw" className="h-full w-full" />
            </div>
            <div className="absolute bottom-0 right-4 hidden w-64 rounded-[4px] bg-navy-900 p-6 text-white shadow-xl sm:block md:right-8">
              <Award className="h-7 w-7 text-gold-light" strokeWidth={1.6} aria-hidden="true" />
              <p className="mt-3 font-[family-name:var(--font-display)] text-lg font-bold leading-snug">ERA scholarship</p>
              <p className="mt-1 text-sm text-white/70">Master&apos;s study funded by the Ethiopian Roads Authority</p>
            </div>
          </div>
          <div>
            <SectionHead kicker="About me" id="about-title" title="From the construction site to the boardroom" />
            <p className="mt-6 text-lg text-slate">{profile.supportingStatement}</p>
            <p className="mt-4 text-slate">
              I began as a Site Engineer with the Amhara Rural Roads Authority, managed one of its road maintenance districts
              for more than five years, and then led Amhara Road Work Enterprise as General Manager. Alongside that role I
              served on the Board of Directors of Abay Insurance.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {profile.strengths.map((s) => (
                <li key={s} className="flex items-center gap-3 font-medium text-ink">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold/15 text-gold-ink" aria-hidden="true">
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M3.5 8.5l3 3 6-7" /></svg>
                  </span>
                  {s}
                </li>
              ))}
            </ul>
            <Link href="/about" className="btn btn-navy mt-10">More About Me <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      {/* ================= Services ================= */}
      <section className="bg-mist py-24 md:py-32" aria-labelledby="services-title">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHead kicker="What I do" id="services-title" title="Areas of expertise"
              lead="Practical experience across the life of road infrastructure: building it, maintaining it, and running the organisations responsible for it." />
            <Link href="/services" className="text-link inline-flex items-center gap-2">All services <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
          <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.id}>
                <Link href={`/services#${s.id}`} className="group flex h-full flex-col rounded-[4px] border border-line bg-white p-8 transition-shadow hover:shadow-[0_18px_40px_-22px_rgba(7,20,38,0.45)]">
                  <span className="grid h-14 w-14 place-items-center rounded-[3px] bg-navy-900 text-gold-light transition-colors group-hover:bg-gold group-hover:text-navy-950">
                    <ServiceIcon name={s.icon} className="h-7 w-7" />
                  </span>
                  <h3 className="mt-7 text-[1.35rem]">{s.title}</h3>
                  <p className="mt-3 flex-1 text-slate">{s.summary}</p>
                  <span className="mt-7 inline-flex items-center gap-2 text-[0.95rem] font-semibold text-navy-700">
                    Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= Statement band ================= */}
      <section className="relative isolate overflow-hidden bg-navy-950 text-white" aria-label="Focus">
        <Photo name="roadEthiopia" className="absolute inset-0 -z-20 h-full w-full" alt="" />
        <div className="absolute inset-0 -z-10 bg-navy-950/75" aria-hidden="true" />
        <div className="container-site py-24 text-center md:py-32">
          <p className="mx-auto max-w-4xl font-[family-name:var(--font-display)] text-3xl font-bold leading-tight md:text-[2.7rem]">
            Roads connect communities to markets, schools and health care. Building and maintaining them well has been my work since 2010.
          </p>
          <p className="mt-6 text-gold-light">{profile.name}</p>
        </div>
      </section>

      {/* ================= Track record ================= */}
      <section className="py-24 md:py-32" aria-labelledby="track-title">
        <div className="container-site">
          <SectionHead kicker="Career" id="track-title" title="Leadership track record" center
            lead="Selected positions in engineering, management and governance." />
          <ol className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {track.map((r) => (
              <li key={r.id} className="group relative flex flex-col rounded-[4px] border border-line bg-white p-7 transition-colors hover:border-navy-600">
                <span className="absolute inset-x-0 top-0 h-1 rounded-t-[4px] bg-navy-900 transition-colors group-hover:bg-gold" aria-hidden="true" />
                <p className="text-sm font-semibold text-gold-ink">
                  {r.start.slice(0, 4)}–{r.end === "present" ? "Present" : r.end.slice(0, 4)}
                </p>
                <h3 className="mt-3 text-xl">{r.role}</h3>
                <p className="mt-1 font-medium text-navy-700">{r.organization}</p>
                <p className="text-sm text-muted">{r.location}</p>
                <p className="mt-4 flex-1 text-[0.97rem] text-slate">{r.summary}</p>
                <Link href={`/experience#${r.id}`} className="mt-6 inline-flex items-center gap-2 text-[0.95rem] font-semibold text-navy-700">
                  Details <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">: {r.role}, {r.organization}</span>
                </Link>
              </li>
            ))}
          </ol>
          <div className="mt-12 text-center">
            <Link href="/experience" className="btn btn-ghost">View Full Experience</Link>
          </div>
        </div>
      </section>

      {/* ================= Who I work with ================= */}
      <section className="bg-navy-900 py-24 text-white md:py-28" aria-labelledby="audience-title">
        <div className="container-site grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <SectionHead light kicker="Working together" id="audience-title" title="Who I work with"
              lead="I am open to senior roles, collaboration and consulting with organisations that build and manage infrastructure." />
            <Link href="/contact" className="btn btn-gold mt-9">Start a Conversation</Link>
          </div>
          <ul className="grid gap-px overflow-hidden rounded-[4px] bg-white/10 sm:grid-cols-2">
            {audiences.map((a) => (
              <li key={a.title} className="bg-navy-900 p-7">
                <Users className="h-6 w-6 text-gold-light" strokeWidth={1.6} aria-hidden="true" />
                <h3 className="mt-4 text-lg">{a.title}</h3>
                <p className="mt-2 text-[0.97rem] text-white/70">{a.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= Projects (appears once real projects are added) ================= */}
      {realProjects.length > 0 && (
        <section className="py-24 md:py-32" aria-labelledby="projects-title">
          <div className="container-site">
            <div className="flex flex-wrap items-end justify-between gap-8">
              <SectionHead kicker="Portfolio" id="projects-title" title="Featured projects" />
              <Link href="/projects" className="text-link inline-flex items-center gap-2">All projects <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
            <ul className="mt-14 grid gap-6 md:grid-cols-3">
              {realProjects.slice(0, 3).map((p) => (
                <li key={p.slug}>
                  <Link href={`/projects/${p.slug}`} className="group block">
                    <div className="zoom-wrap aspect-[4/3] rounded-[4px] bg-navy-800">
                      {p.images[0] && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.images[0].src} alt={p.images[0].alt} className="photo h-full w-full" loading="lazy" />
                      )}
                    </div>
                    <p className="mt-4 text-sm text-muted">{p.type}, {p.location}</p>
                    <h3 className="mt-1 text-xl group-hover:text-navy-700">{p.title}</h3>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ================= Tools ================= */}
      <section className="border-b border-line py-14" aria-labelledby="tools-title">
        <div className="container-site flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-12">
          <h2 id="tools-title" className="shrink-0 text-lg text-muted">Software I work with</h2>
          <ul className="flex flex-wrap gap-3">
            {software.map((t) => (
              <li key={t} className="rounded-full border border-line bg-mist px-4 py-1.5 text-[0.93rem] font-medium text-ink">{t}</li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Planning a road or infrastructure project?"
        text="Let's talk about senior roles, engineering collaboration, consulting or board positions."
        cvFile={profile.cvFile}
      />
    </>
  );
}
