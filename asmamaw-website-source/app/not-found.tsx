import Link from "next/link";
import { PageBanner } from "@/components/ui";

export default function NotFound() {
  return (
    <>
      <PageBanner image="mountainPass" title="Page not found" lead="This address doesn't lead anywhere on the site. The page may have moved." />
      <section className="py-16">
        <div className="container-site flex flex-wrap gap-3">
          <Link href="/" className="btn btn-navy">Go to the home page</Link>
          <Link href="/contact" className="btn btn-ghost">Contact me</Link>
        </div>
      </section>
    </>
  );
}
