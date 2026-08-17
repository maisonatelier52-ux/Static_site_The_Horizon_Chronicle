import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ShareTools from "@/components/ShareTools";
import Sidebar from "@/components/Sidebar";
import { Byline, Eyebrow, ImageStory, SectionHeading } from "@/components/StoryCard";
import {
  articleSections,
  articleWordCount,
  articles,
  getAdjacentArticles,
  getArticle,
  getArticleImages,
  getAuthor,
  getCategoryArticles,
} from "@/lib/content";
import { absoluteUrl, site, slugify } from "@/lib/site";

export function generateStaticParams() {
  return articles.map((article) => ({ category: slugify(article.category), slug: article.slug }));
}

export async function generateMetadata({ params }) {
  const { category, slug } = await params;
  const article = getArticle(category, slug);
  if (!article) return {};
  const author = getAuthor(article.authorSlug);
  const url = `/${category}/${slug}`;
  return {
    title: article.metaTitle,
    description: article.metaDescription,
    authors: [{ name: author.name, url: `/author/${author.slug}` }],
    keywords: article.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: article.metaTitle,
      description: article.metaDescription,
      url: absoluteUrl(url),
      publishedTime: article.publishedAt,
      authors: [author.name],
      section: article.category,
      images: [{ url: absoluteUrl(article.image), alt: article.imageAlt }],
    },
    twitter: { card: "summary_large_image", title: article.metaTitle, description: article.metaDescription, images: [absoluteUrl(article.image)] },
  };
}

