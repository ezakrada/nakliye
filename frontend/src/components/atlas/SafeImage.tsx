"use client";

type Props = {
  src: string;
  alt: string;
  fallbackSeed?: string;
  fallbackW?: number;
  fallbackH?: number;
  className?: string;
};

/**
 * Plain <img> wrapper with onError fallback to Lorem Picsum.
 * Lives in a Client Component so onError can hydrate.
 */
export function SafeImage({
  src,
  alt,
  fallbackSeed = "img",
  fallbackW = 800,
  fallbackH = 450,
  className = "",
}: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={className}
      onError={(e) => {
        const img = e.currentTarget;
        img.onerror = null;
        img.src = `https://picsum.photos/seed/${fallbackSeed}/${fallbackW}/${fallbackH}`;
      }}
    />
  );
}
