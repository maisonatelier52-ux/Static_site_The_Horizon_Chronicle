"use client";

import Link from "next/link";
import { useMemo } from "react";
import { FaCircle } from "react-icons/fa";
import { articles } from "@/lib/content";
import { slugify } from "@/lib/site";

const SPEED_PX_PER_SEC = 55; // roughly constant scroll speed regardless of headline count

export default function NewsTicker() {
  const headlines = useMemo(() => articles.slice(0, 5), []);

  // Duplicate the list once so the track can loop seamlessly from -50% back to 0.
  const loopItems = [...headlines, ...headlines];

  // Rough duration estimate so the perceived speed stays similar no matter
  // how long the headlines are; refined visually rather than measured live.
  const estimatedWidth = headlines.reduce((total, article) => total + article.title.length * 8 + 120, 0);
  const duration = Math.max(18, Math.round(estimatedWidth / SPEED_PX_PER_SEC));

  return (
    <div className="bg-brand-green text-[#f7f5ef]">
      <div className="mx-auto flex min-h-[34px] w-[min(calc(100%-26px),1280px)] items-stretch overflow-hidden text-xs sm:w-[min(calc(100%-40px),1280px)]">
        <span className="flex flex-none items-center gap-1.5 whitespace-nowrap bg-[#d9dee9] px-2 py-1 text-[9px] font-extrabold uppercase text-brand-green sm:px-3">
          <FaCircle aria-hidden="true" className="w-[7px] text-brand-red" />
          <span className="hidden sm:inline">Breaking news</span>
        </span>
        <div className="group relative min-w-0 flex-1 overflow-hidden" role="marquee" aria-label="Breaking news headlines">
          <div
            className="flex w-max animate-ticker-scroll items-center gap-14 whitespace-nowrap pl-0.5 will-change-transform group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:[animation-play-state:paused] pt-2"
            style={{ animationDuration: `${duration}s` }}
          >
            {loopItems.map((article, index) => (
              <Link
                key={`${article.id}-${index}`}
                className="inline-flex items-center gap-2 text-inherit hover:underline"
                href={`/${slugify(article.category)}/${article.slug}`}
                aria-hidden={index >= headlines.length ? "true" : undefined}
                tabIndex={index >= headlines.length ? -1 : undefined}
              >
                {article.title}
                <time className="hidden text-[10px] text-[#b9c0cd] sm:inline">{article.timeAgo}</time>
                <span className="text-[#9aaac8]" aria-hidden="true">•</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}