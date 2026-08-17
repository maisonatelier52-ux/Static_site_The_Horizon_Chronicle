import Image from "next/image";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";
import ReporterCarousel from "@/components/ReporterCarousel";
import {
  CompactStory,
  CompactStoryInital,
  ImageStory,
  OverlayStory,
  SectionHeading,
  TextStory,
} from "@/components/StoryCard";
import { articles, getCategoryArticles } from "@/lib/content";
import { slugify } from "@/lib/site";

function CategoryColumn({ category }) {
  const categoryArticles = getCategoryArticles(category);
  const lead = categoryArticles[0];
  return (
    <section className="pb-[5px]">
      <SectionHeading title={category} href={`/${slugify(category)}`} label="" />
      <ImageStory article={lead} size="column" />
      <div className="mt-2.5">
        {categoryArticles.slice(1, 5).map((article) => <TextStory key={article.id} article={article} />)}
      </div>
    </section>
  );
}

function SmallCategory({ category }) {
  const categoryArticles = getCategoryArticles(category);
  return (
    <section>
      <SectionHeading title={category} href={`/${slugify(category)}`} label="" />
      <ImageStory article={categoryArticles[0]} size="small" />
      {categoryArticles.slice(1, 3).map((article) => <TextStory key={article.id} article={article} />)}
    </section>
  );
}

