// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { useEffect, useRef, useState } from "react";
// import {
//   FaBars,
//   FaCloudSun,
//   FaEllipsisH,
//   FaFacebookF,
//   FaInstagram,
//   FaLinkedinIn,
//   FaSearch,
//   FaTimes,
//   FaYoutube,
// } from "react-icons/fa";
// import { FaXTwitter } from "react-icons/fa6";
// import { articles, getAuthor, searchArticles } from "@/lib/content";
// import { categoryHref, site, slugify } from "@/lib/site";
// import NewsTicker from "./NewsTicker";
// import NewsletterModal from "./NewsletterModal";

// export default function Header() {
//   const pathname = usePathname();
//   const router = useRouter();
//   const searchWrap = useRef(null);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [query, setQuery] = useState("");
//   const [dateLabel, setDateLabel] = useState("August 13, 2026");
//   const [newsletterOpen, setNewsletterOpen] = useState(false);

//   useEffect(() => {
//     setDateLabel(
//       new Intl.DateTimeFormat("en-US", {
//         month: "long",
//         day: "numeric",
//         year: "numeric",
//       }).format(new Date()),
//     );
//   }, []);

//   useEffect(() => {
//     const onKey = (event) => {
//       if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
//         event.preventDefault();
//         setSearchOpen(true);
//       }
//       if (event.key === "Escape") {
//         setSearchOpen(false);
//         setMenuOpen(false);
//       }
//     };
//     const onPointer = (event) => {
//       if (searchWrap.current && !searchWrap.current.contains(event.target)) {
//         setSearchOpen(false);
//       }
//     };
//     document.addEventListener("keydown", onKey);
//     document.addEventListener("pointerdown", onPointer);
//     return () => {
//       document.removeEventListener("keydown", onKey);
//       document.removeEventListener("pointerdown", onPointer);
//     };
//   }, []);

//   useEffect(() => {
//     setMenuOpen(false);
//     setSearchOpen(false);
//     setNewsletterOpen(false);
//   }, [pathname]);

//   const results = query ? searchArticles(query).slice(0, 5) : articles.slice(0, 5);
//   const submitSearch = (event) => {
//     event.preventDefault();
//     router.push(`/search?q=${encodeURIComponent(query.trim())}`);
//     setSearchOpen(false);
//   };

//   return (
//     <>
//       <div className="bg-[#0d1210] text-[11px] text-[#f8f4ea]">
//         <div className="mx-auto flex min-h-[32px] w-[min(calc(100%-26px),1280px)] items-center justify-between gap-[18px] sm:w-[min(calc(100%-40px),1280px)]">
//           <div className="flex min-w-0 items-center gap-2.5 [&>*+*]:border-l [&>*+*]:border-l-[#424642] [&>*+*]:pl-2.5 sm:gap-3.5 sm:[&>*+*]:pl-3.5">
//             <time suppressHydrationWarning>{dateLabel}</time>
//             <span>{new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(new Date())}</span>
//           </div>
//           <div className="hidden flex-none items-center gap-2 sm:flex" aria-label="Social media">
//             <a className="grid h-[18px] w-[18px] place-items-center rounded-full text-[10px] text-white" href={site.socials.facebook} aria-label="Facebook"><FaFacebookF /></a>
//             <a className="grid h-[18px] w-[18px] place-items-center rounded-full text-[10px] text-white" href={site.socials.x} aria-label="X"><FaXTwitter /></a>
//             <a className="grid h-[18px] w-[18px] place-items-center rounded-full text-[10px] text-white" href={site.socials.linkedin} aria-label="LinkedIn"><FaLinkedinIn /></a>
//             <a className="grid h-[18px] w-[18px] place-items-center rounded-full text-[10px] text-white" href={site.socials.instagram} aria-label="Instagram"><FaInstagram /></a>
//             <a className="grid h-[18px] w-[18px] place-items-center rounded-full text-[10px] text-white" href={site.socials.youtube} aria-label="YouTube"><FaYoutube /></a>
//           </div>
//         </div>
//       </div>

