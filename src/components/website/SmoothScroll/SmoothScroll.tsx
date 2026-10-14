"use client";

import type { LenisOptions } from "lenis";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

// Soft, Apple-like glide for mouse-wheel and trackpad scrolling. Phones and tablets keep their native touch
// scrolling, and visitors who prefer reduced motion get normal scrolling (Lenis honours that by default).
const options: LenisOptions = {
  autoRaf: true,
  lerp: 0.08, // lower = longer, softer glide after each wheel movement
  wheelMultiplier: 0.9, // slightly less distance per wheel notch
  anchors: true, // smooth in-page links, honouring each section's scroll-margin-top
  allowNestedScroll: true, // scrollable boxes inside the page keep their own scrolling
  stopInertiaOnNavigate: true, // clicking a link ends the glide so the new page starts at the top
  // Keep the page still while the opening logo splash is playing.
  prevent: () => document.documentElement.dataset.brandIntro === "play",
};

export default function SmoothScroll() {
  return <ReactLenis root options={options} />;
}
