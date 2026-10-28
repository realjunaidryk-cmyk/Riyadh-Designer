import type { CSSProperties } from "react";
import type { ResolvedSlot } from "@/content/media";

type Props = {
  slot: ResolvedSlot;
  alt: string;
  /** keeps the placeholder drawings from repeating */
  seed?: number;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
  /** videos autoplay muted in a loop unless this is false */
  autoPlay?: boolean;
};

// A real picture or film when its file exists; otherwise a drawing of a Najdi wall in the page's colours.
export function Media({ slot, alt, seed = 0, priority, className, style, autoPlay = true }: Props) {
  const frameStyle = { "--ratio": slot.ratio, ...style } as CSSProperties;

  let inner;
  if (slot.ready && slot.kind === "video") {
    inner = (
      <video
        src={slot.src}
        poster={slot.posterReady ? slot.poster : undefined}
        muted
        loop
        playsInline
        autoPlay={autoPlay}
        preload={priority ? "auto" : "metadata"}
        aria-label={alt}
        data-reel-video
      />
    );
  } else if (slot.ready || (slot.kind === "video" && slot.posterReady)) {
    inner = (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={slot.kind === "video" ? slot.poster : slot.src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    );
  } else {
    inner = <Placeholder seed={seed} ratio={slot.ratio} label={alt} />;
  }

  return (
    <div className={["frame", className].filter(Boolean).join(" ")} style={frameStyle}>
      {inner}
    </div>
  );
}

// Drawn stand-in: a plaster wall, a row of triangular openings and the triangles of sun they throw.
export function Placeholder({ seed = 0, ratio = 1.5, label }: { seed?: number; ratio?: number; label: string }) {
  const w = 600;
  const h = Math.round(w / ratio);
  const rand = mulberry(seed + 1);
  const count = 3 + Math.floor(rand() * 4);
  const size = w / (count * 2.6);
  const top = h * (0.12 + rand() * 0.18);
  const gap = (w - count * size) / (count + 1);
  const throwX = (rand() - 0.5) * w * 0.5;
  const floor = h * (0.62 + rand() * 0.12);
  const tones = ["#2a3330", "#303a36", "#26302c"];
  const wall = tones[seed % tones.length];

  const openings = Array.from({ length: count }, (_, i) => {
    const x = gap + i * (size + gap);
    return { x, y: top };
  });

  return (
    <svg className="ph" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid slice" role="img" aria-label={label}>
      <rect width={w} height={h} fill="#1b2220" />
      <rect width={w} height={floor} fill={wall} />
      {openings.map((o, i) => (
        <g key={i}>
          <polygon points={`${o.x},${o.y + size} ${o.x + size / 2},${o.y} ${o.x + size},${o.y + size}`} fill="#f0d9a8" />
          <polygon
            points={`${o.x + throwX},${floor + (h - floor) * 0.25 + size * 0.6} ${o.x + size / 2 + throwX * 1.25},${
              floor + (h - floor) * 0.25
            } ${o.x + size + throwX},${floor + (h - floor) * 0.25 + size * 0.6}`}
            fill="#f0d9a8"
            opacity="0.55"
          />
        </g>
      ))}
      <rect x="0" y={floor} width={w} height="3" fill="#141a18" />
    </svg>
  );
}

function mulberry(a: number) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