//       <header className="border-b border-line bg-[rgba(250,248,242,.96)]">
//         <div className="relative mx-auto grid min-h-[84px] w-[min(calc(100%-26px),1280px)] grid-cols-[35px_1fr_35px] items-center border-b border-line sm:w-[min(calc(100%-40px),1280px)] md:min-h-[112px] md:grid-cols-[1fr_2.4fr_1fr]">
//           <div className="hidden items-center gap-[9px] text-brand-green md:flex">
//             <FaCloudSun className="h-[34px] w-[34px] text-brand-gold" />
//             <span className="grid leading-[1.1]">
//               <small className="font-sans text-[9px] text-muted">{site.city}</small>
//               <strong className="font-serif text-2xl leading-none">{site.weather}</strong>
//               <small className="font-sans text-[9px] text-muted">Clear</small>
//             </span>
//           </div>
//           <Link
//             className="col-start-2 grid justify-items-center whitespace-nowrap font-serif uppercase leading-[.84] tracking-[-.045em] text-[27px] sm:text-[38px] md:col-auto md:text-[42px] lg:text-[52px]"
//             href="/"
//             aria-label={`${site.name} home`}
//           >
//             <span className="mb-0.5 text-xs tracking-[.04em] sm:text-[18px]">The</span>
//             <span>Horizon Chronicle</span>
//             <small className="mt-[7px] font-sans text-[6px] normal-case tracking-[.14em] sm:mt-[11px] sm:text-[8px]">{site.tagline}</small>
//           </Link>
//           <div className="relative col-start-3 flex items-center justify-end gap-2 md:col-auto" ref={searchWrap}>
//             <button
//               className="grid h-[30px] w-[30px] place-items-center border-0 bg-transparent md:h-[34px] md:w-[34px]"
//               type="button"
//               aria-label="Search"
//               aria-expanded={searchOpen}
//               onClick={() => setSearchOpen((value) => !value)}
//             >
//               <FaSearch />
//             </button>
//             <button
//               type="button"
//               className="hidden min-h-[34px] cursor-pointer items-center justify-center border border-brand-green bg-brand-green px-4 text-[11px] font-bold tracking-[.02em] text-cream transition-colors hover:bg-brand-green-2 md:inline-flex"
//               onClick={() => setNewsletterOpen(true)}
//             >
//               Subscribe
//             </button>
//             {searchOpen && (
//               <div className="fixed left-[13px] right-[13px] top-[42px] z-50 border border-line-dark bg-cream shadow-[0_18px_50px_rgba(16,27,23,.2)] sm:absolute sm:left-auto sm:right-0 sm:top-[44px] sm:w-[min(480px,calc(100vw-30px))]">
//                 <form className="grid grid-cols-[20px_1fr_auto] items-center gap-2.5 border-b border-line p-[15px]" onSubmit={submitSearch}>
//                   <FaSearch aria-hidden="true" />
//                   <input
//                     autoFocus
//                     className="min-w-0 border-0 bg-transparent outline-none"
//                     type="search"
//                     value={query}
//                     onChange={(event) => setQuery(event.target.value)}
//                     placeholder="Search stories, topics, authors…"
//                     aria-label="Search the Chronicle"
//                   />
//                   <kbd className="border border-line bg-paper-deep px-[5px] py-[3px] text-[9px] text-muted">esc</kbd>
//                 </form>
//                 <div className="px-3.5 pb-3.5 pt-2.5">
//                   <span className="mb-2 block pt-1 text-[9px] font-extrabold uppercase tracking-[.08em] text-muted">
//                     {query ? "Best matches" : "Latest stories"}
//                   </span>
//                   {results.map((article) => (
//                     <Link
//                       key={article.id}
//                       className="grid grid-cols-[72px_1fr] items-center gap-2.5 border-t border-[#e2ded4] py-2 font-serif text-sm font-semibold leading-[1.15] hover:text-brand-green"
//                       href={`/${slugify(article.category)}/${article.slug}`}
//                     >
//                       <Image className="h-[52px] w-[72px] object-cover" src={article.image} alt="" width={72} height={52} />
//                       <span>
//                         <small className="mb-[3px] block font-sans text-[8px] font-bold uppercase text-brand-red">{article.category}</small>
//                         {article.title}
//                       </span>
//                     </Link>
//                   ))}
//                   <button
//                     className="w-full cursor-pointer border border-brand-green bg-transparent p-2.5 text-[10px] font-bold text-brand-green"
//                     type="button"
//                     onClick={() => router.push(`/search?q=${encodeURIComponent(query)}`)}
//                   >
//                     See all results →
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//           <button
//             className="col-start-1 row-start-1 grid h-[30px] w-[30px] place-items-center border-0 bg-transparent text-lg md:hidden"
//             type="button"
//             aria-label={menuOpen ? "Close menu" : "Open menu"}
//             aria-expanded={menuOpen}
//             onClick={() => setMenuOpen((value) => !value)}
//           >
//             {menuOpen ? <FaTimes /> : <FaBars />}
//           </button>
//         </div>
//         <nav
//           className={
//             menuOpen
//               ? "absolute inset-x-0 z-40 block border-b-[3px] border-brand-green bg-cream md:static md:border-0 md:bg-transparent"
//               : "hidden md:block"
//           }
//           aria-label="Main navigation"
//         >
//           <div className="mx-auto grid w-[min(calc(100%-26px),1280px)] grid-cols-2 gap-0 px-[13px] pb-[18px] pt-2.5 text-[13px] font-bold sm:w-[min(calc(100%-40px),1280px)] md:flex md:min-h-[46px] md:w-[min(calc(100%-40px),1280px)] md:grid-cols-none md:items-center md:justify-center md:gap-[clamp(15px,2.1vw,33px)] md:px-0 md:py-0">
//             <FaBars className="mr-auto hidden md:block" aria-hidden="true" />
//             {['Home', 'World', 'Politics', 'Business', 'Finance', 'U.S', 'Technology', 'Science', 'Sports', 'Entertainment', 'Lifestyle', 'Opinion', 'Culture'].map((item) => {
//               const href = categoryHref(item);
//               const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
//               return (
//                 <Link
//                   key={item}
//                   className={`grid min-h-[46px] place-items-start border-b border-line pl-3 md:place-items-center md:border-b-2 md:border-transparent md:pl-0 ${
//                     active ? "md:border-brand-green" : "md:hover:border-brand-green"
//                   }`}
//                   href={href}
//                 >
//                   {item}
//                 </Link>
//               );
//             })}
//             <FaEllipsisH className="hidden md:ml-auto md:block" aria-hidden="true" />
//           </div>
//           <div className="flex items-center gap-3 border-t border-line px-[13px] py-4 md:hidden" aria-label="Social media">
//             <a className="grid h-7 w-7 place-items-center rounded-full border border-line text-[12px] text-ink" href={site.socials.facebook} aria-label="Facebook"><FaFacebookF /></a>
//             <a className="grid h-7 w-7 place-items-center rounded-full border border-line text-[12px] text-ink" href={site.socials.x} aria-label="X"><FaXTwitter /></a>
//             <a className="grid h-7 w-7 place-items-center rounded-full border border-line text-[12px] text-ink" href={site.socials.linkedin} aria-label="LinkedIn"><FaLinkedinIn /></a>
//             <a className="grid h-7 w-7 place-items-center rounded-full border border-line text-[12px] text-ink" href={site.socials.instagram} aria-label="Instagram"><FaInstagram /></a>
//             <a className="grid h-7 w-7 place-items-center rounded-full border border-line text-[12px] text-ink" href={site.socials.youtube} aria-label="YouTube"><FaYoutube /></a>
//           </div>
//         </nav>
//       </header>
//       <NewsTicker />
//       <NewsletterModal open={newsletterOpen} onClose={() => setNewsletterOpen(false)} />
//     </>
//   );
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  FaBars,
  FaCloudSun,
  FaEllipsisH,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaSearch,
  FaTimes,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { articles, getAuthor, searchArticles } from "@/lib/content";
