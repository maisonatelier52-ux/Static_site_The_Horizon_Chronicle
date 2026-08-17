import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaEnvelope, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import ArticleListPaginated from "@/components/ArticleListPaginated";
import Sidebar from "@/components/Sidebar";
import { Eyebrow, SectionHeading } from "@/components/StoryCard";
import { authors, getAuthor, getAuthorArticles } from "@/lib/content";
import { absoluteUrl, site, slugify } from "@/lib/site";

export function generateStaticParams() {
  return authors.map((author) => ({ slug: author.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) return {};
  return {
    title: `${author.name}, ${author.role}`,
    description: author.bio,
    alternates: { canonical: `/author/${slug}` },
    openGraph: { type: "profile", title: author.name, description: author.bio, url: absoluteUrl(`/author/${slug}`), images: [absoluteUrl(author.image)] },
  };
}

export default async function AuthorPage({ params }) {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) notFound();
  const authorArticles = getAuthorArticles(slug);
  const schema = {
    "@context": "https://schema.org", "@type": "Person", name: author.name,
    jobTitle: author.role, description: author.bio, image: absoluteUrl(author.image),
    url: absoluteUrl(`/author/${slug}`), worksFor: { "@type": "NewsMediaOrganization", name: site.name },
  };

  return (
    <main className="mx-auto w-[min(calc(100%-26px),1280px)] pb-[70px] pt-[25px] sm:w-[min(calc(100%-40px),1280px)] md:pt-[42px]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <header className="grid grid-cols-1 items-center gap-6 border-y-[3px] border-double border-ink bg-[#edeae1] p-[19px] md:grid-cols-[220px_1fr] md:p-8 lg:grid-cols-[260px_1fr_190px] lg:gap-10">
        <div className="relative min-h-[290px] md:min-h-[360px] lg:min-h-[290px]">
          <Image src={author.image} alt={author.name} fill priority sizes="300px" className="object-cover saturate-[.84]" />
        </div>
        <div>
          <Eyebrow>Horizon Chronicle journalist</Eyebrow>
          <h1 className="mb-1 mt-[7px] font-serif text-[45px] font-bold leading-[.98] md:text-[54px]">{author.name}</h1>
          <p className="mb-[13px] text-[11px] font-bold uppercase text-brand-green">{author.role} <span className="text-brand-gold">•</span> {author.location}</p>
          <p className="font-serif text-base leading-[1.58] text-[#464e49]">{author.longBio}</p>
          <div className="my-[15px] flex gap-[7px]">{author.beats.map((beat) => <Link className="border border-brand-green px-[9px] py-[5px] text-[9px] font-bold text-brand-green" key={beat} href={`/${slugify(beat)}`}>{beat}</Link>)}</div>
          <div className="flex items-center gap-2">
            <a className="grid h-7 w-7 place-items-center rounded-full border border-line bg-white transition-colors hover:border-brand-green hover:bg-brand-green hover:text-white" href={`mailto:${author.email}`} aria-label={`Email ${author.name}`}><FaEnvelope /></a>
            <a className="grid h-7 w-7 place-items-center rounded-full border border-line bg-white transition-colors hover:border-brand-green hover:bg-brand-green hover:text-white" href={site.socials.x} aria-label="X"><FaXTwitter /></a>
            <a className="grid h-7 w-7 place-items-center rounded-full border border-line bg-white transition-colors hover:border-brand-green hover:bg-brand-green hover:text-white" href={site.socials.facebook} aria-label="Facebook"><FaFacebookF /></a>
            <a className="grid h-7 w-7 place-items-center rounded-full border border-line bg-white transition-colors hover:border-brand-green hover:bg-brand-green hover:text-white" href={site.socials.instagram} aria-label="Instagram"><FaInstagram /></a>
            <a className="grid h-7 w-7 place-items-center rounded-full border border-line bg-white transition-colors hover:border-brand-green hover:bg-brand-green hover:text-white" href={site.socials.linkedin} aria-label="LinkedIn"><FaLinkedinIn /></a>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2.5 border-t border-line-dark pt-5 md:col-span-2 lg:col-span-1 lg:grid-cols-1 lg:border-l lg:border-t-0 lg:pl-[30px] lg:pt-0">
          <div className="grid border-b border-line pb-3"><strong className="font-serif text-3xl leading-none lg:text-[38px]">{authorArticles.length}</strong><span className="mt-[3px] text-[8px] uppercase text-muted">Stories</span></div>
          <div className="grid border-b border-line pb-3"><strong className="font-serif text-3xl leading-none lg:text-[38px]">{author.beats.length}</strong><span className="mt-[3px] text-[8px] uppercase text-muted">Beats</span></div>
          <div className="col-span-3 grid border-b border-line pb-3 lg:col-span-1"><strong className="font-serif text-3xl leading-none lg:text-[38px]">10+</strong><span className="mt-[3px] text-[8px] uppercase text-muted">Years reporting</span></div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-[50px] pt-10 lg:grid-cols-[1fr_310px] lg:items-start">
        <section>
          <SectionHeading title={`Latest from ${author.name}`} />
          <ArticleListPaginated articles={authorArticles} />
        </section>
        <Sidebar showNewsletter sticky />
      </div>
    </main>
  );
}