"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { Byline, Eyebrow } from "@/components/StoryCard";
import { slugify } from "@/lib/site";

const PAGE_SIZE = 5;

export default function ArticleListPaginated({ articles }) {
  const [page, setPage] = useState(1);
  const topRef = useRef(null);
  const totalPages = Math.max(1, Math.ceil(articles.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const pageArticles = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return articles.slice(start, start + PAGE_SIZE);
  }, [articles, currentPage]);

  const goToPage = (nextPage) => {
    const clamped = Math.min(Math.max(nextPage, 1), totalPages);
    setPage(clamped);
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div ref={topRef}>
      <div>
        {pageArticles.map((article) => (
          <article
            className="grid grid-cols-1 gap-[13px] border-b border-line py-[22px] md:grid-cols-[280px_1fr] md:gap-[25px]"
            key={article.id}
          >
            <Link
              className="relative min-h-[175px] overflow-hidden md:min-h-0"
              href={`/${slugify(article.category)}/${article.slug}`}
            >
              <Image
                src={article.image}
                alt={article.imageAlt}
                fill
                sizes="(max-width: 620px) 100vw, 270px"
                className="object-cover"
              />
            </Link>
            <div>
              <Eyebrow>{article.category}</Eyebrow>
              <h2 className="my-1.5 mb-2 font-serif text-2xl font-bold leading-[1.05] md:text-[28px]">
                <Link className="hover:underline" href={`/${slugify(article.category)}/${article.slug}`}>
                  {article.title}
                </Link>
              </h2>
              <p className="mb-2 text-[13px] text-muted">{article.excerpt}</p>
              <Byline article={article} compact />
            </div>
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <nav className="mt-6 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
          <button
            className="border border-line px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.03em] text-muted transition-colors hover:border-brand-green hover:text-brand-green disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line disabled:hover:text-muted"
            type="button"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ← Prev
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
            <button
              key={number}
              className={`grid h-8 w-8 place-items-center border text-[12px] font-bold transition-colors ${
                number === currentPage
                  ? "border-brand-green bg-brand-green text-white"
                  : "border-line text-muted hover:border-brand-green hover:text-brand-green"
              }`}
              type="button"
              onClick={() => goToPage(number)}
              aria-current={number === currentPage ? "page" : undefined}
            >
              {number}
            </button>
          ))}
          <button
            className="border border-line px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.03em] text-muted transition-colors hover:border-brand-green hover:text-brand-green disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line disabled:hover:text-muted"
            type="button"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </nav>
      )}
    </div>
  );
}
