"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const CHAIR_IMAGES = [
  "/Png/Chair6a_Amica Black .png",
  "/Png/Chair6b_Gladus Grey.png",
  "/Png/Chair7_Delton.png",
  "/Png/chair10_FitWell.png",
  "/Png/chair11_octave.png",
  "/Png/chair12_ErgoFit.png",
  "/Png/chair13_Avien.png",
  "/Png/chair4_ACE.png",
  "/Png/chair5_AIRSENSE.png",
  "/Png/chair6_AlphaGrey.png",
  "/Png/chair6c_Rapid Black .png",
  "/Png/chair8_ERIZO.png",
  "/Png/chair9_FitWell.png",
  "/Png/img1 (1).png",
];

type Ring = "outer" | "mid";

interface ChairItem {
  src: string;
  angle: number;
  scaleFactor: number;
  rxJitter: number;
  ryJitter: number;
  spinSpeed: number;
  ring: Ring;
}

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

function buildChairs(): ChairItem[] {
  const rand = seededRandom(42);
  const items: ChairItem[] = [];

  // Reduced counts so they are spacious and do not crowd
  const rings: { ring: Ring; count: number }[] = [
    { ring: "outer", count: 8 },
    { ring: "mid", count: 6 },
  ];

  let imgIdx = 0;
  for (const { ring, count } of rings) {
    for (let i = 0; i < count; i++) {
      items.push({
        src: CHAIR_IMAGES[imgIdx % CHAIR_IMAGES.length],
        angle: (360 / count) * i, // Perfectly spaced angles
        scaleFactor: 0.75 + (i % 2 === 0 ? 0.1 : 0), // Small controlled scaling
        rxJitter: 0, // No jitter to prevent drift
        ryJitter: 0,
        spinSpeed: 1, // Uniform speed ensures they never drift into each other
        ring,
      });
      imgIdx++;
    }
  }

  return items;
}

// Both rings pushed to the periphery — clear center
const RING_CONFIG: Record<Ring, { rx: number; ry: number; size: number }> = {
  outer: { rx: 48, ry: 40, size: 130 },
  mid: { rx: 32, ry: 26, size: 100 },
};

const RING_DIRECTION: Record<Ring, number> = {
  outer: 1,
  mid: -0.7,
};

interface CircularChairsProps {
  onStart: () => void;
}

export default function CircularChairs({ onStart }: CircularChairsProps) {
  const chairs = useRef<ChairItem[]>(buildChairs());
  const [rotation, setRotation] = useState(0);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    lastTimeRef.current = 0;
    const animate = (ts: number) => {
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = ts;
        rafRef.current = requestAnimationFrame(animate);
        return;
      }
      const delta = ts - lastTimeRef.current;
      lastTimeRef.current = ts;
      setRotation((prev) => (prev + delta * 0.003) % 360);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white flex items-center justify-center">
      {/* ── Orbit layer ── */}
      <div className="absolute inset-0 pointer-events-none">
        {chairs.current.map((chair, idx) => {
          const cfg = RING_CONFIG[chair.ring];
          const dir = RING_DIRECTION[chair.ring];
          const deg =
            (chair.angle + rotation * chair.spinSpeed * dir + 3600) % 360;
          const rad = (deg * Math.PI) / 180;

          const rx = cfg.rx + chair.rxJitter;
          const ry = cfg.ry + chair.ryJitter;

          const x = 50 + rx * Math.cos(rad);
          const y = 50 + ry * Math.sin(rad);

          // Subtle depth — keep all chairs visible, just a slight size difference
          const depth = (Math.sin(rad) + 1) / 2;
          const scale = (0.85 + depth * 0.25) * chair.scaleFactor;
          const opacity = 0.75 + depth * 0.25;
          const zIndex = Math.round(depth * 100);

          return (
            <div
              key={idx}
              className="absolute will-change-transform"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: `translate(-50%, -50%) scale(${scale})`,
                opacity,
                zIndex,
              }}
            >
              <Image
                src={chair.src}
                alt={`Chair ${idx + 1}`}
                width={cfg.size}
                height={cfg.size}
                className="object-contain pointer-events-none select-none drop-shadow-[0_6px_16px_rgba(0,0,0,0.08)]"
                style={{ width: `min(22vw, ${cfg.size}px)`, height: `min(22vw, ${cfg.size}px)` }}
                priority={idx < 10}
              />
            </div>
          );
        })}
      </div>

      {/* ── Hero content ── */}
      <div className="relative z-[200] flex flex-col items-center gap-7 text-center pointer-events-none px-4">
        <h1 className="text-[clamp(2.2rem,5vw,4rem)] font-light tracking-tight leading-[1.15] text-[#111] m-0">
          Welcome to the
          <br />
          Office Chairs
        </h1>
        <div className="pointer-events-auto flex items-center justify-center">
          <button
            onClick={onStart}
            className="group relative inline-flex items-center justify-center gap-3 px-9 py-4 text-lg font-bold text-white transition-all duration-200 rounded-[18px] w-[220px] bg-gradient-to-b from-zinc-700 to-zinc-900 shadow-[inset_0px_-2px_0px_rgba(255,255,255,0.15),0px_8px_20px_rgba(0,0,0,0.3)] hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[inset_0px_-2px_0px_rgba(255,255,255,0.2),0px_12px_24px_rgba(0,0,0,0.4)] active:translate-y-[2px] active:shadow-[inset_0px_2px_4px_rgba(0,0,0,0.4),0px_2px_8px_rgba(0,0,0,0.2)]"
          >
            <span className="relative z-10 tracking-wide drop-shadow-md transition-all duration-300">
              Join Today
            </span>
            <svg
              className="relative z-10 w-5 h-5 transition-transform duration-300 drop-shadow-md group-hover:translate-x-1.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
