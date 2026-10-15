"use client";

import { useEffect, useRef, useState } from "react";
import { LIMITS, validateContact, type ContactErrors, type ContactInput } from "@/lib/contact";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "error"; message: string; fallback: boolean };

const empty: ContactInput = { name: "", email: "", subject: "", message: "" };

export function ContactForm({ email }: { email: string }) {
  const [values, setValues] = useState<ContactInput>(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactInput, boolean>>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const startedAt = useRef<number>(0);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => { startedAt.current = Date.now(); }, []);

  const update = (key: keyof ContactInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...values, [key]: e.target.value };
    setValues(next);
    if (touched[key]) setErrors(validateContact(next));
  };
  const blur = (key: keyof ContactInput) => () => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validateContact(values));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    setTouched({ name: true, email: true, subject: true, message: true });
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }
    const website = (e.currentTarget.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website, startedAt: startedAt.current }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus({ kind: "sent" });
        setValues(empty);
        setTouched({});
      } else {
        if (data.fields) setErrors(data.fields);
        setStatus({ kind: "error", message: data.error ?? "The message could not be sent.", fallback: Boolean(data.fallback) });
      }
    } catch {
      setStatus({ kind: "error", message: "The message could not be sent because the connection failed.", fallback: true });
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  const field = (key: keyof ContactInput) => ({
    id: `contact-${key}`,
    name: key,
    value: values[key],
    onChange: update(key),
    onBlur: blur(key),
    "aria-invalid": touched[key] && errors[key] ? true : undefined,
    "aria-describedby": touched[key] && errors[key] ? `contact-${key}-error` : undefined,
    className:
      "mt-2 block w-full rounded-[3px] border bg-white px-4 py-3 text-ink placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-gold " +
      (touched[key] && errors[key] ? "border-red-700" : "border-line hover:border-navy-200"),
  });

  const err = (key: keyof ContactInput) =>
    touched[key] && errors[key] ? (
      <p id={`contact-${key}-error`} className="mt-2 text-sm font-semibold text-red-800">{errors[key]}</p>
    ) : null;

  if (status.kind === "sent") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="border-t-[3px] border-navy-900 bg-concrete p-8 outline-none">
        <h2 className="text-2xl">Message sent</h2>
        <p className="mt-3 text-slate">Thank you. Your message has been delivered, and I will reply to the email address you gave.</p>
        <button type="button" className="btn btn-outline mt-6" onClick={() => setStatus({ kind: "idle" })}>
          Write another message
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-6" aria-describedby="contact-form-note">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="font-semibold">Name</label>
          <input type="text" autoComplete="name" maxLength={LIMITS.name.max} required {...field("name")} />
          {err("name")}
        </div>
        <div>
          <label htmlFor="contact-email" className="font-semibold">Email</label>
          <input type="email" autoComplete="email" inputMode="email" maxLength={254} required {...field("email")} />
          {err("email")}
        </div>
      </div>
      <div>
        <label htmlFor="contact-subject" className="font-semibold">Subject</label>
        <input type="text" maxLength={LIMITS.subject.max} required {...field("subject")} />
        {err("subject")}
      </div>
      <div>
        <label htmlFor="contact-message" className="font-semibold">Message</label>
        <textarea rows={7} maxLength={LIMITS.message.max} required {...field("message")} />
        <div className="flex justify-between gap-4">
          {err("message") ?? <span />}
          <span className="mt-2 text-xs text-muted">{values.message.length} / {LIMITS.message.max}</span>
        </div>
      </div>

      {/* Honeypot: hidden from people and assistive tech, often filled by bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status.kind === "error" && (
        <div ref={statusRef} tabIndex={-1} role="alert" className="border-l-4 border-red-700 bg-red-50 px-5 py-4 text-red-900 outline-none">
          <p className="font-semibold">{status.message}</p>
          {status.fallback && (
            <p className="mt-1">
              Please email me directly at{" "}
              <a className="font-semibold underline" href={`mailto:${email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(values.message)}`}>{email}</a>.
              Your text is still in the form.
            </p>
          )}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-navy disabled:opacity-60" disabled={status.kind === "sending"}>
          {status.kind === "sending" ? "Sending message…" : "Send message"}
        </button>
        <p id="contact-form-note" className="text-sm text-muted">All fields are required.</p>
      </div>
    </form>
  );
}
