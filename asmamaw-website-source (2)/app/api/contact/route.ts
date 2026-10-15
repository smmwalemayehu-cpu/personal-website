import { NextResponse } from "next/server";
import { validateContact, type ContactInput } from "@/lib/contact";
import profile from "@/content/profile.json";

export const runtime = "nodejs";

/* Simple in-memory rate limit: 5 messages per IP per 15 minutes.
   On serverless hosting each instance keeps its own counter, which is
   enough to stop casual abuse; use a shared store for stricter limits. */
const WINDOW_MS = 15 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Strip characters that could inject extra email headers. */
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

export async function POST(request: Request) {
  // Only accept same-origin JSON posts.
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return NextResponse.json({ error: "Requests from other sites are not accepted." }, { status: 403 });
  }
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ error: "Unsupported request format." }, { status: 415 });
  }

  let body: Partial<ContactInput> & { website?: string; startedAt?: number };
  try {
    const raw = await request.text();
    if (raw.length > 20_000) return NextResponse.json({ error: "Message is too long." }, { status: 413 });
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "The request could not be read." }, { status: 400 });
  }

  // Spam traps: hidden "website" field must stay empty; humans take more than 3 seconds to fill the form.
  const tooFast = typeof body.startedAt === "number" && Date.now() - body.startedAt < 3000;
  if (body.website || tooFast) {
    return NextResponse.json({ error: "Your message was flagged as automated. Please email directly instead." }, { status: 400 });
  }

  const errors = validateContact(body);
  if (Object.keys(errors).length) {
    return NextResponse.json({ error: "Check the highlighted fields.", fields: errors }, { status: 422 });
  }

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many messages from this connection. Try again in 15 minutes." }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || profile.email;
  const from = process.env.CONTACT_FROM_EMAIL || "Website contact form <onboarding@resend.dev>";
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set; message not delivered.");
    return NextResponse.json(
      { error: "The contact form is not connected to email yet.", fallback: true },
      { status: 503 },
    );
  }

  const name = oneLine(body.name!);
  const email = oneLine(body.email!);
  const subject = oneLine(body.subject!);
  const message = body.message!.trim();

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `[Website] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${escapeHtml(name)}<br><strong>Email:</strong> ${escapeHtml(email)}<br><strong>Subject:</strong> ${escapeHtml(subject)}</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    }),
  }).catch((err) => {
    console.error("[contact] network error", err);
    return null;
  });

  if (!res || !res.ok) {
    if (res) console.error("[contact] email provider error", res.status, await res.text().catch(() => ""));
    return NextResponse.json(
      { error: "The message could not be delivered right now.", fallback: true },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
