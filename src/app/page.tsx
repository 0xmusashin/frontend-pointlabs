"use client";

import { useState } from "react";
import { Header, Footer, SmoothScroll } from "@/components/layout";
import { Hero, About, Projects } from "@/components/sections";
import { CommandPalette } from "@/components/ui/CommandPalette";

export default function Home() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  return (
    <SmoothScroll>
      <Header onOpenCommandPalette={() => setCommandPaletteOpen(true)} />
      <CommandPalette
        open={commandPaletteOpen}
        onOpenChange={setCommandPaletteOpen}
      />
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
