"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { articles, getAuthor } from "@/lib/content";
import { slugify } from "@/lib/site";

export default function ReporterCarousel() {
  const stories = useMemo(() => articles.slice(24, 34), []);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % stories.length), 7000);
    return () => window.clearInterval(timer);
  }, [stories.length]);

  const visible = Array.from({ length: 5 }, (_, offset) => stories[(index + offset) % stories.length]);
  const move = (direction) => setIndex((value) => (value + direction + stories.length) % stories.length);

  return (
    <div className="relative">
      <div className="grid grid-cols-2 gap-3.5 pt-3 sm:grid-cols-3 lg:grid-cols-5">
        {visible.map((article, itemIndex) => {
          const author = getAuthor(article.authorSlug);
          return (
            <article
              key={`${article.id}-${itemIndex}`}
              className={`group ${itemIndex >= 2 ? "hidden sm:block" : ""} ${itemIndex >= 3 ? "sm:hidden lg:block" : ""}`}
            >
              <Link className="relative mb-[7px] block aspect-[16/8.5] overflow-hidden" href={`/${slugify(article.category)}/${article.slug}`}>
                <Image
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  src={article.image}
                  alt={article.imageAlt}
                  fill
                  sizes="240px"
                />
              </Link>
              <span className="inline-block font-sans text-[11px] font-bold uppercase tracking-[.075em] text-brand-green-2">{article.category}</span>
              <h3 className="my-1 font-serif text-sm font-semibold leading-[1.1]">
                <Link className="hover:underline" href={`/${slugify(article.category)}/${article.slug}`}>{article.title}</Link>
              </h3>
              <p className="my-[5px] text-[9px] text-muted">
                {author.name} <span className="mx-[3px]">•</span> {article.timeAgo}
              </p>
            </article>
          );
        })}
      </div>
      <div className="absolute right-0 top-[-35px] flex">
        <button
          className="grid h-[27px] w-[27px] cursor-pointer place-items-center border border-line bg-transparent text-[9px] text-brand-green"
          type="button"
          onClick={() => move(-1)}
          aria-label="Previous reports"
        >
          <FaArrowLeft />
        </button>
        <button
          className="grid h-[27px] w-[27px] cursor-pointer place-items-center border border-line bg-transparent text-[9px] text-brand-green"
          type="button"
          onClick={() => move(1)}
          aria-label="Next reports"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}
