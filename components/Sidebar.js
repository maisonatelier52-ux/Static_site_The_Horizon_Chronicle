"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { articles } from "@/lib/content";
import { site, slugify } from "@/lib/site";
import NewsletterForm from "./NewsletterForm";

export default function Sidebar({ excludeId, showNewsletter = true, sticky = false }) {
  const [tab, setTab] = useState("latest");
  const available = articles.filter((item) => item.id !== excludeId);
  const displayed = tab === "latest" ? available.slice(0, 5) : available.slice(19, 24);

  return (
    <aside className={`min-w-0 ${sticky ? "lg:sticky lg:top-5" : ""}`}>
      <section className="mb-[22px] border border-line bg-white/[.24] p-[18px]">
        <p className="mb-3 font-serif text-base font-bold">Follow the Chronicle</p>
        <div className="flex items-center gap-2">
          <a className="grid h-7 w-7 place-items-center rounded-full border border-line transition-colors hover:border-brand-green hover:bg-brand-green hover:text-white" href={site.socials.facebook} aria-label="Facebook"><FaFacebookF /></a>
          <a className="grid h-7 w-7 place-items-center rounded-full border border-line transition-colors hover:border-brand-green hover:bg-brand-green hover:text-white" href={site.socials.x} aria-label="X"><FaXTwitter /></a>
          <a className="grid h-7 w-7 place-items-center rounded-full border border-line transition-colors hover:border-brand-green hover:bg-brand-green hover:text-white" href={site.socials.instagram} aria-label="Instagram"><FaInstagram /></a>
          <a className="grid h-7 w-7 place-items-center rounded-full border border-line transition-colors hover:border-brand-green hover:bg-brand-green hover:text-white" href={site.socials.youtube} aria-label="YouTube"><FaYoutube /></a>
          <a className="grid h-7 w-7 place-items-center rounded-full border border-line transition-colors hover:border-brand-green hover:bg-brand-green hover:text-white" href={site.socials.linkedin} aria-label="LinkedIn"><FaLinkedinIn /></a>
        </div>
      </section>
      <section className="mb-[22px] border border-line bg-white/[.24]">
        <div className="grid grid-cols-2 border-b border-line" role="tablist" aria-label="Latest and popular stories">
          <button
            className={`cursor-pointer border-0 border-b-2 bg-transparent p-3 text-[10px] font-extrabold uppercase ${
              tab === "latest" ? "border-brand-green text-brand-green" : "border-transparent text-muted"
            }`}
            type="button"
            onClick={() => setTab("latest")}
          >
            Latest
          </button>
          <button
            className={`cursor-pointer border-0 border-b-2 bg-transparent p-3 text-[10px] font-extrabold uppercase ${
              tab === "popular" ? "border-brand-green text-brand-green" : "border-transparent text-muted"
            }`}
            type="button"
            onClick={() => setTab("popular")}
          >
            Popular
          </button>
        </div>
        <div className="px-3.5 pb-3 pt-[5px]">
          {displayed.map((article, index) => (
            <Link
              className="grid grid-cols-[25px_1fr_74px] items-center gap-[9px] border-b border-[#dedbd1] py-2.5 font-serif text-xs font-semibold leading-[1.15] last:border-b-0"
              key={article.id}
              href={`/${slugify(article.category)}/${article.slug}`}
            >
              <span className="font-serif text-lg text-brand-gold">{String(index + 1).padStart(2, "0")}</span>
              <span>
                {article.title}
                <small className="mt-[5px] block font-sans text-[7px] text-muted">{article.timeAgo}</small>
              </span>
              <Image className="h-[58px] w-[74px] object-cover" src={article.image} alt="" width={74} height={58} />
            </Link>
          ))}
        </div>
      </section>
      {showNewsletter && (
        <section className="mb-[22px] border border-line bg-brand-green px-5 py-[23px] text-white" id="newsletter-sidebar">
          <span className="inline-block font-sans text-[11px] font-bold uppercase tracking-[.075em] text-[#d4c395]">The morning briefing</span>
          <h3 className="my-1.5 font-serif text-[27px]">Start informed.</h3>
          <p className="mb-[15px] text-[11px] text-[#d8dfda]">Our essential guide to the stories shaping the day.</p>
          <NewsletterForm compact />
        </section>
      )}
    </aside>
  );
}
