import Image from "next/image";
import Link from "next/link";
import { Byline, Eyebrow } from "@/components/StoryCard";
import { searchArticles } from "@/lib/content";
import { slugify } from "@/lib/site";

export const metadata = { title: "Search", description: "Search Horizon Chronicle reporting by story, topic, category, or author." };

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const query = typeof params?.q === "string" ? params.q.trim() : "";
  const results = searchArticles(query);
  return (
    <main className="mx-auto w-[min(calc(100%-26px),1280px)] pb-[70px] sm:w-[min(calc(100%-40px),1280px)]">
      <header className="max-w-[900px] pb-8 pt-9 md:pt-[55px]">
        <Eyebrow>Archive</Eyebrow>
        <h1 className="my-2.5 font-serif text-[49px] font-bold leading-[.95] md:text-[65px]">Search the Chronicle</h1>
        <p className="max-w-[660px] font-serif text-lg leading-[1.55] text-[#525a55]">Find reporting by story, topic, section, or author.</p>
      </header>
      <form className="grid max-w-[900px] grid-cols-1 gap-2 border border-line-dark bg-[#ece9e0] p-3 sm:grid-cols-[1fr_auto] sm:gap-0 sm:p-[18px]" action="/search">
        <input
          className="border border-line bg-cream px-[15px] py-[13px] outline-brand-green"
          defaultValue={query}
          name="q"
          type="search"
          placeholder="Try ‘technology’, ‘markets’, or an author name"
          aria-label="Search query"
          autoFocus
        />
        <button className="inline-flex min-h-[34px] items-center justify-center border border-brand-green bg-brand-green px-4 text-[11px] font-bold tracking-[.02em] text-cream transition-colors hover:bg-brand-green-2" type="submit">Search</button>
      </form>
      <div className="mt-[35px] border-b-[3px] border-double border-ink pb-2.5">
        <h2 className="font-serif text-[28px]">{query ? `${results.length} result${results.length === 1 ? "" : "s"} for “${query}”` : "All stories"}</h2>
      </div>
      {results.length ? (
        <div className="max-w-[950px]">
          {results.map((article) => (
            <article className="grid grid-cols-1 gap-[13px] border-b border-line py-[23px] sm:grid-cols-[230px_1fr] sm:gap-6" key={article.id}>
              <Link className="relative min-h-[145px] overflow-hidden sm:min-h-0" href={`/${slugify(article.category)}/${article.slug}`}>
                <Image src={article.image} alt={article.imageAlt} fill sizes="230px" className="object-cover" />
              </Link>
              <div>
                <Eyebrow>{article.category}</Eyebrow>
                <h2 className="my-1.5 mb-[7px] font-serif text-2xl font-bold leading-[1.05] sm:text-[26px]">
                  <Link className="hover:underline" href={`/${slugify(article.category)}/${article.slug}`}>{article.title}</Link>
                </h2>
                <p className="text-xs text-muted">{article.excerpt}</p>
                <Byline article={article} compact />
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="max-w-[700px] py-[60px]">
          <h2 className="font-serif text-4xl">No stories found</h2>
          <p className="text-muted">Try a broader topic, another author, or a section such as World, Science, or Culture.</p>
          <Link className="mt-4 inline-flex min-h-[34px] items-center justify-center border border-brand-green bg-brand-green px-4 text-[11px] font-bold tracking-[.02em] text-cream transition-colors hover:bg-brand-green-2" href="/">Return home</Link>
        </div>
      )}
    </main>
  );
}
