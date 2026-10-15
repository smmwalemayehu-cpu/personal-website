import profileData from "@/content/profile.json";
import experienceData from "@/content/experience.json";
import educationData from "@/content/education.json";
import skillsData from "@/content/skills.json";
import researchData from "@/content/research.json";
import projectsData from "@/content/projects.json";
import servicesData from "@/content/services.json";
import imagesData from "@/content/images.json";

/* ---------- Types (keep in sync with the JSON files in /content) ---------- */

export type Category = "management" | "engineering" | "governance" | "community" | "education";

export interface Role {
  id: string;
  role: string;
  organization: string;
  location: string;
  /** "YYYY-MM" */
  start: string;
  /** "YYYY-MM" or "present" */
  end: string;
  category: Category;
  highlight: boolean;
  summary: string;
  responsibilities: string[];
}

export interface Degree {
  id: string;
  degree: string;
  specialisation: string;
  institution: string;
  location: string;
  year: string;
  notes: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectDocument {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  placeholder: boolean;
  title: string;
  location: string;
  type: string;
  period: string;
  employer: string;
  role: string;
  responsibilities: string[];
  description: string;
  scope: string;
  challenges: string;
  solutions: string;
  outcomes: string;
  images: ProjectImage[];
  documents: ProjectDocument[];
}

export interface Service {
  id: string;
  icon: string;
  image: ImageKey;
  title: string;
  summary: string;
  includes: string[];
  basis: string;
}

export interface SiteImage {
  src: string;
  alt: string;
  credit: string;
  page: string;
}

const { _note, ...imageMap } = imagesData;
void _note;
export type ImageKey = keyof typeof imageMap;
export const images = imageMap as Record<ImageKey, SiteImage>;
export const services = servicesData as Service[];

export const profile = profileData;
export const research = researchData;
export const skills = skillsData as SkillGroup[];
export const education = educationData as Degree[];
export const projects = projectsData as Project[];

/** Roles sorted most recent start date first. */
export const experience = [...(experienceData as Role[])].sort((a, b) =>
  b.start.localeCompare(a.start),
);

export const categoryLabel: Record<Category, string> = {
  management: "Management",
  engineering: "Engineering",
  governance: "Governance",
  community: "Community programmes",
  education: "Education",
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function formatMonth(value: string): string {
  if (value === "present") return "Present";
  const [year, month] = value.split("-");
  const m = Number(month);
  return m >= 1 && m <= 12 ? `${MONTHS[m - 1]} ${year}` : year;
}

export function formatRange(start: string, end: string): string {
  return `${formatMonth(start)} – ${formatMonth(end)}`;
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
