"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { NAV } from "@/lib/nav";
import { LinkedInIcon } from "./icons";

interface Props {
  name: string;
  title: string;
  email: string;
  phone: string;
  phoneHref: string;
  location: string;
  linkedin: string;
}

export function SiteHeader({ name, title, email, phone, phoneHref, location, linkedin }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/"));
  const solid = scrolled || open;

  return (
    <header className={`fixed inset-x-0 top-0 z-50 text-white transition-colors duration-300 ${solid ? "bg-navy-950 shadow-[0_1px_0_rgba(255,255,255,0.08)]" : "bg-transparent"}`}>
      {/* Top contact bar (desktop) */}
      <div className={`hidden overflow-hidden border-b border-white/10 transition-all duration-300 lg:block ${scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"}`}>
        <div className="container-site flex h-10 items-center justify-between text-[0.85rem] text-white/75">
          <div className="flex items-center gap-6">
            <a href={`mailto:${email}`} className="inline-flex items-center gap-2 hover:text-white"><Mail className="h-4 w-4 text-gold-light" aria-hidden="true" />{email}</a>
            <a href={phoneHref} className="inline-flex items-center gap-2 hover:text-white"><Phone className="h-4 w-4 text-gold-light" aria-hidden="true" />{phone}</a>
          </div>
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-gold-light" aria-hidden="true" />{location}</span>
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white">
              <LinkedInIcon className="h-4 w-4" /> LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div className="container-site flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3" aria-label={`${name}, home`}>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[3px] bg-gold font-[family-name:var(--font-display)] text-[0.95rem] font-extrabold text-navy-950" aria-hidden="true">AA</span>
          <span className="flex flex-col leading-tight">
            <span className="font-[family-name:var(--font-display)] text-[1.02rem] font-bold tracking-tight">{name}</span>
            <span className="text-[0.78rem] text-white/65">{title}</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.filter((n) => n.href !== "/contact").map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`block px-3.5 py-2 text-[0.95rem] font-medium transition-colors ${isActive(item.href) ? "text-gold-light" : "text-white/85 hover:text-white"}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="ml-4">
              <Link href="/contact" className="btn btn-gold !min-h-[2.6rem] !px-5 !py-2">Get in Touch</Link>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </div>

      <div id="mobile-nav" hidden={!open} className="border-t border-white/10 bg-navy-950 lg:hidden">
        <nav aria-label="Main mobile" className="container-site pb-6 pt-2">
          <ul>
            {NAV.map((item) => (
              <li key={item.href} className="border-b border-white/10">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`block py-3.5 text-[1.05rem] ${isActive(item.href) ? "text-gold-light" : "text-white/85"}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-5 space-y-2 text-[0.95rem] text-white/75">
            <a href={`mailto:${email}`} className="flex items-center gap-3"><Mail className="h-4 w-4 text-gold-light" aria-hidden="true" />{email}</a>
            <a href={phoneHref} className="flex items-center gap-3"><Phone className="h-4 w-4 text-gold-light" aria-hidden="true" />{phone}</a>
          </div>
        </nav>
      </div>
    </header>
  );
}
