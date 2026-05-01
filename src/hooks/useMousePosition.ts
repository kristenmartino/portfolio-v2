"use client";

import { useEffect, useState, type RefObject } from "react";

export type NormalizedMouse = {
  x: number; // -1 ... 1 relative to element center
  y: number; // -1 ... 1 relative to element center
  inside: boolean;
};

export function useMousePosition(ref: RefObject<HTMLElement | null>): NormalizedMouse {
  const [pos, setPos] = useState<NormalizedMouse>({ x: 0, y: 0, inside: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let nextX = 0;
    let nextY = 0;
    let nextInside = false;
    let scheduled = false;

    const flush = () => {
      scheduled = false;
      setPos({ x: nextX, y: nextY, inside: nextInside });
    };

    const onMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      nextX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      nextY = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      nextInside = true;
      if (!scheduled) {
        scheduled = true;
        raf = window.requestAnimationFrame(flush);
      }
    };

    const onLeave = () => {
      nextX = 0;
      nextY = 0;
      nextInside = false;
      if (!scheduled) {
        scheduled = true;
        raf = window.requestAnimationFrame(flush);
      }
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      window.cancelAnimationFrame(raf);
    };
  }, [ref]);

  return pos;
}