import { categoryHref, site, slugify } from "@/lib/site";
import { fetchCityWeather } from "@/lib/weather";
import NewsTicker from "./NewsTicker";
import NewsletterModal from "./NewsletterModal";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const searchWrap = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [dateLabel, setDateLabel] = useState("August 13, 2026");
  const [newsletterOpen, setNewsletterOpen] = useState(false);
  const [weather, setWeather] = useState({
    temp: site.weather,
    condition: "Clear",
  });

  useEffect(() => {
    setDateLabel(
      new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(new Date()),
    );
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetchCityWeather(site.city)
      .then((data) => {
        if (cancelled) return;
        setWeather({
          temp: `${data.temperature}${data.unit}`,
          condition: data.condition,
        });
      })
      .catch(() => {
        // Keep the static fallback from site.js if the live lookup fails.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === "Escape") {
        setSearchOpen(false);
        setMenuOpen(false);
      }
    };
    const onPointer = (event) => {
      if (searchWrap.current && !searchWrap.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setNewsletterOpen(false);
  }, [pathname]);

  const results = query ? searchArticles(query).slice(0, 5) : articles.slice(0, 5);
  const submitSearch = (event) => {
    event.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    setSearchOpen(false);
  };

  return (
    <>
      <div className="bg-[#0d1210] text-[11px] text-[#f8f4ea]">
        <div className="mx-auto flex min-h-[32px] w-[min(calc(100%-26px),1280px)] items-center justify-between gap-[18px] sm:w-[min(calc(100%-40px),1280px)]">
          <div className="flex min-w-0 items-center gap-2.5 [&>*+*]:border-l [&>*+*]:border-l-[#424642] [&>*+*]:pl-2.5 sm:gap-3.5 sm:[&>*+*]:pl-3.5">
            <time suppressHydrationWarning>{dateLabel}</time>
            <span>{new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(new Date())}</span>
          </div>
          <div className="hidden flex-none items-center gap-2 sm:flex" aria-label="Social media">
            <a className="grid h-[18px] w-[18px] place-items-center rounded-full text-[10px] text-white" href={site.socials.facebook} aria-label="Facebook"><FaFacebookF /></a>
            <a className="grid h-[18px] w-[18px] place-items-center rounded-full text-[10px] text-white" href={site.socials.x} aria-label="X"><FaXTwitter /></a>
            <a className="grid h-[18px] w-[18px] place-items-center rounded-full text-[10px] text-white" href={site.socials.linkedin} aria-label="LinkedIn"><FaLinkedinIn /></a>
            <a className="grid h-[18px] w-[18px] place-items-center rounded-full text-[10px] text-white" href={site.socials.instagram} aria-label="Instagram"><FaInstagram /></a>
            <a className="grid h-[18px] w-[18px] place-items-center rounded-full text-[10px] text-white" href={site.socials.youtube} aria-label="YouTube"><FaYoutube /></a>
          </div>
        </div>
      </div>

      <header className="border-b border-line bg-[rgba(250,248,242,.96)]">
        <div className="relative mx-auto grid min-h-[84px] w-[min(calc(100%-26px),1280px)] grid-cols-[35px_1fr_35px] items-center border-b border-line sm:w-[min(calc(100%-40px),1280px)] md:min-h-[112px] md:grid-cols-[1fr_2.4fr_1fr]">
          <div className="hidden items-center gap-[9px] text-brand-green md:flex">
            <FaCloudSun className="h-[34px] w-[34px] text-brand-gold" />
            <span className="grid leading-[1.1]">
              <small className="font-sans text-[9px] text-muted">{site.city}</small>
              <strong className="font-serif text-2xl leading-none">{weather.temp}</strong>
              <small className="font-sans text-[9px] text-muted">{weather.condition}</small>
            </span>
          </div>
          <Link
            className="col-start-2 grid justify-items-center whitespace-nowrap font-serif uppercase leading-[.84] tracking-[-.045em] text-[27px] sm:text-[38px] md:col-auto md:text-[42px] lg:text-[52px]"
            href="/"
            aria-label={`${site.name} home`}
          >
            <span className="mb-0.5 text-xs tracking-[.04em] sm:text-[18px]">The</span>
            <span>Horizon Chronicle</span>
            <small className="mt-[7px] font-sans text-[6px] normal-case tracking-[.14em] sm:mt-[11px] sm:text-[8px]">{site.tagline}</small>
          </Link>
          <div className="relative col-start-3 flex items-center justify-end gap-2 md:col-auto" ref={searchWrap}>
            <button
              className="grid h-[30px] w-[30px] place-items-center border-0 bg-transparent md:h-[34px] md:w-[34px]"
              type="button"
              aria-label="Search"
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen((value) => !value)}
            >
              <FaSearch />
            </button>
            <button
              type="button"
              className="hidden min-h-[34px] cursor-pointer items-center justify-center border border-brand-green bg-brand-green px-4 text-[11px] font-bold tracking-[.02em] text-cream transition-colors hover:bg-brand-green-2 md:inline-flex"
              onClick={() => setNewsletterOpen(true)}
            >
              Subscribe
            </button>
            {searchOpen && (
              <div className="fixed left-[13px] right-[13px] top-[42px] z-50 border border-line-dark bg-cream shadow-[0_18px_50px_rgba(16,27,23,.2)] sm:absolute sm:left-auto sm:right-0 sm:top-[44px] sm:w-[min(480px,calc(100vw-30px))]">
                <form className="grid grid-cols-[20px_1fr_auto] items-center gap-2.5 border-b border-line p-[15px]" onSubmit={submitSearch}>
                  <FaSearch aria-hidden="true" />
                  <input
                    autoFocus
                    className="min-w-0 border-0 bg-transparent outline-none"
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search stories, topics, authors…"
                    aria-label="Search the Chronicle"
                  />
                  <kbd className="border border-line bg-paper-deep px-[5px] py-[3px] text-[9px] text-muted">esc</kbd>
                </form>
                <div className="px-3.5 pb-3.5 pt-2.5">
                  <span className="mb-2 block pt-1 text-[9px] font-extrabold uppercase tracking-[.08em] text-muted">
                    {query ? "Best matches" : "Latest stories"}
                  </span>
                  {results.map((article) => (
                    <Link
                      key={article.id}
                      className="grid grid-cols-[72px_1fr] items-center gap-2.5 border-t border-[#e2ded4] py-2 font-serif text-sm font-semibold leading-[1.15] hover:text-brand-green"
                      href={`/${slugify(article.category)}/${article.slug}`}
                    >
                      <Image className="h-[52px] w-[72px] object-cover" src={article.image} alt="" width={72} height={52} />
                      <span>
                        <small className="mb-[3px] block font-sans text-[8px] font-bold uppercase text-brand-red">{article.category}</small>
                        {article.title}
                      </span>
                    </Link>
                  ))}
                  <button
                    className="w-full cursor-pointer border border-brand-green bg-transparent p-2.5 text-[10px] font-bold text-brand-green"
                    type="button"
                    onClick={() => router.push(`/search?q=${encodeURIComponent(query)}`)}
                  >
                    See all results →
                  </button>
                </div>
              </div>
            )}
          </div>
          <button
            className="col-start-1 row-start-1 grid h-[30px] w-[30px] place-items-center border-0 bg-transparent text-lg md:hidden"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <nav
          className={
            menuOpen
              ? "absolute inset-x-0 z-40 block border-b-[3px] border-brand-green bg-cream md:static md:border-0 md:bg-transparent"
              : "hidden md:block"
          }
          aria-label="Main navigation"
        >
          <div className="mx-auto grid w-[min(calc(100%-26px),1280px)] grid-cols-2 gap-0 px-[13px] pb-[18px] pt-2.5 text-[13px] font-bold sm:w-[min(calc(100%-40px),1280px)] md:flex md:min-h-[46px] md:w-[min(calc(100%-40px),1280px)] md:grid-cols-none md:items-center md:justify-center md:gap-[clamp(15px,2.1vw,33px)] md:px-0 md:py-0">
            <FaBars className="mr-auto hidden md:block" aria-hidden="true" />
            {['Home', 'World', 'Politics', 'Business', 'Finance', 'U.S', 'Technology', 'Science', 'Sports', 'Entertainment', 'Lifestyle', 'Opinion', 'Culture'].map((item) => {
              const href = categoryHref(item);
              const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <Link
                  key={item}
                  className={`grid min-h-[46px] place-items-start border-b border-line pl-3 md:place-items-center md:border-b-2 md:border-transparent md:pl-0 ${
                    active ? "md:border-brand-green" : "md:hover:border-brand-green"
                  }`}
                  href={href}
                >
                  {item}
                </Link>
              );
            })}
            <FaEllipsisH className="hidden md:ml-auto md:block" aria-hidden="true" />
          </div>
          <div className="flex items-center gap-3 border-t border-line px-[13px] py-4 md:hidden" aria-label="Social media">
            <a className="grid h-7 w-7 place-items-center rounded-full border border-line text-[12px] text-ink" href={site.socials.facebook} aria-label="Facebook"><FaFacebookF /></a>
            <a className="grid h-7 w-7 place-items-center rounded-full border border-line text-[12px] text-ink" href={site.socials.x} aria-label="X"><FaXTwitter /></a>
            <a className="grid h-7 w-7 place-items-center rounded-full border border-line text-[12px] text-ink" href={site.socials.linkedin} aria-label="LinkedIn"><FaLinkedinIn /></a>
            <a className="grid h-7 w-7 place-items-center rounded-full border border-line text-[12px] text-ink" href={site.socials.instagram} aria-label="Instagram"><FaInstagram /></a>
            <a className="grid h-7 w-7 place-items-center rounded-full border border-line text-[12px] text-ink" href={site.socials.youtube} aria-label="YouTube"><FaYoutube /></a>
          </div>
        </nav>
      </header>
      <NewsTicker />
      <NewsletterModal open={newsletterOpen} onClose={() => setNewsletterOpen(false)} />
    </>
  );
}