"use client";

import React from "react";
import Content from "./Content";

export default function Footer() {
  return (
    <>
      {/* Desktop Reveal Footer */}
      <div
        className="hidden md:block relative h-[480px] bg-transparent"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <div className="fixed bottom-0 h-[480px] w-full z-0">
          <Content />
        </div>
      </div>

      {/* Mobile Standard Flow Footer (prevents clipping) */}
      <div className="block md:hidden w-full bg-[#0C0A09] relative z-20">
        <Content />
      </div>
    </>
  );
}
