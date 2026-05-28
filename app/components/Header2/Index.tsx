"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { expandedImg } from "@/public/assets";

interface Hotspot {
  id: string;
  title: string;
  desc: string;
  specs: string[];
  style: React.CSSProperties;
  cardPosition: "top" | "bottom" | "left" | "right";
}

const HOTSPOTS: Hotspot[] = [
  {
    id: "backrest",
    title: "Tensile Mesh Backrest",
    desc: "Hyper-breathable, dual-weave elastomeric mesh imported from Germany. Dynamically conforms to your thoracic spine while keeping you cool.",
    specs: ["German Elastomer", "High Tensile Strength", "Zero Heat Retention"],
    style: { left: "18.5%", top: "35%" },
    cardPosition: "right",
  },
  {
    id: "seat",
    title: "Dual-Density Cushion",
    desc: "Contoured high-resilience foam base with waterfall edge design to improve blood circulation and reduce pressure behind the knees.",
    specs: ["High-Resilience Foam", "Waterfall Edge", "Ischial Pressure Relief"],
    style: { left: "55.5%", top: "36%" },
    cardPosition: "top",
  },
  {
    id: "base",
    title: "Die-Cast Star Base",
    desc: "Aviation-grade reinforced aluminum alloy base. Heavy-duty construction rated to support up to 350 lbs with whisper-quiet, non-scuffing PU casters.",
    specs: ["Aviation-Grade Alloy", "350 lbs Capacity", "Floor-Safe PU Casters"],
    style: { left: "79%", top: "54%" },
    cardPosition: "left",
  },
];

