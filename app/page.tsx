"use client";

import { useState } from "react";
import CircularChairs from "./components/CircularChairs";
import ChairFinder from "./components/ChairFinder";

export default function Home() {
  const [screen, setScreen] = useState<"landing" | "finder">("landing");

  if (screen === "finder") {
    return <ChairFinder onBack={() => setScreen("landing")} />;
  }

  return <CircularChairs onStart={() => setScreen("finder")} />;
}