export default async function ArticlePage({ params }) {
  const { category, slug } = await params;
  const article = getArticle(category, slug);
  if (!article) notFound();
  const author = getAuthor(article.authorSlug);
  const sections = articleSections(article);
  const adjacent = getAdjacentArticles(article);
  const related = getCategoryArticles(article.category).filter((item) => item.id !== article.id).slice(0, 3);
  const path = `/${category}/${slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    image: getArticleImages(article).map(absoluteUrl),
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    mainEntityOfPage: absoluteUrl(path),
    articleSection: article.category,
    wordCount: articleWordCount(article),
    author: { "@type": "Person", name: author.name, url: absoluteUrl(`/author/${author.slug}`) },
    publisher: { "@type": "NewsMediaOrganization", name: site.name, url: site.url },
  };

  return (
    <main className="pb-[70px]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="mx-auto flex w-[min(calc(100%-26px),1280px)] max-w-[1063px] gap-2.5 pt-[25px] text-[10px] text-muted sm:w-[min(calc(100%-40px),1280px)]">
        <Link className="hover:text-brand-green hover:underline" href="/">Home</Link><span>/</span>
        <Link className="hover:text-brand-green hover:underline" href={`/${category}`}>{article.category}</Link><span>/</span>
        <span className="truncate text-ink">{article.title}</span>
      </div>
      <header className="mx-auto w-[min(calc(100%-26px),1280px)] max-w-[1063px] pt-6 text-left sm:w-[min(calc(100%-40px),1280px)] md:pt-8">
        <Eyebrow>{article.category}</Eyebrow>
        <h1 className="my-[11px] max-w-[1000px] font-serif text-[27px] font-bold leading-[.97] tracking-[-.035em] sm:text-[clamp(44px,3.8vw,76px)]">{article.title}</h1>
        <p className="mb-[22px] max-w-[790px] font-serif text-xs leading-[1.42] text-[#4e5752] md:text-sm">{article.excerpt}</p>
        <div className="flex items-center justify-between gap-[13px] sm:gap-7">
          <Byline article={article} />
          <ShareTools title={article.title} image={absoluteUrl(article.image)} />
        </div>
      </header>

      <figure className="relative mx-auto mb-[47px] mt-[25px] w-[min(calc(100%-26px),1280px)] max-w-[1063px] min-h-[50vw] sm:w-[min(calc(100%-40px),1280px)] md:min-h-[min(45vw,480px)]">
        <Image src={article.image} alt={article.imageAlt} fill priority sizes="(max-width: 1063px) 100vw, 1063px" className="object-cover" />
        <figcaption className="absolute left-[13px] right-[13px] top-full pt-[7px] text-[8px] text-muted sm:left-0 sm:right-auto">
          {article.imageAlt}. <span className="italic">Horizon Chronicle / Demo archive</span>
        </figcaption>
      </figure>

      <div className="mx-auto grid w-[min(calc(100%-26px),1280px)] grid-cols-1 justify-center gap-5 sm:w-[min(calc(100%-40px),1280px)] lg:grid-cols-[minmax(0,720px)_300px] lg:items-start lg:gap-[43px]">
        <article className="min-w-0">

          {sections.map((section) => (
            <section className="scroll-mt-5" id={section.id} key={section.id}>
              {section.title && (
                <h2 className="my-10 mb-3.5 font-serif text-[24px] font-bold leading-[1.05] md:text-[26px]">{section.title}</h2>
              )}
              {section.blocks.map((block, blockIndex) => {
                if (block.type === "paragraph") {
                  return (
                    <p className="mb-[22px] font-serif text-[13px] leading-[1.78] text-[#252d29] md:text-[15px]" key={`${section.id}-${blockIndex}`}>
                      {block.text}
                    </p>
                  );
                }
                if (block.type === "image") {
                  return (
                    <figure className="relative my-9 mb-[55px] min-h-[62vw] md:min-h-[420px]" key={`${section.id}-${blockIndex}`}>
                      <Image src={block.src} alt={block.alt} fill sizes="(max-width: 780px) 100vw, 720px" className="object-cover" />
                      <figcaption className="absolute left-0 top-full pt-[7px] text-[8px] text-muted">
                        {block.alt} <span className="italic">Demo archive</span>
                      </figcaption>
                    </figure>
                  );
                }
                if (block.type === "quote") {
                  return (
                    <blockquote className="my-10 border-y border-brand-green px-[18px] py-[26px] text-center md:px-[33px]" key={`${section.id}-${blockIndex}`}>
                      <p className="mb-[11px] font-serif text-lg font-bold italic leading-[1.25] text-brand-green md:text-[20px]">“{block.text}”</p>
                      <cite className="font-sans text-[9px] uppercase tracking-[.08em] text-muted">— {author.name}</cite>
                    </blockquote>
                  );
                }
                return null;
              })}
            </section>
          ))}

          <div className="my-[34px] mb-[18px] flex flex-wrap gap-[7px]" aria-label="Topics">
            {article.keywords.map((keyword) => (
              <Link className="border border-line px-2.5 py-1.5 text-[9px] text-muted hover:text-brand-green" key={keyword} href={`/search?q=${encodeURIComponent(keyword)}`}>{keyword}</Link>
            ))}
          </div>
          <div className="border-y border-line py-4">
            <ShareTools title={article.title} image={absoluteUrl(article.image)} />
          </div>

          <section className="mt-8 grid grid-cols-1 items-center gap-5 border border-line bg-[#eeece4] p-[17px] md:grid-cols-[104px_1fr] md:p-6">
            <Image className="h-[75px] w-[75px] rounded-full object-cover md:h-[104px] md:w-[104px]" src={author.image} alt={author.name} width={104} height={104} />
            <div>
              <span className="inline-block font-sans text-[11px] font-bold uppercase tracking-[.075em] text-brand-green-2">About the author</span>
              <h2 className="my-1 text-[26px]">{author.name}</h2>
              <p className="mb-[7px] font-sans text-xs leading-[1.5]">{author.bio}</p>
              <Link className="text-[10px] font-bold text-brand-green" href={`/author/${author.slug}`}>View profile and articles →</Link>
            </div>
          </section>

          <nav className="mt-[25px] grid grid-cols-1 gap-5 sm:grid-cols-2" aria-label="Adjacent articles">
            {adjacent.previous ? (
              <Link className="grid content-start border-t border-line-dark py-[15px] font-serif text-base font-bold leading-[1.15]" href={`/${category}/${adjacent.previous.slug}`}>
                <span className="mb-[5px] font-sans text-[8px] uppercase text-muted">← Previous</span>{adjacent.previous.title}
              </Link>
            ) : <span />}
            {adjacent.next ? (
              <Link className="grid content-start border-t border-line-dark py-[15px] text-right font-serif text-base font-bold leading-[1.15]" href={`/${category}/${adjacent.next.slug}`}>
                <span className="mb-[5px] font-sans text-[8px] uppercase text-muted">Next →</span>{adjacent.next.title}
              </Link>
            ) : <span />}
          </nav>
        </article>
        <Sidebar excludeId={article.id} sticky />
      </div>

      <section className="mx-auto mt-[60px] w-[min(calc(100%-26px),1280px)] sm:w-[min(calc(100%-40px),1280px)]">
        <SectionHeading title={`More from ${article.category}`} href={`/${category}`} />
        <div className="grid grid-cols-1 gap-[22px] pt-[15px] md:grid-cols-3">
          {related.map((item) => <ImageStory key={item.id} article={item} showExcerpt />)}
        </div>
      </section>
    </main>
  );
}