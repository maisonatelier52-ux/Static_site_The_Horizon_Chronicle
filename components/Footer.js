// "use client";

// import Link from "next/link";
// import { FaChevronUp, FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
// import { FaXTwitter } from "react-icons/fa6";
// import { categories } from "@/lib/content";
// import { site, slugify } from "@/lib/site";

// export default function Footer() {
//   const policies = [
//     ["About us", "/about"],
//     ["Contact us", "/contact"],
//     ["Editorial policy", "/editorial-policy"],
//     ["Corrections", "/corrections-policy"],
//     ["Privacy policy", "/privacy-policy"],
//     ["Terms of use", "/terms-and-conditions"],
//   ];
//   const resources = [
//     ["Source methodology", "/source-methodology"],
//     ["Ownership & funding", "/ownership-funding"],
//     ["Right of reply", "/right-of-reply"],
//     ["Advertising", "/advertising-policy"],
//     ["Legal", "/legal"],
//     ["Sitemap", "/sitemap.xml"],
//   ];

//   return (
//     <footer className="border-t-[5px] border-[#bfa66f] bg-brand-green text-[#dce3df]">
//       <div className="mx-auto grid w-[min(calc(100%-26px),1280px)] grid-cols-1 gap-[30px] pb-[35px] pt-[45px] sm:w-[min(calc(100%-40px),1280px)] sm:grid-cols-2 sm:gap-[55px] md:grid-cols-[2fr_1fr_1fr_1fr]">
//         <div className="col-span-1 sm:col-span-2 md:col-span-1">
//           <Link className="block font-serif text-[30px] uppercase leading-none text-white" href="/">
//             <span className="align-top text-[13px]">The</span> Horizon Chronicle
//           </Link>
//           <p className="max-w-[340px] font-serif text-xs leading-[1.6] text-[#bfcac4]">
//             Independent journalism, considered context, and clear explanations for readers navigating a changing world.
//           </p>
//           <div className="mt-2 flex items-center gap-2">
//             <a className="grid h-7 w-7 place-items-center rounded-full border border-[#5d7e72] text-white transition-colors hover:bg-white/10" href={site.socials.facebook} aria-label="Facebook"><FaFacebookF /></a>
//             <a className="grid h-7 w-7 place-items-center rounded-full border border-[#5d7e72] text-white transition-colors hover:bg-white/10" href={site.socials.x} aria-label="X"><FaXTwitter /></a>
//             <a className="grid h-7 w-7 place-items-center rounded-full border border-[#5d7e72] text-white transition-colors hover:bg-white/10" href={site.socials.instagram} aria-label="Instagram"><FaInstagram /></a>
//             <a className="grid h-7 w-7 place-items-center rounded-full border border-[#5d7e72] text-white transition-colors hover:bg-white/10" href={site.socials.youtube} aria-label="YouTube"><FaYoutube /></a>
//             <a className="grid h-7 w-7 place-items-center rounded-full border border-[#5d7e72] text-white transition-colors hover:bg-white/10" href={site.socials.linkedin} aria-label="LinkedIn"><FaLinkedinIn /></a>
//           </div>
//         </div>
//         <div>
//           <h3 className="mb-3 font-sans text-[10px] font-bold uppercase tracking-[.08em] text-[#d7c89d]">Sections</h3>
//           <ul className="m-0 list-none p-0">
//             {categories.slice(0, 6).map((category) => (
//               <li className="py-[3px] font-serif text-[11px] text-[#bdcac4]" key={category}>
//                 <Link className="hover:text-white hover:underline" href={`/${slugify(category)}`}>{category}</Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div>
//           <h3 className="mb-3 font-sans text-[10px] font-bold uppercase tracking-[.08em] text-[#d7c89d]">Company</h3>
//           <ul className="m-0 list-none p-0">
//             {policies.map(([label, href]) => (
//               <li className="py-[3px] font-serif text-[11px] text-[#bdcac4]" key={href}>
//                 <Link className="hover:text-white hover:underline" href={href}>{label}</Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div>
//           <h3 className="mb-3 font-sans text-[10px] font-bold uppercase tracking-[.08em] text-[#d7c89d]">Resources</h3>
//           <ul className="m-0 list-none p-0">
//             {resources.map(([label, href]) => (
//               <li className="py-[3px] font-serif text-[11px] text-[#bdcac4]" key={href}>
//                 <Link className="hover:text-white hover:underline" href={href}>{label}</Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//       <div className="mx-auto flex min-h-[70px] w-[min(calc(100%-26px),1280px)] flex-wrap items-center justify-between gap-2.5 border-t border-[#42675a] text-[8px] text-[#9cb1a8] sm:w-[min(calc(100%-40px),1280px)] md:min-h-[44px] md:flex-nowrap">
//         <span>© 2026 {site.name}. Demo editorial content.</span>
//         <span>Made with integrity & independence.</span>
//         <button
//           className="grid h-7 w-7 cursor-pointer place-items-center border border-[#5d7e72] bg-transparent text-white"
//           type="button"
//           onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//           aria-label="Back to top"
//         >
//           <FaChevronUp />
//         </button>
//       </div>
//     </footer>
//   );
// }


"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaChevronUp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { categories } from "@/lib/content";
import { site, slugify } from "@/lib/site";

