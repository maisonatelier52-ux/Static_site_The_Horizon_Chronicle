import Image from "next/image";
import Link from "next/link";
import { formatDate, getAuthor } from "@/lib/content";
import { slugify } from "@/lib/site";

export function ArticleLink({ article, children, className = "" }) {
  return (
    <Link
      className={className}
      href={`/${slugify(article.category)}/${article.slug}`}
    >
      {children}
    </Link>
  );
}

export function Eyebrow({ children, light = false }) {
  return (
    <span
      className={`inline-block font-sans text-[11px] font-bold uppercase tracking-[.075em] ${
        light ? "text-[#d9ca9f]" : "text-brand-green-2"
      }`}
    >
      {children}
    </span>
  );
}

export function Byline({ article, light = false, compact = false }) {
  const author = getAuthor(article.authorSlug);
  return (
    <div
      className={`flex flex-wrap items-center gap-[7px] text-xs ${
        light ? "text-[#e9ece8]" : "text-muted"
      } ${compact ? "mt-2 text-[10px]" : ""}`}
    >
      {!compact && (
        <Image
          className="h-7 w-7 rounded-full object-cover"
          src={author.image}
          alt={author.name}
          width={28}
          height={28}
        />
      )}
      <span>
        By <Link className="font-bold text-inherit" href={`/author/${author.slug}`}>{author.name}</Link>
      </span>
      <span aria-hidden="true">•</span>
      <time dateTime={article.publishedAt}>{formatDate(article.publishedAt, true)}</time>
      <span aria-hidden="true">•</span>
      <span>{article.readTime}</span>
    </div>
  );
}

export function SectionHeading({ title, href, label = "View all" }) {
  return (
    <div className="flex min-h-[35px] items-center justify-between border-b border-line border-t border-line-dark">
      <h2 className="m-0 font-serif text-sm font-bold uppercase leading-none tracking-[.025em]">{title}</h2>
      {href && (
        <Link className="text-[11px] font-semibold text-muted" href={href}>
          {label} <span aria-hidden="true">→</span>
        </Link>
      )}
    </div>
  );
}

const imageStorySizes = {
  standard: {
    body: "pt-[9px]",
    h3: "mt-1 text-xl leading-[1.08]",
    excerpt: "my-[7px] text-sm leading-[1.45] text-muted",
    hideMeta: false,
  },
  column: {
    body: "pt-[9px]",
    h3: "mt-1 min-h-[46px] text-xl leading-[1.08]",
    excerpt: "my-[7px] text-sm leading-[1.45] text-muted",
    hideMeta: false,
  },
  small: {
    body: "pt-[9px]",
    h3: "mt-1 text-[17px] leading-[1.08]",
    excerpt: "my-[7px] text-sm leading-[1.45] text-muted",
    hideMeta: false,
  },
  mini: {
    body: "pt-1.5",
    h3: "mt-1 text-[13px] leading-[1.08]",
    excerpt: "my-[7px] text-sm leading-[1.45] text-muted",
    hideMeta: true,
  },
};

export function ImageStory({ article, size = "standard", showExcerpt = false }) {
  const styles = imageStorySizes[size] || imageStorySizes.standard;
  return (
    <article className="group">
      <ArticleLink
        article={article}
        className="relative block aspect-video overflow-hidden bg-[#d8d4ca]"
      >
        <Image
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
          src={article.image}
          alt={article.imageAlt}
          fill
          sizes="(max-width: 720px) 100vw, 33vw"
        />
      </ArticleLink>
      <div className={styles.body}>
        {!styles.hideMeta && <Eyebrow>{article.category}</Eyebrow>}
        <h3 className={`${styles.h3} font-serif font-bold`}>
          <ArticleLink article={article} className="hover:underline">{article.title}</ArticleLink>
        </h3>
        {showExcerpt && <p className={styles.excerpt}>{article.excerpt}</p>}
        {!styles.hideMeta && <Byline article={article} compact />}
      </div>
    </article>
  );
}

