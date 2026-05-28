"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "home", href: "#" },
  { label: "features", href: "#features" },
  { label: "anatomy", href: "#anatomy" },
  { label: "chair finder", href: "#finder" },
  { label: "contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Desktop Floating Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[999] w-fit pointer-events-auto hidden md:block">
        <div 
          className={`flex items-center gap-10 lg:gap-14 px-12 lg:px-16 py-4 rounded-full border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            scrolled 
              ? "bg-[#0E0C0A]/90 backdrop-blur-xl border-orange-950/20 shadow-[0_12px_40px_rgba(0,0,0,0.4)]" 
              : "bg-white backdrop-blur-xl border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
          }`}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-[13px] font-medium tracking-wider lowercase transition-all duration-300 ${
                scrolled 
                  ? "text-zinc-300 hover:text-orange-400" 
                  : "text-zinc-700 hover:text-black"
              }`}
            >
              {link.label}
            </a>
          ))}
          
          <span 
            className={`text-[13px] font-medium lowercase border-l pl-8 transition-all duration-300 cursor-pointer ${
              scrolled 
                ? "text-orange-400/80 border-orange-950/30 hover:text-orange-400" 
                : "text-zinc-400 border-zinc-200 hover:text-black"
            }`}
          >
            en
          </span>
        </div>
      </nav>

      {/* Mobile Compact Floating Navbar */}
      <nav className="fixed top-5 left-4 right-4 z-[999] md:hidden flex justify-between items-center px-6 py-3.5 rounded-full border border-zinc-200/50 bg-white/95 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
        <a href="#" className="text-sm font-bold tracking-widest uppercase text-zinc-950">
          ergofit
        </a>

        <button 
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-950 text-white text-xs font-semibold uppercase tracking-wider active:scale-95 transition-transform"
        >
          <span>menu</span>
          <div className="flex flex-col gap-1 w-3.5">
            <span className="w-full h-[1.5px] bg-white rounded-full" />
            <span className="w-full h-[1.5px] bg-white rounded-full" />
          </div>
        </button>
      </nav>

      {/* Mobile Full-Screen Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-8 text-white md:hidden"
          >
            {/* Header / Top Row */}
            <div className="flex justify-between items-center w-full">
              <span className="text-sm font-bold tracking-widest uppercase text-white/60">
                ergofit
              </span>
              <button 
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors active:scale-90"
              >
                <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col gap-8 my-auto">
              {NAV_LINKS.map((link, idx) => (
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-4xl font-light tracking-tight hover:text-orange-400 transition-colors lowercase"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            {/* Footer Row / Language Selector */}
            <div className="flex justify-between items-center border-t border-white/10 pt-6">
              <span className="text-xs text-white/40">© 2026 ergofit design</span>
              <span className="text-sm font-bold tracking-wider text-orange-400 border border-orange-500/30 px-3.5 py-1 rounded-full">
                en
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}