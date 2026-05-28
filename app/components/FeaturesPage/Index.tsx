"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const FEATURES = [
  {
    num: "01",
    title: "Dynamic Lumbar Support",
    desc: "Automatically adapts to your spine's natural curve, offering responsive tension adjustment for all-day comfort.",
    tag: "Active Spine Care",
  },
  {
    num: "02",
    title: "Synchronous Recline",
    desc: "A weight-activated mechanism that mirrors your body's movement perfectly, keeping your posture fully balanced.",
    tag: "Pro-level Mechanics",
  },
  {
    num: "03",
    title: "4D Armrests & Breathability",
    desc: "Fully adjustable support coupled with advanced mesh ventilation that prevents heat build-up under pressure.",
    tag: "Hyper-Adaptable Mesh",
  },
];

export default function FeaturesPage() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const mm = gsap.matchMedia();

    // Common header animations
    gsap.fromTo(
      ".features-title",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      }
    );

    gsap.fromTo(
      ".features-desc",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      }
    );

    // Desktop Viewports (>= 768px): Staggered horizontal slide & reveal
    mm.add("(min-width: 768px)", () => {
      gsap.fromTo(
        ".feature-card",
        { opacity: 0, y: 80, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.4,
          stagger: 0.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
          },
        }
      );
    });

    // Mobile Viewports (< 768px): Butter-smooth individual triggers
    mm.add("(max-width: 767px)", () => {
      const cards = gsap.utils.toArray(".feature-card");
      cards.forEach((card: any) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
            },
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full min-h-screen bg-gradient-to-b from-white via-[#16120F] to-[#0C0A09] text-white flex flex-col justify-center py-28 relative overflow-hidden select-none">

      {/* High-End Technical Background Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="h-full w-full bg-[linear-gradient(to_right,#f9731604_1px,transparent_1px),linear-gradient(to_bottom,#f9731604_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      {/* Layered Floating Mesh Glows (Purple and Orange) */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-[130px] pointer-events-none animate-pulse duration-[6000ms]" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] rounded-full bg-orange-500/10 blur-[140px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-8 lg:px-20 relative z-10 w-full flex flex-col justify-between h-full gap-20">

        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-orange-950/20 pb-12">
          <div className="max-w-3xl">
            <h2 className="features-title text-5xl md:text-7xl font-black tracking-tight text-white leading-[1.08]">
              Designed to move <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-white">
                the way you do.
              </span>
            </h2>
          </div>
          <p className="features-desc text-orange-100/60 text-lg lg:text-xl max-w-md leading-relaxed font-light">
            Every junction is engineered to eliminate static physical stress, cradling your natural flow state.
          </p>
        </div>

        {/* Features Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 w-full mt-4">
          {FEATURES.map((feature, idx) => {
            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="feature-card relative group bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 lg:p-10 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-3.5 hover:border-orange-500/40 hover:bg-white/[0.04] overflow-hidden cursor-pointer shadow-[0_30px_100px_rgba(0,0,0,0.4)]"
              >
                {/* Dynamic Glowing Accent behind the card */}
                <div
                  className={`absolute inset-0 bg-gradient-to-tr from-orange-500/10 via-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none`}
                />

                {/* Sliding Reflection Highlight */}
                <div
                  className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms] ease-out pointer-events-none"
                />

                {/* Big Floating Number behind text */}
                <span className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none absolute -right-3 -top-3 group-hover:from-orange-500/15 group-hover:scale-105 transition-all duration-700 select-none">
                  {feature.num}
                </span>

                <div className="flex justify-between items-start mb-16 relative z-10">
                  <span className="text-[10px] font-extrabold tracking-widest px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-orange-200/90 group-hover:text-orange-300 group-hover:border-orange-500/30 transition-all duration-500">
                    {feature.tag}
                  </span>
                </div>

                <div className="relative z-10">
                  <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-white group-hover:text-orange-200 transition-colors duration-500">
                    {feature.title}
                  </h3>

                  <p className="text-orange-100/50 leading-relaxed group-hover:text-zinc-200 transition-colors duration-500 text-sm lg:text-base font-light">
                    {feature.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
