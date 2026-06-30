"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import type { Banner } from "@/lib/banners";

// Banner artwork is 1500 × 366 (≈4.1:1). Keep new banners at this size.
const BANNER_WIDTH = 1500;
const BANNER_HEIGHT = 366;
const ROTATE_INTERVAL_MS = 5000;

interface BannerCarouselProps {
  banners: Banner[];
}

export default function BannerCarousel({ banners }: BannerCarouselProps) {
  const [index, setIndex] = useState(0);
  const count = banners.length;

  const goTo = useCallback(
    (i: number) => {
      if (count === 0) return;
      setIndex((i + count) % count);
    },
    [count]
  );

  useEffect(() => {
    if (count <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [count]);

  if (count === 0) {
    return (
      <div className="w-full bg-[var(--color-electric)] py-6 text-center">
        <p className="text-white text-lg font-medium">Banner Ad Section</p>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden bg-[var(--color-electric)]">
      {/* Sliding track */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {banners.map((banner, i) => (
          <div key={banner.src} className="w-full flex-shrink-0">
            <Image
              src={banner.src}
              alt={banner.alt}
              width={BANNER_WIDTH}
              height={BANNER_HEIGHT}
              className="w-full h-auto"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {/* Dots */}
      {count > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((banner, i) => (
            <button
              key={banner.src}
              onClick={() => goTo(i)}
              aria-label={`Show banner ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