export function OverlayStory({ article, compact = false }) {
  return (
    <article
      className={`group relative overflow-hidden bg-brand-green text-white ${
        compact ? "min-h-[310px]" : "min-h-[390px]"
      }`}
    >
      <Image
        src={article.image}
        alt={article.imageAlt}
        fill
        priority={!compact}
        sizes="(max-width: 720px) 100vw, 42vw"
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.02)_25%,rgba(0,0,0,.83)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 z-10 p-[26px]">
        <Eyebrow light>{article.category}</Eyebrow>
        <h2 className={`my-2 max-w-[560px] font-serif font-bold leading-[1.02] ${compact ? "text-[25px]" : "text-[32px]"}`}>
          <ArticleLink article={article}>{article.title}</ArticleLink>
        </h2>
        {!compact && (
          <p className="my-2.5 mb-3.5 max-w-[580px] font-sans text-sm leading-relaxed text-[#e8e8e3]">
            {article.excerpt}
          </p>
        )}
        <Byline article={article} light compact={compact} />
      </div>
    </article>
  );
}

export function CompactStory({ article, numbered = false, index = 0 }) {
  return (
    <article
      className={`grid gap-3 border-b border-[#dedbd1] ${
        numbered ? "grid-cols-[36px_1fr] items-start py-4" : "grid-cols-[88px_1fr] items-center py-3"
      }`}
    >
      {numbered && (
        <span className="font-serif text-[25px] leading-none text-brand-green">
          {String(index + 1).padStart(2, "0")}
        </span>
      )}
      {!numbered && (
        <ArticleLink article={article} className="relative min-h-[59px] overflow-hidden">
          <Image src={article.image} alt="" fill sizes="92px" className="object-cover" />
        </ArticleLink>
      )}
      <div>
        {!numbered && <Eyebrow>{article.category}</Eyebrow>}
        <h3 className={`mb-[5px] mt-1 font-serif font-bold leading-[1.15] ${numbered ? "text-lg" : "text-base"}`}>
          <ArticleLink article={article} className="hover:underline">{article.title}</ArticleLink>
        </h3>
        {!numbered && (
          <time className="text-[11px] text-muted" dateTime={article.publishedAt}>
            {article.timeAgo}
          </time>
        )}
      </div>
    </article>
  );
}

export function CompactStoryInital({ article, numbered = false, index = 0 }) {
  return (
    <article
      className={`grid gap-2.5 border-b border-[#dedbd1] ${
        numbered ? "grid-cols-[36px_1fr] items-start py-3" : "grid-cols-[88px_1fr] items-center py-2"
      }`}
    >
      {numbered && (
        <span className="font-serif text-[25px] leading-none text-brand-green">
          {String(index + 1).padStart(2, "0")}
        </span>
      )}
      {!numbered && (
        <ArticleLink article={article} className="relative min-h-[59px] overflow-hidden">
          <Image src={article.image} alt="" fill sizes="92px" className="object-cover" />
        </ArticleLink>
      )}
      <div>
        {!numbered && <Eyebrow>{article.category}</Eyebrow>}
        <h3 className={`mb-[5px] mt-0.5 font-serif font-bold leading-[1.13] ${numbered ? "text-base" : "text-[15px]"}`}>
          <ArticleLink article={article} className="hover:underline">{article.title}</ArticleLink>
        </h3>
        {!numbered && (
          <time className="text-[10px] text-muted" dateTime={article.publishedAt}>
            {article.timeAgo}
          </time>
        )}
      </div>
    </article>
  );
}

export function TextStory({ article, showExcerpt = false }) {
  return (
    <article className="border-b border-[#ddd9cf] py-2.5">
      <div className="grid min-h-[35px] grid-cols-[1fr_auto] items-center gap-2">
        <h4 className="m-0 font-serif text-sm font-semibold leading-tight">
          <ArticleLink article={article} className="hover:underline">{article.title}</ArticleLink>
        </h4>
        <span className="whitespace-nowrap text-[10px] text-muted">{article.timeAgo}</span>
      </div>
      {showExcerpt && (
        <p className="mt-1.5 text-xs leading-[1.5] text-muted">{article.excerpt}</p>
      )}
    </article>
  );
}
