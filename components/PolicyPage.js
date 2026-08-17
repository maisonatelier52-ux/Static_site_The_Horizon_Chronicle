import Link from "next/link";

export default function PolicyPage({ eyebrow = "Our standards", title, intro, sections }) {
  return (
    <main className="mx-auto w-[min(calc(100%-26px),1280px)] pb-[70px] sm:w-[min(calc(100%-40px),1280px)]">
      <header className="max-w-[900px] pb-8 pt-[37px] sm:pt-[55px]">
        <span className="inline-block font-sans text-[11px] font-bold uppercase tracking-[.075em] text-brand-green-2">{eyebrow}</span>
        <h1 className="my-2.5 font-serif text-[49px] font-bold leading-[.95] sm:text-[65px]">{title}</h1>
        <p className="max-w-[660px] font-serif text-lg leading-[1.55] text-[#525a55]">{intro}</p>
      </header>
      <div className="grid grid-cols-1 items-start gap-[25px] border-t-[3px] border-double border-ink pt-[30px] sm:gap-[65px] md:grid-cols-[200px_minmax(0,700px)]">
        <nav aria-label="On this page" className="static grid md:sticky md:top-5">
          <strong className="border-b border-brand-green py-2.5 font-sans text-[10px] font-bold uppercase">On this page</strong>
          {sections.map((section) => (
            <a className="border-b border-line py-[9px] text-[10px] text-muted hover:text-brand-green" key={section.id} href={`#${section.id}`}>
              {section.title}
            </a>
          ))}
        </nav>
        <article>
          {sections.map((section, index) => (
            <section className="scroll-mt-[25px]" id={section.id} key={section.id}>
              <h2 className={`mb-[13px] font-serif text-3xl font-bold sm:text-[32px] ${index === 0 ? "pt-0" : "pt-[30px]"}`}>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p className="font-serif text-[16px] leading-[1.7] text-[#303733]" key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
          <p className="mt-[38px] border border-line bg-[#eeece4] p-[17px]">
            Questions about this policy? <Link className="font-bold text-brand-green" href="/contact">Contact the newsroom →</Link>
          </p>
        </article>
      </div>
    </main>
  );
}