const Header2 = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          let start = 0;
          const end = 50000;
          const duration = 2000; // 2 seconds
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out quad
            const easeProgress = progress * (2 - progress);
            const currentCount = Math.floor(easeProgress * end);

            if (countRef.current) {
              countRef.current.innerText = currentCount.toLocaleString();
            }

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              if (countRef.current) {
                countRef.current.innerText = end.toLocaleString();
              }
            }
          };

          requestAnimationFrame(animate);
          observer.disconnect(); // Trigger once
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="anatomy" ref={containerRef} className="w-full min-h-screen bg-[#F5F5F7] overflow-hidden relative flex items-center pt-32 pb-24 border-t border-zinc-200 border-b border-zinc-200">
      {/* Premium Minimalist Background Grid & Ambient Glows */}
      <div className="absolute inset-0 opacity-40">
        <div className="h-full w-full bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-orange-500/5 blur-[150px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 lg:px-20 w-full relative z-10">
        {/* Top Content */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 border-b border-zinc-200 pb-12">
          {/* Left Tag */}
          <div>
            <div className="border border-zinc-300 bg-white/80 rounded-full px-5 py-2 text-zinc-700 flex items-center gap-2.5 w-fit mb-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              <p className="text-sm font-semibold tracking-wide uppercase">
                What we manufacture
              </p>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-black tracking-tight leading-tight mt-2">
              Anatomy of <br />
              Ultimate Ergonomics.
            </h2>
          </div>

          {/* Right Text / Countup stat */}
          <div className="max-w-[460px]">
            <h1 className="text-black text-6xl lg:text-8xl font-black leading-none tracking-tight">
              <span ref={countRef}>0</span><span className="text-orange-500 font-bold">+</span>
            </h1>
            <p className="text-zinc-500 text-sm lg:text-base mt-4 leading-relaxed font-normal">
              Precision-built ergonomic office chairs delivered to leading teams across industries and continents.
            </p>
          </div>
        </div>

        {/* Exploded Chair Section */}
        <div className="relative w-full flex flex-col items-center mt-6 bg-white/40 rounded-[32px] border border-zinc-200/80 p-5 lg:p-12 overflow-visible shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
          {/* Chair Image Wrapper */}
          <div className="relative w-full max-w-[1450px]">
            <Image
              src={expandedImg}
              alt="Exploded Chair"
              className={`w-full h-auto object-contain select-none transition-all duration-700 -mb-[12%] md:-mb-[16%] ${
                activeId ? "opacity-30 brightness-95 scale-[1.01]" : "opacity-100"
              }`}
              priority
            />

            {/* Hotspots - Desktop Only */}
            <div className="hidden md:block">
              {HOTSPOTS.map((hotspot) => {
                const isActive = activeId === hotspot.id;

                return (
                  <div
                    key={hotspot.id}
                    className="absolute z-30 group"
                    style={hotspot.style}
                    onMouseEnter={() => setActiveId(hotspot.id)}
                    onMouseLeave={() => setActiveId(null)}
                  >
                    {/* Pulsing Hotspot Trigger */}
                    <div className="relative cursor-pointer flex items-center justify-center w-8 h-8">
                      <div className={`absolute w-6 h-6 bg-orange-500/30 rounded-full animate-ping pointer-events-none transition-transform duration-300 ${
                        isActive ? "scale-150" : ""
                      }`} />
                      <div className={`absolute w-4 h-4 rounded-full pointer-events-none transition-all duration-300 ${
                        isActive ? "bg-orange-500 scale-125 shadow-[0_0_12px_#f97316]" : "bg-orange-500/60"
                      }`} />
                      <div className="w-2.5 h-2.5 bg-orange-500 rounded-full ring-4 ring-white transition-all duration-300 group-hover:scale-125" />
                    </div>

                    {/* Connecting Line Indicator */}
                    <div
                      className={`absolute pointer-events-none transition-all duration-500 border-t border-dashed border-orange-500/50 ${
                        isActive ? "w-16 opacity-100" : "w-0 opacity-0"
                      }`}
                      style={{
                        left: hotspot.cardPosition === "right" ? "100%" : "auto",
                        right: hotspot.cardPosition === "left" ? "100%" : "auto",
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    />

                    {/* Floating Glassmorphic Spec Card */}
                    <div
                      className={`absolute w-[320px] bg-white/95 backdrop-blur-xl border border-zinc-200 rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500 ease-out z-40 pointer-events-none ${
                        isActive
                          ? "opacity-100 translate-y-0 scale-100 visible"
                          : "opacity-0 scale-95 invisible"
                      }`}
                      style={{
                        top: hotspot.cardPosition === "top" ? "auto" : "50%",
                        bottom: hotspot.cardPosition === "top" ? "140%" : "auto",
                        left:
                          hotspot.cardPosition === "right"
                            ? "calc(100% + 24px)"
                            : hotspot.cardPosition === "top"
                            ? "50%"
                            : "auto",
                        right:
                          hotspot.cardPosition === "left"
                            ? "calc(100% + 24px)"
                            : "auto",
                        transform:
                          hotspot.cardPosition === "top"
                            ? "translateX(-50%)"
                            : "translateY(-50%)",
                      }}
                    >
                      <span className="text-[10px] tracking-widest font-bold uppercase text-orange-500">
                        Technical Spec
                      </span>
                      <h4 className="text-black text-lg font-bold mt-1 mb-2">
                        {hotspot.title}
                      </h4>
                      <p className="text-zinc-600 text-xs leading-relaxed mb-4 font-light">
                        {hotspot.desc}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-100">
                        {hotspot.specs.map((spec, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[9px] font-bold bg-zinc-50 border border-zinc-200 text-zinc-700 px-2 py-0.5 rounded-md"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile specs list layout (Clean accordion / List display to prevent overlap and clipping) */}
          <div className="mt-8 flex flex-col gap-4 md:hidden w-full z-30">
            {HOTSPOTS.map((hotspot) => (
              <div 
                key={hotspot.id} 
                className="bg-white/80 backdrop-blur-md border border-zinc-200 rounded-2xl p-5 shadow-[0_10px_30px_rgba(0,0,0,0.02)]"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                  <h4 className="text-black text-base font-bold">
                    {hotspot.title}
                  </h4>
                </div>
                <p className="text-zinc-600 text-sm leading-relaxed mb-4 font-light">
                  {hotspot.desc}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-100">
                  {hotspot.specs.map((spec, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[10px] font-bold bg-zinc-50 border border-zinc-200 text-zinc-700 px-2.5 py-0.5 rounded-md"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header2;