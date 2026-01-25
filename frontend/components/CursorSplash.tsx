"use client";

import { useEffect, useState } from "react";

interface Ripple {
  x: number;
  y: number;
  id: number;
}

export default function CursorSplash() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    let idCounter = 0;

    const handleClick = (e: MouseEvent) => {
      const newRipple: Ripple = {
        x: e.clientX,
        y: e.clientY,
        id: idCounter++,
      };

      setRipples((prev) => [...prev, newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute rounded-full border-2"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: "10px",
            height: "10px",
            transform: "translate(-50%, -50%)",
            animation: "ripple-splash 0.6s ease-out forwards",
            borderColor: "currentColor",
            opacity: 0.15,
          }}
        />
      ))}
    </div>
  );
}
