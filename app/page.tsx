"use client";

import { useState, useEffect } from "react";
import Lenis from "lenis";
import CircularChairs from "./components/CircularChairs";
import ChairFinder from "./components/ChairFinder";
import FeaturesPage from "./components/FeaturesPage/Index";
import Header2 from "./components/Header2/Index";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar/Index";
import PreViewComponent from "./components/PreView_Component/page";

export default function Home() {
  const [screen, setScreen] = useState<"landing" | "finder">("landing");

  useEffect(() => {
    if (screen !== "landing") return;

    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [screen]);

  if (screen === "finder") {
    return <ChairFinder onBack={() => setScreen("landing")} />;
  }

  return (
    <main className="w-full bg-zinc-950 flex flex-col relative overflow-x-hidden selection:bg-orange-500 selection:text-black">
      <Navbar />

      {/* Page 1: Circular Chairs Hero */}
      <section className="w-full h-screen relative z-30">
        <CircularChairs onStart={() => setScreen("finder")} />
      </section>

      {/* Page 2: Interactive Hover Modal Seating Gallery */}


      {/* Page 3: Ergonomic Spotlight */}
      <section className="w-full min-h-screen relative z-20">
        <FeaturesPage />
      </section>
      <div className="relative z-30 bg-white">
        <PreViewComponent />
      </div>

      {/* Page 3: Exploded Chair Assembly */}
      <section className="w-full min-h-screen relative z-10">
        <Header2 />
      </section>

      {/* Page 4: Interactive Footer with fixed bottom reveal */}
      <Footer />
    </main>
  );
}