export default function Footer() {

  const quickLinks = [
    ["Latest News", "/latest-news"],
    ["Most Read", "/most-read"],
    ["Trending Now", "/trending"],
    ["Editor's Picks", "/editors-picks"],
    ["Videos", "/videos"],
    ["Podcasts", "/podcasts"],
  ];

  const aboutLinks = [
    ["About The Horizon Chronicle", "/about"],
    ["Our Team", "/team"],
    ["Editorial Policy", "/editorial-policy"],
    ["Corrections Policy", "/corrections-policy"],
    ["Source Methodology", "/source-methodology"],
    ["Ownership & Funding", "/ownership-funding"],
    ["Contact Us", "/contact"],
  ];


  return (
    <footer className="relative overflow-hidden border-t-[2px] border-[#bfa66f] bg-[#002d24] text-[#d8ddd9]">

      {/* Capitol Watermark */}
      <div className="hidden md:block absolute bottom-20 left-10 opacity-[0.12] pointer-events-none">
        <img
          src="/images/capitol-gold1.png"
          className="w-[190px]"
          alt=""
        />
      </div>


      <div className="relative mx-auto grid w-[min(calc(100%-40px),1280px)] grid-cols-1 gap-10 py-12 md:grid-cols-[2fr_1fr_1fr_1.3fr_1fr]">


        {/* BRAND */}
        <div>

          <Link
            href="/"
            className="font-serif text-[28px] uppercase leading-none text-white"
          >
            <span className="block text-[11px] tracking-[3px] text-[#cdb87b]">
              THE
            </span>

            Horizon Chronicle
          </Link>


          <p className="mt-4 max-w-[280px] font-serif text-[12px] leading-[1.7] text-[#b7c5bf]">
            Independent journalism, considered context, and clear explanations
            for readers navigating a changing world.
          </p>


          <div className="mt-5 flex gap-3">

            {
              [
                [FaFacebookF, site.socials.facebook],
                [FaXTwitter, site.socials.x],
                [FaInstagram, site.socials.instagram],
                [FaYoutube, site.socials.youtube],
                [FaLinkedinIn, site.socials.linkedin],
              ].map(([Icon,url],i)=>(
                <a
                  key={i}
                  href={url}
                  className="grid h-7 w-7 place-items-center border border-[#607d73] text-white transition hover:bg-[#bfa66f] hover:text-black"
                >
                  <Icon size={12}/>
                </a>
              ))
            }

          </div>


        </div>



        {/* SECTIONS */}
        <div>

          <h4 className="mb-4 text-[10px] font-bold uppercase tracking-[2px] text-[#d8c78e]">
            Sections
          </h4>

          {
            categories.slice(0,6).map(item=>(
              <Link
                key={item}
                href={`/${slugify(item)}`}
                className="block py-[3px] font-serif text-[12px] text-[#bac8c2] hover:text-white"
              >
                {item}
              </Link>
            ))
          }

        </div>



        {/* QUICK LINKS */}
        <div>

          <h4 className="mb-4 text-[10px] font-bold uppercase tracking-[2px] text-[#d8c78e]">
            Quick Links
          </h4>


          {
            quickLinks.map(([name,url])=>(
              <Link
                key={name}
                href={url}
                className="block py-[3px] font-serif text-[12px] text-[#bac8c2] hover:text-white"
              >
                {name}
              </Link>
            ))
          }

        </div>




        {/* ABOUT */}
        <div>

          <h4 className="mb-4 text-[10px] font-bold uppercase tracking-[2px] text-[#d8c78e]">
            About Us
          </h4>


          {
            aboutLinks.map(([name,url])=>(
              <Link
                key={name}
                href={url}
                className="block py-[3px] font-serif text-[12px] text-[#bac8c2] hover:text-white"
              >
                {name}
              </Link>
            ))
          }

        </div>



        {/* NEWSLETTER */}
        <div>


          <h4 className="mb-4 text-[10px] font-bold uppercase tracking-[2px] text-[#d8c78e]">
            Newsletter
          </h4>


          <p className="font-serif text-[12px] leading-5 text-[#b7c5bf]">
            Stay informed with our quick digest delivered to your inbox.
          </p>


          <input
            placeholder="Enter your email"
            className="mt-4 h-8 w-full px-3 text-[11px] text-black outline-none"
          />


          <button className="mt-3 w-full bg-[#d1bd82] py-2 text-[11px] font-semibold text-black">
            Subscribe
          </button>


          <div className="mt-4 text-center">

            <div className="text-[#d1bd82]">
              ✦
            </div>

            <div className="font-serif text-[10px] sm:text-[17px]">
              18°C
            </div>

            <p className="text-[8px] sm:text-[10px]">
              New York, US
              <br/>
              Aug 17, 2026
            </p>

          </div>


        </div>



      </div>




      {/* Bottom */}

      <div className="border-t border-[#35574d]">

        <div className="mx-auto flex w-[min(calc(100%-40px),1280px)] flex-wrap justify-between gap-4 py-5 text-[10px] text-[#9db0a8]">


          <div>
            <Link href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
            <span className="mx-2">|</span>

            <Link href="/terms-conditions" className="hover:underline">
              Terms & Conditions
            </Link>
            <span className="mx-2">|</span>

            <Link href="/cookie-policy" className="hover:underline">
              Cookie Policy
            </Link>
            <span className="mx-2">|</span>

            <Link href="/advertise-with-us" className="hover:underline">
              Advertise With Us
            </Link>
            <span className="mx-2">|</span>

            <Link href="/right-of-reply" className="hover:underline">
              Right of Reply
            </Link>
          </div>


          <div>
            © 2026 The Horizon Chronicle. All rights reserved.
          </div>


        </div>

      </div>


    </footer>
  );
}