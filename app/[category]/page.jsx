import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleListPaginated from "@/components/ArticleListPaginated";
import Sidebar from "@/components/Sidebar";
import { Byline, Eyebrow, ImageStory, SectionHeading } from "@/components/StoryCard";
import {
  categories,
  categoryDescriptions,
  getCategoryArticles,
} from "@/lib/content";
import { absoluteUrl, site, slugify } from "@/lib/site";

export function generateStaticParams() {
  return categories.map((category) => ({ category: slugify(category) }));
}

export async function generateMetadata({ params }) {
  const { category: categorySlug } = await params;
  const category = categories.find((item) => slugify(item) === categorySlug);
  if (!category) return {};
  const description = categoryDescriptions[category];
  return {
    title: category,
    description,
    alternates: { canonical: `/${categorySlug}` },
    openGraph: { title: `${category} | ${site.name}`, description, url: absoluteUrl(`/${categorySlug}`) },
  };
}

export default async function CategoryPage({ params }) {
  const { category: categorySlug } = await params;
  const category = categories.find((item) => slugify(item) === categorySlug);
  if (!category) notFound();
  const categoryArticles = getCategoryArticles(category);
  const [lead, ...rest] = categoryArticles;
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category} news`,
    description: categoryDescriptions[category],
    url: absoluteUrl(`/${categorySlug}`),
    isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
  };

  return (
    <main className="mx-auto w-[min(calc(100%-26px),1280px)] pb-[60px] pt-7 sm:w-[min(calc(100%-40px),1280px)] md:pt-[38px]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <header className="grid grid-cols-1 items-end gap-3.5 border-b-[3px] border-double border-ink pb-[27px] md:grid-cols-2 md:gap-10">
        <div>
          <span className="inline-block font-sans text-[11px] font-bold uppercase tracking-[.075em] text-brand-green-2">Section</span>
          <h1 className="mt-[3px] font-serif text-[54px] font-bold leading-[.9] md:text-[68px]">{category}</h1>
        </div>
        <p className="max-w-[570px] font-serif text-base leading-[1.5] text-[#555c57] md:text-lg">{categoryDescriptions[category]}</p>
      </header>

      <section className="grid grid-cols-1 items-center gap-5 border-b border-line-dark py-[25px] pb-[34px] md:grid-cols-[1.4fr_1fr] md:gap-[34px]">
        <Link className="relative min-h-[260px] overflow-hidden md:min-h-[410px]" href={`/${categorySlug}/${lead.slug}`}>
          <Image src={lead.image} alt={lead.imageAlt} fill priority sizes="(max-width: 820px) 100vw, 62vw" className="object-cover" />
        </Link>
        <div>
          <Eyebrow>Top {category} story</Eyebrow>
          <h2 className="my-2.5 mb-3.5 font-serif text-[36px] font-bold leading-[.98] md:text-[46px]">
            <Link className="hover:underline" href={`/${categorySlug}/${lead.slug}`}>{lead.title}</Link>
          </h2>
          <p className="font-serif text-base leading-[1.55] text-[#525954]">{lead.excerpt}</p>
          <Byline article={lead} />
        </div>
      </section>

      <div className="grid grid-cols-1 gap-[50px] pt-8 lg:grid-cols-[1fr_310px] lg:items-start">
        <div>
          <SectionHeading title={`Latest in ${category}`} />
          <ArticleListPaginated articles={rest} />
          {rest.length < 3 && (
            <div className="mt-[35px]">
              <SectionHeading title="Across the Chronicle" />
              <div className="grid grid-cols-1 gap-[22px] pt-[15px] md:grid-cols-3">
                {getCategoryArticles("World").slice(0, 3).map((article) => <ImageStory key={article.id} article={article} />)}
              </div>
            </div>
          )}
        </div>
        <Sidebar excludeId={lead.id} sticky />
      </div>
    </main>
  );
}