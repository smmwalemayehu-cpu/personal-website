import { images, type ImageKey } from "@/lib/content";

const isUnsplash = (src: string) => src.startsWith("https://images.unsplash.com/");

function sized(src: string, w: number) {
  return isUnsplash(src) ? `${src}?auto=format&fit=crop&w=${w}&q=75` : src;
}

/**
 * Site photograph from content/images.json.
 * Remote Unsplash photos get responsive sizes; local files are served as they are.
 */
export function Photo({
  name,
  className = "",
  sizes = "100vw",
  priority = false,
  alt,
}: {
  name: ImageKey;
  className?: string;
  sizes?: string;
  priority?: boolean;
  alt?: string;
}) {
  const img = images[name];
  const widths = [640, 960, 1280, 1920];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={sized(img.src, 1280)}
      srcSet={isUnsplash(img.src) ? widths.map((w) => `${sized(img.src, w)} ${w}w`).join(", ") : undefined}
      sizes={sizes}
      alt={alt ?? img.alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={`photo ${className}`}
    />
  );
}
