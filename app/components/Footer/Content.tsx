import React from "react";

export default function Content() {
  return (
    <div className="bg-[#0C0A09] w-full h-auto min-h-full md:h-full text-white px-6 md:px-24 py-16 md:py-24 flex flex-col justify-between relative overflow-hidden font-sans select-none border-t border-orange-950/30 shadow-[inset_0_10px_50px_rgba(0,0,0,0.35)]">
      
      {/* Background visual detail - warm glowing amber and deep copper flares */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 items-start w-full relative z-10">
        
        {/* Column 1: Want to ask something? */}
        <div className="flex flex-col gap-6">
          <span className="text-[13px] font-extrabold tracking-[0.2em] text-orange-300 uppercase">
            WANT TO ASK SOMETHING?
          </span>
          <div className="flex flex-col gap-3">
            <a 
              href="mailto:hello@ergofit.design" 
              className="text-white hover:text-orange-400 text-2xl lg:text-3xl font-medium tracking-tight transition-colors duration-300"
            >
              hello@ergofit.design
            </a>
            <a 
              href="tel:+15554890128" 
              className="text-zinc-300 hover:text-white text-xl lg:text-2xl font-light tracking-tight transition-colors duration-300"
            >
              +1 (555) 489-0128
            </a>
          </div>
        </div>

        {/* Column 2: Want to visit us? */}
        <div className="flex flex-col gap-6">
          <span className="text-[13px] font-extrabold tracking-[0.2em] text-orange-300 uppercase">
            WANT TO VISIT US?
          </span>
          <div className="flex flex-col gap-1.5 text-base lg:text-lg text-zinc-200 font-normal leading-relaxed">
            <p>1044 Innovation Blvd, Suite 200</p>
            <p>Silicon Valley, CA 94025</p>
            <p>United States</p>
          </div>
        </div>

        {/* Column 3: Stay in the loop */}
        <div className="flex flex-col gap-6 md:items-end">
          <div className="flex flex-col gap-6 w-fit">
            <span className="text-[13px] font-extrabold tracking-[0.2em] text-orange-300 uppercase md:text-right">
              STAY IN THE LOOP
            </span>
            <div className="grid grid-cols-5 gap-3.5">
              {/* Web */}
              <a href="#" className="w-12 h-12 rounded-full bg-orange-950/10 border border-orange-900/20 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-orange-900/30 hover:border-orange-500/50 transition-all duration-300 active:scale-95">
                <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </a>
              {/* Behance */}
              <a href="#" className="w-12 h-12 rounded-full bg-orange-950/10 border border-orange-900/20 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-orange-900/30 hover:border-orange-500/50 transition-all duration-300 active:scale-95 font-bold text-base tracking-tight">
                Bē
              </a>
              {/* Instagram */}
              <a href="#" className="w-12 h-12 rounded-full bg-orange-950/10 border border-orange-900/20 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-orange-900/30 hover:border-orange-500/50 transition-all duration-300 active:scale-95">
                <svg className="w-5.5 h-5.5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.01 3.71.054 1.14.051 1.96.23 2.673.514a4.616 4.616 0 001.667 1.085 4.616 4.616 0 001.085 1.667c.284.71.463 1.53.514 2.673.044.926.054 1.28.054 3.71 0 2.43-.01 2.78-.054 3.71-.051 1.14-.23 1.96-.514 2.67a4.616 4.616 0 01-1.085 1.67 4.616 4.616 0 01-1.667 1.085c-.71.284-1.53.463-2.67.514-.928.044-1.28.054-3.71.054-2.43 0-2.78-.01-3.71-.054-1.14-.051-1.96-.23-2.67-.514a4.616 4.616 0 01-1.67-1.085 4.616 4.616 0 01-1.085-1.67c-.284-.71-.463-1.53-.514-2.67C2.01 14.82 2 14.468 2 12.035c0-2.43.01-2.78.054-3.71.051-1.14.23-1.96.514-2.67a4.616 4.616 0 011.085-1.67 4.616 4.616 0 011.67-1.085c.715-.284 1.533-.463 2.673-.514C9.25 2.01 9.604 2 12.035 2h.28zm0 2.43h-.28c-2.4 0-2.736.01-3.682.054-.86.039-1.326.182-1.636.303-.412.16-.706.352-.998.644-.29.29-.485.584-.645.998-.12.31-.264.777-.303 1.636-.044.945-.054 1.28-.054 3.682v.28c0 2.4.01 2.736.054 3.682.039.86.182 1.326.303 1.636.16.412.352.706.644.998.29.29.584.485.998.645.31.12.777.264 1.636.303.945.044 1.28.054 3.682.054h.28c2.4 0 2.736-.01 3.682-.054.86-.039 1.326-.182 1.636-.303.412-.16.706-.352.998-.644.29-.29.485-.584.645-.998.12-.31.264-.777.303-1.636.044-.945.054-1.28.054-3.682v-.28c0-2.4-.01-2.736-.054-3.682-.039-.86-.182-1.326-.303-1.636-.16-.412-.352-.706-.644-.998a2.41 2.41 0 00-.998-.645c-.31-.12-.777-.264-1.636-.303-.945-.044-1.28-.054-3.682-.054zm0 2.62a4.98 4.98 0 100 9.96 4.98 4.98 0 000-9.96zm0 2.43a2.55 2.55 0 110 5.1 2.55 2.55 0 010-5.1zm5.228-3.65a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="w-12 h-12 rounded-full bg-orange-950/10 border border-orange-900/20 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-orange-900/30 hover:border-orange-500/50 transition-all duration-300 active:scale-95">
                <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
              {/* X */}
              <a href="#" className="w-12 h-12 rounded-full bg-orange-950/10 border border-orange-900/20 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-orange-900/30 hover:border-orange-500/50 transition-all duration-300 active:scale-95">
                <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row items-center justify-between border-t border-blue-900/30 pt-10 gap-6 mt-16 text-zinc-400 font-normal text-[13px] lg:text-[15px]">
        
        {/* Policies and Codes */}
        <div className="flex items-center gap-3 lg:gap-4 flex-wrap text-zinc-400 font-medium justify-center md:justify-start">
          <span className="hover:text-white cursor-pointer transition-colors">Privacy policy</span>
          <span className="text-blue-900/60">|</span>
          <span className="hover:text-white cursor-pointer transition-colors">Cookies</span>
          <span className="text-blue-900/60">|</span>
          <span>ICO: 82940182</span>
          <span className="text-blue-900/60">|</span>
          <span>DIC: US82940182</span>
        </div>

      </div>
    </div>
  );
}
