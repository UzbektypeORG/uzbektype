"use client";

import { useState, useEffect, useRef } from "react";

// Swaps between two labels every 6s. The wrapper's width is measured from the
// currently-shown label and animated, so the button smoothly grows/shrinks to
// fit the text instead of staying a fixed size. The two labels crossfade.
export default function AnimatedSupportLabel({
  support,
  donate,
}: {
  support: string;
  donate: string;
}) {
  const [showDonate, setShowDonate] = useState(false);
  const supportRef = useRef<HTMLSpanElement>(null);
  const donateRef = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState<number>();

  useEffect(() => {
    const id = setInterval(() => setShowDonate((v) => !v), 6000);
    return () => clearInterval(id);
  }, []);

  // Re-measure whenever the shown label (or its text) changes.
  useEffect(() => {
    const el = showDonate ? donateRef.current : supportRef.current;
    if (el) setWidth(el.offsetWidth);
  }, [showDonate, support, donate]);

  return (
    <span
      className="relative inline-block overflow-hidden align-middle leading-none"
      style={{ width, transition: "width 400ms ease" }}
    >
      {/* Hidden measurers — never affect layout, just report natural widths. */}
      <span ref={supportRef} className="invisible absolute left-0 top-0 whitespace-nowrap pointer-events-none">
        {support}
      </span>
      <span ref={donateRef} className="invisible absolute left-0 top-0 whitespace-nowrap pointer-events-none">
        {donate}
      </span>

      {/* Visible crossfading labels. First one is in-flow (gives height). */}
      <span
        aria-hidden={showDonate}
        className="block whitespace-nowrap transition-opacity duration-500 ease-in-out"
        style={{ opacity: showDonate ? 0 : 1 }}
      >
        {support}
      </span>
      <span
        aria-hidden={!showDonate}
        className="absolute left-0 top-0 whitespace-nowrap transition-opacity duration-500 ease-in-out"
        style={{ opacity: showDonate ? 1 : 0 }}
      >
        {donate}
      </span>
    </span>
  );
}
