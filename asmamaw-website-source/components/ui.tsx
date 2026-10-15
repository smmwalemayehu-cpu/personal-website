import Link from "next/link";
import type { ReactNode } from "react";
import type { ImageKey } from "@/lib/content";
import { Photo } from "./Photo";

/** Photo banner that opens every inner page (sits under the transparent header). */
export function PageBanner({
  image,
  title,
  lead,
  crumb,
}: {
  image: ImageKey;
  title: string;
  lead?: string;
  crumb?: { href: string; label: string };
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 text-white">
      <Photo name={image} priority className="absolute inset-0 -z-20 h-full w-full" alt="" />
      <div className="shade-banner absolute inset-0 -z-10" aria-hidden="true" />
      <div className="container-site pb-16 pt-36 md:pb-24 md:pt-48">
        <nav aria-label="Breadcrumb" className="hero-in text-[0.9rem] text-white/70">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            {crumb && (<><li aria-hidden="true">/</li><li><Link href={crumb.href} className="hover:text-white">{crumb.label}</Link></li></>)}
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-gold-light">{title}</li>
          </ol>
        </nav>
        <h1 className="hero-in mt-5 max-w-3xl text-4xl sm:text-5xl lg:text-[3.6rem]" style={{ animationDelay: "0.08s" }}>{title}</h1>
        {lead && <p className="hero-in mt-6 max-w-2xl text-lg text-white/80" style={{ animationDelay: "0.16s" }}>{lead}</p>}
      </div>
    </section>
  );
}

export function SectionHead({
  kicker,
  title,
  lead,
  light = false,
  center = false,
  id,
}: {
  kicker?: string;
  title: string;
  lead?: string;
  light?: boolean;
  center?: boolean;
  id?: string;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {kicker && <p className={`kicker ${light ? "kicker-light" : ""} ${center ? "justify-center" : ""}`}>{kicker}</p>}
      <h2 id={id} className={`mt-4 text-3xl md:text-[2.6rem] ${light ? "text-white" : "text-ink"}`}>{title}</h2>
      {lead && <p className={`mt-5 text-lg ${light ? "text-white/75" : "text-slate"}`}>{lead}</p>}
    </div>
  );
}

/** Marks content the site owner still needs to supply. */
export function Pending({ children }: { children: ReactNode }) {
  return (
    <div className="pending rounded-[3px] px-4 py-3 text-[0.95rem]">
      <span className="font-semibold">To be added: </span>
      {children}
    </div>
  );
}

/** Closing call-to-action band used on most pages. */
export function CtaBand({ title, text, cvFile }: { title: string; text: string; cvFile: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 text-white">
      <Photo name="mountainPass" className="absolute inset-0 -z-20 h-full w-full" alt="" />
      <div className="absolute inset-0 -z-10 bg-navy-950/85" aria-hidden="true" />
      <div className="container-site grid gap-8 py-20 md:py-24 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-[2.5rem]">{title}</h2>
          <p className="mt-4 text-lg text-white/75">{text}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className="btn btn-gold">Get in Touch</Link>
          <a href={cvFile} download className="btn btn-ghost-light">Download My CV</a>
        </div>
      </div>
    </section>
  );
}
