import type { Metadata } from "next";
import { Check, Download, Mail, MapPin, Phone } from "lucide-react";
import { profile, telHref } from "@/lib/content";
import { ContactForm } from "@/components/ContactForm";
import { LinkedInIcon } from "@/components/icons";
import { Photo } from "@/components/Photo";
import { PageBanner } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${profile.name} about employment opportunities, engineering collaboration, consulting or professional networking.`,
  alternates: { canonical: "/contact" },
};

const reasons = [
  "Senior roles in construction, road infrastructure and operations management",
  "Engineering collaboration on road and infrastructure projects",
  "Consulting enquiries",
  "Board and governance positions",
  "Professional networking",
];

export default function ContactPage() {
  const cards = [
    { icon: Mail, label: "Email", lines: [{ text: profile.email, href: `mailto:${profile.email}` }] },
    ...(profile.showPhoneOnContactPage
      ? [{ icon: Phone, label: "Phone", lines: profile.phones.map((p) => ({ text: p, href: telHref(p) })) }]
      : []),
    { icon: LinkedInIcon, label: "LinkedIn", lines: [{ text: "View my profile", href: profile.linkedin, external: true }] },
    { icon: MapPin, label: "Location", lines: [{ text: profile.location }] },
  ] as { icon: React.ComponentType<{ className?: string }>; label: string; lines: { text: string; href?: string; external?: boolean }[] }[];

  return (
    <>
      <PageBanner image="city" title="Get in touch" lead="Tell me about the role, project or collaboration you have in mind. I will reply by email." />

      <section aria-label="Contact details" className="relative z-10 -mt-12">
        <div className="container-site">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {cards.map(({ icon: Icon, label, lines }) => (
              <li key={label} className="flex gap-4 rounded-[4px] bg-white p-5 shadow-[0_18px_40px_-22px_rgba(7,20,38,0.45)] lg:block lg:p-6">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[3px] bg-navy-900 text-gold-light"><Icon className="h-5 w-5" /></span>
                <div className="min-w-0 lg:mt-4">
                <p className="text-sm text-muted">{label}</p>
                {lines.map((l) =>
                  l.href ? (
                    <a key={l.text} href={l.href} {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="block break-all font-semibold text-ink hover:text-navy-700">{l.text}</a>
                  ) : (
                    <p key={l.text} className="font-semibold text-ink">{l.text}</p>
                  ),
                )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <div className="rounded-[4px] border border-line bg-white p-7 md:p-10">
            <p className="kicker">Send a message</p>
            <h2 className="mt-4 text-3xl md:text-[2.3rem]">How can I help?</h2>
            <div className="mt-8"><ContactForm email={profile.email} /></div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="relative overflow-hidden rounded-[4px] bg-navy-900 text-white">
              <Photo name="about" className="absolute inset-0 h-full w-full opacity-30" sizes="480px" alt="" />
              <div className="relative p-8 md:p-10">
                <h2 className="text-2xl">I welcome enquiries about</h2>
                <ul className="mt-6 space-y-3">
                  {reasons.map((r) => (
                    <li key={r} className="flex gap-3">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold text-navy-950"><Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" /></span>
                      <span className="text-white/90">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="rounded-[4px] bg-mist p-8">
              <h2 className="text-xl">Prefer to review my background first?</h2>
              <p className="mt-2 text-slate">My CV has full details of my roles, education and skills.</p>
              <a href={profile.cvFile} download className="btn btn-navy mt-5"><Download className="h-4 w-4" aria-hidden="true" /> Download My CV</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
