/** Validation shared by the contact form (browser) and the API route (server). */

export interface ContactInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

export const LIMITS = {
  name: { min: 2, max: 100 },
  subject: { min: 3, max: 150 },
  message: { min: 20, max: 5000 },
};

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i;

export function validateContact(input: Partial<ContactInput>): ContactErrors {
  const errors: ContactErrors = {};
  const name = (input.name ?? "").trim();
  const email = (input.email ?? "").trim();
  const subject = (input.subject ?? "").trim();
  const message = (input.message ?? "").trim();

  if (name.length < LIMITS.name.min) errors.name = "Enter your name.";
  else if (name.length > LIMITS.name.max) errors.name = `Keep your name under ${LIMITS.name.max} characters.`;

  if (!email) errors.email = "Enter your email address so I can reply.";
  else if (email.length > 254 || !EMAIL_RE.test(email)) errors.email = "Enter a valid email address, like name@example.com.";

  if (subject.length < LIMITS.subject.min) errors.subject = "Enter a subject.";
  else if (subject.length > LIMITS.subject.max) errors.subject = `Keep the subject under ${LIMITS.subject.max} characters.`;

  if (message.length < LIMITS.message.min) errors.message = `Write at least ${LIMITS.message.min} characters.`;
  else if (message.length > LIMITS.message.max) errors.message = `Keep the message under ${LIMITS.message.max} characters.`;

  return errors;
}
