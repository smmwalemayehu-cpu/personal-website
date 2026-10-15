import Link from "next/link";
import { Download, Mail, MapPin, Phone } from "lucide-react";
import { images, profile, services, telHref } from "@/lib/content";
import { MORE, NAV } from "@/lib/nav";
import { LinkedInIcon } from "./icons";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const usesStock = Object.values(images).some((i) => i.src.includes("unsplash"));
  return (
    <footer className="bg-navy-950 text-white/70">
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.3fr_1.3fr]">
        <div>
          <Link href="/" className="flex items-center gap-3 text-white">
            <span className="grid h-10 w-10 place-items-center rounded-[3px] bg-gold font-[family-name:var(--font-display)] font-extrabold text-navy-950" aria-hidden="true">AA</span>
            <span className="font-[family-name:var(--font-display)] text-lg font-bold">{profile.name}</span>
          </Link>
          <p className="mt-5 max-w-xs text-[0.95rem] leading-relaxed">
            Civil engineer and construction management professional in road infrastructure, based in {profile.location}.
          </p>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile"
            className="mt-6 inline-grid h-10 w-10 place-items-center rounded-[3px] border border-white/20 text-white hover:border-gold hover:text-gold-light">
            <LinkedInIcon className="h-4 w-4" />
          </a>
        </div>

        <div>
          <h2 className="text-base text-white">Explore</h2>
          <ul className="mt-5 space-y-2.5 text-[0.95rem]">
            {[...NAV, ...MORE].map((n) => (
              <li key={n.href}><Link className="hover:text-gold-light" href={n.href}>{n.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-base text-white">Services</h2>
          <ul className="mt-5 space-y-2.5 text-[0.95rem]">
            {services.map((s) => (
              <li key={s.id}><Link className="hover:text-gold-light" href={`/services#${s.id}`}>{s.title}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-base text-white">Contact</h2>
          <ul className="mt-5 space-y-3 text-[0.95rem]">
            <li className="flex gap-3"><Mail className="mt-1 h-4 w-4 shrink-0 text-gold-light" aria-hidden="true" /><a className="break-all hover:text-gold-light" href={`mailto:${profile.email}`}>{profile.email}</a></li>
            {profile.phones.map((p) => (
              <li key={p} className="flex gap-3"><Phone className="mt-1 h-4 w-4 shrink-0 text-gold-light" aria-hidden="true" /><a className="hover:text-gold-light" href={telHref(p)}>{p}</a></li>
            ))}
            <li className="flex gap-3"><MapPin className="mt-1 h-4 w-4 shrink-0 text-gold-light" aria-hidden="true" />{profile.location}</li>
          </ul>
          <a href={profile.cvFile} download className="btn btn-ghost-light mt-6 !min-h-[2.6rem] !py-2 text-sm"><Download className="h-4 w-4" aria-hidden="true" /> Download CV</a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-2 py-6 text-[0.82rem] text-white/50 md:flex-row md:justify-between">
          <p>© {year} {profile.name}. All rights reserved.</p>
          {usesStock && <p>Stock photography from <a className="underline hover:text-white" href="https://unsplash.com" target="_blank" rel="noopener noreferrer">Unsplash</a>.</p>}
        </div>
      </div>
    </footer>
  );
}
