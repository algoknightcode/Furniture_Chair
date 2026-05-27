"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";

const ALL_CHAIRS = [
  { src: "/Png/chair12_ErgoFit.png", name: "ErgoFit Premium", price: 1299 },
  { src: "/Png/Chair7_Delton.png", name: "Delton Pro", price: 1099 },
  { src: "/Png/img1 (1).png", name: "Classic Comfort", price: 899 },
  { src: "/Png/chair4_ACE.png", name: "ACE Task", price: 799 },
  { src: "/Png/chair5_AIRSENSE.png", name: "AirSense", price: 749 },
  { src: "/Png/chair6_AlphaGrey.png", name: "Alpha Grey", price: 699 },
  { src: "/Png/Chair6a_Amica Black .png", name: "Amica Black", price: 649 },
  { src: "/Png/Chair6b_Gladus Grey.png", name: "Gladus Grey", price: 599 },
  { src: "/Png/chair6c_Rapid Black .png", name: "Rapid Black", price: 549 },
  { src: "/Png/chair8_ERIZO.png", name: "Erizo Mesh", price: 499 },
  { src: "/Png/chair9_FitWell.png", name: "FitWell Basic", price: 399 },
  { src: "/Png/chair10_FitWell.png", name: "FitWell Pro", price: 449 },
  { src: "/Png/chair11_octave.png", name: "Octave Studio", price: 299 },
].sort((a, b) => b.price - a.price);

function getPosition(index: number, total: number, isMobile: boolean) {
  if (total === 1) return { left: "50%", top: "45%", scale: 1.1, zIndex: 100 };
  if (total === 2) {
    return {
      left: index === 0 ? "35%" : "65%",
      top: "45%",
      scale: 0.9,
      zIndex: 100 - index,
    };
  }
  if (total === 3) {
    if (index === 0) return { left: "50%", top: "60%", scale: 0.95, zIndex: 100 };
    if (index === 1) return { left: "25%", top: "35%", scale: 0.8, zIndex: 90 };
    if (index === 2) return { left: "75%", top: "35%", scale: 0.8, zIndex: 90 };
  }

  // For total > 3, distribute in a centered grid
  const columns = isMobile ? 2 : 5;
  const rows = Math.ceil(total / columns);
  const row = Math.floor(index / columns);
  const col = index % columns;
  const itemsInRow = Math.min(columns, total - row * columns);
  const colOffset = (columns - itemsInRow) / 2;

  const spread = isMobile ? 50 : 85;
  const startLeft = isMobile ? 25 : 7.5;
  const left = columns === 1 ? 50 : ((col + colOffset) / (columns - 1)) * spread + startLeft;
  
  const topRange = isMobile ? 90 : 55;
  const topStart = isMobile ? 6 : 15;
  const top = rows === 1 ? 40 : (row / (rows - 1)) * topRange + topStart;
  
  const baseScale = isMobile ? 0.55 : 0.45;

  return { left: `${left}%`, top: `${top}%`, scale: baseScale, zIndex: 50 - index };
}

interface ChairFinderProps {
  onBack: () => void;
}

export default function ChairFinder({ onBack }: ChairFinderProps) {
  const [sliderValue, setSliderValue] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // sliderValue 0 -> 13 chairs. sliderValue 100 -> 1 chair.
  const visibleCount = Math.max(1, Math.ceil(ALL_CHAIRS.length * (1 - sliderValue / 100)));

  const getTimeLabel = useCallback(() => {
    if (sliderValue < 34) return "QUICK SESSION";
    if (sliderValue < 67) return "HALF DAY";
    return "ALL DAY";
  }, [sliderValue]);

  return (
    <div className="relative w-full h-screen bg-[#f5f5f5] flex flex-col overflow-hidden pt-[10px] px-[10px]">

      {/* ── Main dynamic chairs area ── */}
      <div className="flex-1 relative overflow-y-auto overflow-x-hidden">
        <div 
          className="relative w-full max-w-[1200px] mx-auto transition-all duration-700"
          style={{ minHeight: isMobile && visibleCount > 3 ? `${Math.ceil(visibleCount / 2) * 250}px` : '100%' }}
        >
          {ALL_CHAIRS.map((chair, index) => {
            const isVisible = index < visibleCount;
            const pos = getPosition(index, Math.max(1, visibleCount), isMobile);

            return (
              <div
                key={chair.name}
                className="absolute transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{
                  left: pos.left,
                  top: pos.top,
                  transform: `translate(-50%, -50%) scale(${isVisible ? pos.scale : 0.2})`,
                  opacity: isVisible ? 1 : 0,
                  zIndex: pos.zIndex,
                  pointerEvents: isVisible ? "auto" : "none",
                }}
              >
                <div className="transform origin-center transition-transform duration-300">
                  <div className="w-[320px] h-[400px] flex flex-col items-center justify-center gap-3">
                    <Image
                      src={chair.src}
                      alt={chair.name}
                      width={320}
                      height={400}
                      className="object-contain max-w-full max-h-[85%] drop-shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:scale-110 hover:-translate-y-3 cursor-pointer"
                      priority={index < 5}
                    />
                    {isVisible && (
                      <div className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-semibold text-[#111] shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-black/5 transition-opacity duration-500">
                        ${chair.price}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Bottom slider card ── */}
      <div className="w-full flex justify-center pb-4 px-4 relative z-50">
        <div className="w-full max-w-[460px] bg-white/90 backdrop-blur-xl rounded-xl shadow-[0_2px_24px_rgba(0,0,0,0.07)] px-6 py-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={onBack}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-50 active:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600 cursor-pointer"
              aria-label="Go back"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-[15px] font-medium text-[#1a1a1a] tracking-[-0.01em]">
                Sitting time
              </span>
              <span className="w-[18px] h-[18px] rounded-full border border-gray-300 flex items-center justify-center text-[9px] text-gray-400 cursor-help font-medium">
                i
              </span>
            </div>

            <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-50 active:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600 cursor-pointer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Custom slider */}
          <div className="relative w-full h-7 flex items-center mb-0.5">
            <div className="absolute left-0 right-0 h-[3px] bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-[width] duration-150 ease-out"
                style={{
                  width: `${sliderValue}%`,
                  background: "linear-gradient(90deg, #fca5a5 0%, #ef4444 100%)",
                }}
              />
            </div>

            {/* Thumb glow */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full pointer-events-none transition-[left] duration-150 ease-out"
              style={{
                left: `calc(${sliderValue}% - 16px)`,
                background: "radial-gradient(circle, rgba(239,68,68,0.2) 0%, transparent 70%)",
                filter: "blur(4px)",
              }}
            />

            {/* Thumb */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#ef4444] shadow-[0_1px_8px_rgba(239,68,68,0.4)] pointer-events-none transition-[left] duration-150 ease-out ring-[2.5px] ring-white"
              style={{ left: `calc(${sliderValue}% - 10px)` }}
            />

            {/* Native range */}
            <input
              type="range"
              min={0}
              max={100}
              value={sliderValue}
              onChange={(e) => setSliderValue(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              aria-label="Sitting time"
            />
          </div>

          {/* Labels */}
          <div className="flex justify-between text-[11px] text-gray-400 font-medium tracking-wider mb-2">
            <span>2H</span>
            <span>8H</span>
          </div>

          <div className="w-full h-px bg-gray-100 mb-2" />

          <p className="text-center text-[12px] tracking-[0.15em] uppercase text-gray-400 font-medium m-0">
            {getTimeLabel()}
          </p>
        </div>
      </div>
    </div>
  );
}
