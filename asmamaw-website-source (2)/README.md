# Asmamaw Alemayehu Abate — Professional Website

A personal career website built with **Next.js 16, TypeScript and Tailwind CSS 4, with Lucide icons**.
All text comes from the CV and lives in plain JSON files, so content can be changed without touching code.

## Pages

| Address | What it shows |
|---|---|
| `/` | Photo hero with name, headline and portrait; credentials bar; about; areas of expertise; leadership track record; who I work with; software; call to action |
| `/about` | Biography, how I can contribute, academic credentials, skills and tools; optional references |
| `/services` | Six areas of expertise, each with what it includes and the experience behind it |
| `/experience` | Career at a glance, leadership roles and earlier career |
| `/education` | Degrees (linked from About and the footer) |
| `/research` | Master's thesis, with spaces for abstract, methodology, findings and PDF |
| `/projects` and `/projects/<slug>` | Project portfolio and project detail pages |
| `/contact` | Email, phone, LinkedIn and a working contact form |

The original CV is downloadable from every page (`public/cv/Asmamaw-Alemayehu-Abate-CV.pdf`).

---

## 1. Run it on your computer

Requirements: [Node.js](https://nodejs.org) 20.9 or newer.

```bash
npm install
cp .env.example .env.local     # then fill in the values (see section 3)
npm run dev                    # open http://localhost:3000
```

To check a production build: `npm run build` then `npm start`.

---

## 2. Update the content (no coding needed)

Everything you may want to change is in the `content/` folder:

| File | Contains |
|---|---|
| `content/profile.json` | Name, headline, introduction, contact details, LinkedIn, overview, biography, strengths, languages, references |
| `content/experience.json` | Each job: title, organisation, location, dates (`"YYYY-MM"`), category, responsibilities |
| `content/education.json` | Degrees |
| `content/skills.json` | Skill groups |
| `content/research.json` | Thesis details, abstract, methodology, findings, PDF link |
| `content/projects.json` | Portfolio projects |
| `content/services.json` | Areas of expertise (title, summary, what it includes, icon, photo) |
| `content/images.json` | All site photographs (hero, banners, service photos) |

**Easiest way:** once the site is on GitHub and Vercel (section 4), open the file on github.com, click the pencil icon,
edit, and press **Commit changes**. Vercel republishes the site automatically in about a minute. No rebuild on your
computer is needed.

Tips:
- Keep the quotation marks and commas exactly as they are; only change the text between quotes.
- Dates use the form `"2017-05"` (May 2017). Use `"present"` for a current role.
- Job `category` is one of `management`, `engineering`, `governance`, `community`, `education`. It sets the marker
  and label on the timeline.
- Set `"highlight": true` on a job to show it in **Career highlights** on the home page.

### Add a real project

1. Put photographs, drawings and PDFs in `public/projects/<project-slug>/`.
2. In `content/projects.json`, replace a placeholder (or add a new entry) and set `"placeholder": false`:

```json
{
  "slug": "example-road-upgrade",
  "placeholder": false,
  "title": "Example Road Upgrade",
  "location": "Example Woreda, Amhara Region",
  "type": "Gravel road upgrade",
  "period": "2018 – 2020",
  "employer": "Amhara Road Work Enterprise",
  "role": "General Manager",
  "responsibilities": ["...", "..."],
  "description": "...",
  "scope": "...",
  "challenges": "...",
  "solutions": "...",
  "outcomes": "...",
  "images": [
    { "src": "/projects/example-road-upgrade/site-1.jpg", "alt": "Describe the photo", "caption": "Optional caption" }
  ],
  "documents": [
    { "label": "Completion report (PDF)", "href": "/projects/example-road-upgrade/report.pdf" }
  ]
}
```

Placeholder projects are hidden from search engines and the sitemap; real ones are included automatically.

### Add the thesis

Fill `abstract`, `methodology` and `findings` in `content/research.json`. To offer the thesis for download,
place it at `public/research/thesis.pdf` and set `"thesisPdf": "/research/thesis.pdf"`.

### Replace the stock photographs

The site ships with free Unsplash photographs of roads and construction sites, loaded from Unsplash.
Your own photos are better. Put them in `public/images/` (landscape, at least 1600 px wide) and change
`src` in `content/images.json`, for example `"src": "/images/hero.jpg"`. Update `alt` to describe the new photo.

Featured projects appear on the home page automatically once a project has `"placeholder": false`.

### Change the portrait or CV

Replace `public/images/portrait.png` (square image works best) or `public/cv/Asmamaw-Alemayehu-Abate-CV.pdf`,
keeping the same file names. If you rename them, update `photo` / `cvFile` in `content/profile.json`.

### Show references

References are hidden by default and only names and organisations are stored — never referees' phone numbers or
emails. To show them on the About page, set `"enabled": true` under `references` in `content/profile.json`.

### Hide the phone numbers

Set `"showPhoneOnContactPage": false` in `content/profile.json`.

---

## 3. Make the contact form deliver email

The form sends messages through [Resend](https://resend.com) (the free plan is enough). Until it is configured, the form
tells visitors it is not connected yet and offers your email address instead — it never shows a false "sent" message.

1. Create a Resend account and an **API key**.
2. Set these environment variables (in `.env.local` for your computer, and in Vercel → Project → Settings →
   Environment Variables for the live site):

| Variable | Value |
|---|---|
| `RESEND_API_KEY` | Your Resend API key |
| `CONTACT_TO_EMAIL` | Where messages arrive, e.g. `alazarabel1962@gmail.com` |
| `CONTACT_FROM_EMAIL` | `Website contact form <onboarding@resend.dev>` to start. Note: Resend's test sender only delivers to the email address of your Resend account, so sign up to Resend with the same address as `CONTACT_TO_EMAIL`, or verify your own domain in Resend and use e.g. `Website <contact@yourdomain.com>`. |
| `NEXT_PUBLIC_SITE_URL` | The live address, e.g. `https://www.asmamaw-alemayehu.com` |

3. Redeploy. Replies go straight to the visitor because their address is set as *reply-to*.

Protections built in: server-side validation, a hidden spam trap, a minimum fill time, same-site check,
size limits, header-injection filtering, HTML escaping, and a limit of 5 messages per connection per 15 minutes.
The API key stays on the server and is never sent to the browser.

---

## 4. Publish the site (Vercel, free)

1. Create a free account at [github.com](https://github.com) and a new **private** repository; upload this folder
   (everything except `node_modules` and `.next`).
2. Create a free account at [vercel.com](https://vercel.com), choose **Add New → Project**, and import the repository.
   Vercel detects Next.js automatically.
3. Add the environment variables from section 3, then click **Deploy**.
4. Optional: under **Settings → Domains**, add your own domain and follow the DNS instructions.
5. After the first deploy, update `NEXT_PUBLIC_SITE_URL` to the final address and redeploy, so search engines and
   social previews use the right links.

Other hosts that support Next.js (Netlify, Render, a VPS with `npm run build && npm start`) also work.

## SEO and accessibility included

Page titles and descriptions, canonical links, `sitemap.xml`, `robots.txt`, a generated social-sharing image,
structured data (schema.org `Person`), semantic headings, keyboard-visible focus, a skip link, reduced-motion support,
WCAG AA text contrast, and responsive layouts from phone to desktop.

## Project structure

```
app/            pages, contact API route, sitemap, robots, social image
components/     header, footer, contact form, photos, icons, drawings, shared UI
content/        all editable text (JSON)
lib/            content loading, formatting, form validation
public/         portrait, CV, project files
```