export default function HomePage() {
  const feature = articles[7];
  return (
    <main>
      <div className="mx-auto w-[min(calc(100%-26px),1280px)] pb-[50px] pt-[22px] sm:w-[min(calc(100%-40px),1280px)] md:pt-[30px]">
        <section className="grid grid-cols-1 gap-5 md:grid-cols-[1.2fr_.85fr] lg:grid-cols-[1.35fr_.95fr_.84fr]" aria-label="Top stories">
          <OverlayStory article={articles[0]} />
          <OverlayStory article={articles[1]} compact />
          <aside className="md:col-span-2 md:grid md:grid-cols-5 md:gap-2.5 lg:col-auto lg:block">
            <div className="md:col-span-5">
              <SectionHeading title="Latest updates" />
            </div>
            {articles.slice(2, 7).map((article) => <CompactStoryInital key={article.id} article={article} />)}
          </aside>
        </section>

        <section className="mt-10">
          <SectionHeading title="Featured story" />
          <div className="grid grid-cols-1 gap-6 py-6 pb-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
            <Link className="relative min-h-[240px] overflow-hidden lg:min-h-[330px]" href={`/${slugify(feature.category)}/${feature.slug}`}>
              <Image src={feature.image} alt={feature.imageAlt} fill priority sizes="(max-width: 800px) 100vw, 57vw" className="object-cover" />
            </Link>
            <div>
              <h2 className="my-0.5 mb-2 max-w-[600px] font-serif text-[30px] font-bold leading-[1.02] lg:text-[34px]">
                <Link className="hover:underline" href={`/${slugify(feature.category)}/${feature.slug}`}>{feature.title}</Link>
              </h2>
              <p className="my-2.5 text-base leading-[1.5] text-[#4b514d]">{feature.excerpt}</p>
              <p className="text-[10px] text-[#4b514d]">By Marcus Reed <span className="mx-[5px]">•</span> May 24, 2026 <span className="mx-[5px]">•</span> 7 min read</p>
              <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {articles.slice(8, 11).map((article) => <ImageStory key={article.id} article={article} size="mini" />)}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-9 grid grid-cols-1 gap-9 lg:grid-cols-[2fr_1fr] lg:gap-12">
          <div>
            <SectionHeading title="Latest news" href="/search" />
            <div className="grid grid-cols-1 gap-x-10 gap-y-2 sm:grid-cols-2">
              {articles.slice(11, 19).map((article) => <CompactStory key={article.id} article={article} />)}
            </div>
          </div>
          <div className="border-line pl-0 lg:border-l lg:pl-[25px]">
            <SectionHeading title="Most read" />
            {articles.slice(19, 24).map((article, index) => <CompactStory key={article.id} article={article} numbered index={index} />)}
          </div>
        </section>

        <div className="mt-10 grid grid-cols-1 gap-8 border-b border-line-dark pb-8 sm:grid-cols-2 lg:grid-cols-4">
          {['World', 'Politics', 'Business', 'Technology'].map((category) => <CategoryColumn key={category} category={category} />)}
        </div>

        <aside className="relative mx-0 mt-9 min-h-[210px] overflow-hidden bg-ink text-white lg:mx-[54px]" aria-label="Advertisement">
          <Image src={articles[5].image} alt="Luxury island resort at sunset" fill sizes="100vw" className="object-cover opacity-[.66]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,29,23,.95)_0,rgba(5,29,23,.65)_42%,rgba(5,29,23,.06)_72%,rgba(5,29,23,.9)_100%)]" />
          <div className="relative z-10 px-[18px] py-5 lg:px-8">
            <span className="mb-[5px] block text-[8px] uppercase text-[#c9c9bd]">Advertisement</span>
            <h2 className="mb-1 font-serif text-2xl leading-[.98]">Explore the world<br />in unparalleled luxury.</h2>
            <p className="mb-2 text-[9px] uppercase">Curated journeys. Exceptional experiences.</p>
            <button className="border border-white bg-transparent px-2.5 py-[5px] text-[9px] uppercase text-white" type="button">Discover more</button>
          </div>
          <div className="absolute right-4 top-auto z-20 grid text-center font-serif text-[13px] uppercase tracking-[.18em] text-[#e5d09d] lg:right-[45px] lg:top-1/2 lg:-translate-y-1/2">
            <span className="text-[27px]">✺</span>Aurora<small className="font-sans text-[6px] tracking-[.2em]">Luxury Travel</small>
          </div>
        </aside>

        <div className="mt-10 grid grid-cols-1 gap-8 border-b border-line-dark pb-8 sm:grid-cols-3">
          {['Science', 'Sports', 'Entertainment'].map((category) => <CategoryColumn key={category} category={category} />)}
        </div>

        {/* Trending now / Editor's picks / Newsletter section */}
        <section className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1.35fr_.85fr_.6fr] lg:items-start">
          <div>
            <SectionHeading title="Trending now" />
            <div className="mt-1">
              {articles.slice(19, 24).map((article) => <TextStory key={article.id} article={article} showExcerpt />)}
            </div>
          </div>

          <div>
            <SectionHeading title="Editor’s picks" />
            <div className="mt-1">
              {articles.slice(23, 27).map((article) => <CompactStory key={article.id} article={article} />)}
            </div>
          </div>

          <div
            className="flex h-[300px] flex-col items-center justify-center bg-emerald-900 px-4 py-10 text-center text-white lg:sticky lg:top-6 lg:py-0"
            id="newsletter"
          >
            <span className="text-lg text-brand-gold">✦</span>
            <h2 className="my-0.5 font-serif text-xl font-bold leading-none">Stay informed.</h2>
            <p className="mx-auto my-2 mb-3 max-w-[220px] text-[11px] text-white/75">
              Get the day’s most important stories delivered straight to your inbox every morning.
            </p>
            <div className="mx-auto w-full max-w-[220px]">
              <NewsletterForm />
            </div>
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 gap-9 lg:grid-cols-[3fr_1fr] lg:gap-9">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {['Lifestyle', 'Culture', 'Opinion'].map((category) => <SmallCategory key={category} category={category} />)}
          </div>
          <aside className="border-line pl-0 lg:border-l lg:pl-5">
            <SectionHeading title="More stories" href="/search" />
            {articles.slice(30, 36).map((article) => <TextStory key={article.id} article={article} />)}
          </aside>
        </section>

        <section className="mt-10">
          <SectionHeading title="From our reporters" />
          <ReporterCarousel />
        </section>
      </div>
    </main>
  );
}