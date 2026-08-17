import Image from "next/image";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";
import { authors } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata = {
  title: "About us",
  description: `Meet the people, purpose, standards, and funding principles behind ${site.name}.`,
  alternates: { canonical: "/about" },
};

const values = [
  ["Evidence before certainty", "We distinguish what is known, what is inferred, and what still needs independent verification."],
  ["Context before spectacle", "Our reporting connects breaking developments to institutions, history, and the lives affected."],
  ["Independence before access", "Editorial decisions belong to the newsroom. Sources, advertisers, and funders do not review coverage."],
  ["Correction before defensiveness", "When we get something wrong, we correct the record clearly and explain material changes."],
];

export default function AboutPage() {
  return (
    <main className="pb-[70px]">
      <header className="mx-auto grid w-[min(calc(100%-26px),1280px)] grid-cols-1 items-center gap-7 pb-9 pt-9 sm:w-[min(calc(100%-40px),1280px)] md:grid-cols-[1.03fr_.97fr] md:gap-[55px] md:pb-[55px] md:pt-[52px]">
        <div>
          <span className="inline-block font-sans text-[11px] font-bold uppercase tracking-[.075em] text-brand-green-2">About the Chronicle</span>
          <h1 className="my-2.5 mb-[18px] max-w-[680px] font-serif text-[46px] font-bold leading-[.95] tracking-[-.03em] sm:text-[clamp(48px,5vw,70px)]">Journalism for readers who want to understand what happens next.</h1>
          <p className="max-w-[610px] font-serif text-lg leading-[1.55] text-[#4e5651]">{site.name} is an independent demonstration newsroom built around careful reporting, useful context, and a classic reading experience.</p>
          <div className="mt-[22px] flex gap-2.5">
            <Link className="inline-flex min-h-[34px] items-center justify-center border border-brand-green bg-brand-green px-4 text-[11px] font-bold tracking-[.02em] text-cream transition-colors hover:bg-brand-green-2" href="/contact">Contact the newsroom</Link>
            <Link className="inline-flex min-h-[34px] items-center justify-center border border-brand-green bg-transparent px-4 text-[11px] font-bold tracking-[.02em] transition-colors hover:bg-brand-green hover:text-cream" href="/editorial-policy">Read our standards</Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2.5 [grid-template-rows:140px_140px]">
          <div className="relative row-span-2 overflow-hidden"><Image src="/images/news/eastern-congo-m23-rebels-advance-image.webp" alt="Reporter observing a developing world story" fill priority sizes="440px" className="object-cover" /></div>
          <div className="relative overflow-hidden"><Image src="/images/news/google-disrupts-gallium-unc2814-chinese-hacking-image.webp" alt="Technology reporting desk" fill sizes="210px" className="object-cover" /></div>
          <div className="relative overflow-hidden"><Image src="/images/news/maria-corina-machado-nobel-oslo-appearance-canceled-image.webp" alt="Cultural event covered by the newsroom" fill sizes="210px" className="object-cover" /></div>
        </div>
      </header>

      <section className="bg-brand-green text-white">
        <div className="mx-auto grid w-[min(calc(100%-26px),1280px)] grid-cols-1 gap-5 py-9 sm:w-[min(calc(100%-40px),1280px)] md:grid-cols-[100px_.8fr_1fr] md:gap-[45px] md:py-[55px]">
          <span className="font-serif text-[52px] leading-none text-[#d2c194]">01</span>
          <div><span className="inline-block font-sans text-[11px] font-bold uppercase tracking-[.075em] text-[#d9ca9f]">Our purpose</span><h2 className="mt-2 font-serif text-[35px] leading-none md:text-[42px]">Slow down the noise.<br />Clarify the stakes.</h2></div>
          <div className="col-span-full md:col-span-1">
            <p className="mb-4 font-serif text-[15px] leading-[1.7] text-[#d9e1dc]">News should help people make sense of public life, not merely keep them scrolling. We pursue original reporting, explain uncertainty, and return to stories after the headline moves on.</p>
            <p className="mb-4 font-serif text-[15px] leading-[1.7] text-[#d9e1dc]">This starter project uses fictional demonstration copy and reusable editorial systems. It is ready to connect to a CMS or reporting workflow.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-[min(calc(100%-26px),1280px)] pt-[65px] sm:w-[min(calc(100%-40px),1280px)]">
        <div className="mb-7 grid grid-cols-1 gap-2.5 border-b border-line-dark pb-[18px] md:grid-cols-[1fr_1.2fr_1fr] md:items-end md:gap-[30px]">
          <span className="inline-block font-sans text-[11px] font-bold uppercase tracking-[.075em] text-brand-green-2">How we work</span>
          <h2 className="font-serif text-[38px] font-bold leading-none">Four newsroom commitments</h2>
          <p className="text-xs text-muted">These principles shape assignments, sourcing, editing, corrections, and presentation.</p>
        </div>
        <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-4">
          {values.map(([title, text], index) => (
            <article className="min-h-[190px] bg-paper p-[27px]" key={title}>
              <span className="font-serif text-[27px] text-brand-gold">0{index + 1}</span>
              <h3 className="mt-6 mb-2.5 font-serif text-[22px] font-bold leading-[1.05]">{title}</h3>
              <p className="text-[11px] text-muted">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-[min(calc(100%-26px),1280px)] pt-[65px] sm:w-[min(calc(100%-40px),1280px)]">
        <div className="mb-7 grid grid-cols-1 gap-2.5 border-b border-line-dark pb-[18px] md:grid-cols-[1fr_1.2fr_1fr] md:items-end md:gap-[30px]">
          <span className="inline-block font-sans text-[11px] font-bold uppercase tracking-[.075em] text-brand-green-2">The newsroom</span>
          <h2 className="font-serif text-[38px] font-bold leading-none">Meet our journalists</h2>
          <p className="text-xs text-muted">Fictional profiles demonstrate a complete author system for the new publication.</p>
        </div>
        <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:grid-cols-6">
          {authors.map((author) => (
            <article className="group" key={author.slug}>
              <Link className="relative mb-2.5 block aspect-[4/5] overflow-hidden" href={`/author/${author.slug}`}>
                <Image src={author.image} alt={author.name} fill sizes="240px" className="object-cover saturate-[.82] transition-all duration-300 group-hover:scale-[1.02] group-hover:saturate-100" />
              </Link>
              <h3 className="mb-0.5 font-serif text-[17px] font-bold"><Link href={`/author/${author.slug}`}>{author.name}</Link></h3>
              <p className="min-h-[25px] text-[9px] font-bold text-brand-green">{author.role}</p>
              <span className="text-[8px] text-muted">{author.location}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-[70px] bg-[#0c241d] text-white">
        <div className="mx-auto grid w-[min(calc(100%-26px),1280px)] grid-cols-1 gap-[25px] py-9 sm:w-[min(calc(100%-40px),1280px)] md:grid-cols-2 md:gap-[70px] md:py-[52px]">
          <div><span className="inline-block font-sans text-[11px] font-bold uppercase tracking-[.075em] text-[#d9ca9f]">Transparency</span><h2 className="mt-2.5 max-w-[520px] font-serif text-[38px] leading-none md:text-[46px]">Trust is a practice, not a slogan.</h2></div>
          <div>
            <p className="font-serif text-[15px] leading-[1.6] text-[#ced6d1]">Read how we handle corrections, sources, funding, advertising, privacy, and the right of reply.</p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2">
              <Link className="border-b border-[#3a5149] py-[11px] text-[11px] text-[#dfd1a6]" href="/corrections-policy">Corrections</Link>
              <Link className="border-b border-[#3a5149] py-[11px] text-[11px] text-[#dfd1a6]" href="/source-methodology">Sources</Link>
              <Link className="border-b border-[#3a5149] py-[11px] text-[11px] text-[#dfd1a6]" href="/ownership-funding">Funding</Link>
              <Link className="border-b border-[#3a5149] py-[11px] text-[11px] text-[#dfd1a6]" href="/right-of-reply">Right of reply</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-[min(calc(100%-26px),1280px)] grid-cols-1 items-center gap-5 border border-line-dark bg-[#efede5] px-[18px] py-8 sm:w-[min(calc(100%-40px),1280px)] md:mt-[55px] md:grid-cols-[60px_1fr_1fr] md:gap-7 md:px-[38px]" id="newsletter">
        <span className="text-[40px] text-brand-gold">✦</span>
        <div><h2 className="font-serif text-[34px] leading-none">Begin the day with clarity.</h2><p className="mt-1.5 text-[11px] text-muted">A concise briefing of the stories that deserve your attention.</p></div>
        <div className="md:col-span-2 lg:col-span-1"><NewsletterForm /></div>
      </section>
    </main>
  );
}
