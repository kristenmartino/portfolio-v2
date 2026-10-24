import Image from "next/image";

type MeridianReportFigureProps = {
  src: string;
  title: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  compact?: boolean;
};

export function MeridianReportFigure({
  src, title, alt, caption, width, height, compact = false,
}: MeridianReportFigureProps) {
  return (
    <figure className={compact
      ? "my-8 w-full max-w-[440px]"
      : "my-8 w-[calc(100vw-3rem)] md:w-[calc(100vw-6rem)] lg:w-[min(1152px,calc(100vw-8rem))]"}>
      <a href={src} target="_blank" rel="noreferrer"
        aria-label={`Open ${title} screenshot at full resolution`}
        className="block border border-[var(--color-graphite-80)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-signal-blue)]">
        <Image src={src} alt={alt} width={width} height={height}
          unoptimized loading="lazy" className="block h-auto w-full" />
      </a>
      <figcaption className="mt-3 text-xs md:text-sm leading-relaxed text-[var(--color-graphite-60)] italic">
        {caption}
      </figcaption>
    </figure>
  );
}
