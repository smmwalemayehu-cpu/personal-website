# Content verification notes

Every fact on the site was taken from the CV ("Asmamw best cv.pdf"). Nothing was added that the CV does not support.
This file lists the places where the CV was unclear or inconsistent, and what the site does about each.
Please review and correct in `content/` if needed.

## Things to check in the CV itself

1. **Hidden template text in the CV PDF.** The PDF contains invisible leftover text from the CV template
   ("ACCOMPLISHED AND AMBITIOUS [JOB TITLE] WITH [NUMBER] YEARS' EXPERIENCE…", plus the words "PINTU" and "SOLIYA").
   It does not show when printed, but recruiters' applicant-tracking systems read it. Consider re-exporting the CV
   without it. The site offers the original CV for download unchanged, as requested.
2. **Overlapping dates.** The CV lists *Teacher* until **December 2003** and *Project Coordinator, HAPCO* from
   **February 2003**. The site shows both exactly as recorded. If one date is a typo, correct it in
   `content/experience.json`.
3. **Board role overlaps General Manager role** (Feb 2020 – Jul 2022). This looks intentional (a board seat held
   while employed) and is shown as recorded.
4. **No role listed between September 2008 and September 2010.** The BSc was completed in 2009, which may explain this.
   The site does not fill the gap.
5. **"First-Class Contractor (GC 1) designation".** The CV's About Me says you hold this designation, while the job
   title reads "Amhara Road Work Enterprise/GC1". The site describes the enterprise as a GC-1 (first-class) road works
   enterprise, which both statements support. If the GC-1 licence is personally yours, add it to the biography.
6. **LinkedIn link.** The visible text in the CV is cut off; the site uses the full link stored in the PDF:
   https://www.linkedin.com/in/asmamaw-alemayehu-315130218/

## Wording made consistent (meaning unchanged)

| CV text | Site text |
|---|---|
| AMARA RURAL ROADS AUTHORITY / Amhara Rural Road Authority | Amhara Rural Roads Authority |
| AMHARA ROAD WORK ENTERPRISE/GC1 | Amhara Road Work Enterprise (GC-1) |
| Board of Director | Member of the Board of Directors |
| minister of education | Ministry of Education |
| Gondar Zuria, Bellessa & Smada | Gondar Zuria, Belessa and Simada |
| Ethiopian Road Authority (ERA) | Ethiopian Roads Authority (ERA) |
| Affan Oromo | Afaan Oromo |
| Dates such as "May 2017 - Jul 2022" | Full month names: "May 2017 – July 2022" |

Please confirm the spellings of **Belessa** and **Simada** match your preference.

## Deliberately not published

- Date of birth and nationality.
- Referees' phone numbers and emails. Only names and organisations are stored, and the references section is
  switched off (`references.enabled` in `content/profile.json`).
- Skill-level bars from the CV (the site lists skills without proficiency levels).

## Placeholders waiting for your information

- **Projects:** three clearly marked placeholder cards, one per employer. Add real project names, locations, scope,
  photos and outcomes in `content/projects.json`.
- **Research:** abstract, methodology, findings and the thesis PDF (`content/research.json`).
- **Photographs:** the banners and service images are free stock photos from Unsplash (credited in the footer).
  They illustrate the type of work only and are never presented as your projects. Replace them with your own
  site photographs in `content/images.json` whenever you can; project cards use drawings until real photos are added.
