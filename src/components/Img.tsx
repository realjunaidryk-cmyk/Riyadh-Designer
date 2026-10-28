import Image from "next/image";
import type { CSSProperties } from "react";
import type { Img as ImgData } from "@/content/images";
import type { Lang } from "@/content/site";

type Props = {
  img: ImgData;
  lang: Lang;
  sizes?: string;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
  /** use the container's own size instead of the image's ratio */
  fill?: boolean;
  children?: React.ReactNode;
};

// A picture from the central image list, or a quiet drawn placeholder while its file is missing.
export function Img({ img, lang, sizes = "100vw", priority, className, style, fill, children }: Props) {
  const ratioStyle = fill ? style : ({ "--ratio": img.ratio, ...style } as CSSProperties);
  return (
    <div className={["media", className].filter(Boolean).join(" ")} style={ratioStyle}>
      {img.ready ? (
        <Image src={img.src} alt={img.alt[lang]} fill sizes={sizes} priority={priority} />
      ) : (
        <Placeholder seed={hash(img.key)} label={img.alt[lang]} />
      )}
      {children}
    </div>
  );
}

// An interior elevation in limestone tones: a wall, an opening, a floor line. Varies by key.
export function Placeholder({ seed, label }: { seed: number; label: string }) {
  const r = rng(seed);
  const wall = ["#e4d9c8", "#ddd0bd", "#e8dfd2", "#d9cbb6"][seed % 4];
  const floorY = 300 + r() * 50;
  const archX = 120 + r() * 260;
  const archW = 120 + r() * 80;
  const sofa = r() > 0.4;
  return (
    <svg className="placeholder" viewBox="0 0 600 450" preserveAspectRatio="xMidYMid slice" role="img" aria-label={label}>
      <rect width="600" height="450" fill={wall} />
      <rect y={floorY} width="600" height={450 - floorY} fill="#cbbba4" />
      <path
        d={`M${archX} ${floorY} V${150} a${archW / 2} ${archW / 2} 0 0 1 ${archW} 0 V${floorY} Z`}
        fill="#f3ede4"
        stroke="#bfae95"
      />
      {sofa ? (
        <g fill="#bfae95">
          <rect x={archX + archW + 40} y={floorY - 64} width="170" height="40" rx="6" />
          <rect x={archX + archW + 40} y={floorY - 100} width="170" height="40" rx="6" opacity="0.7" />
        </g>
      ) : (
        <g stroke="#bfae95" strokeWidth="3" fill="none">
          <line x1={archX - 90} y1={floorY - 120} x2={archX - 90} y2={floorY} />
          <circle cx={archX - 90} cy={floorY - 140} r="22" />
        </g>
      )}
      <line x1="0" y1={floorY} x2="600" y2={floorY} stroke="#b8a68c" />
    </svg>
  );
}

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function rng(a: number) {
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
