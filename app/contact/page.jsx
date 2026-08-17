import Link from "next/link";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import ContactForm from "@/components/ContactForm";
import FaqAccordion from "@/components/FaqAccordion";
import { site } from "@/lib/site";

export const metadata = { title: "Contact", description: `Contact the ${site.name} newsroom, corrections desk, subscriptions, or advertising team.` };

const faqs = [
  { question: "How do I submit a confidential news tip?", answer: "Use the form and choose News tip. For a real deployment, replace this demonstration workflow with a secured encrypted channel before collecting sensitive material." },
  { question: "How can I request a correction?", answer: "Choose Correction and include the article URL, the statement you believe is inaccurate, and the strongest available evidence. We review substantive requests promptly." },
  { question: "Can I republish an article?", answer: "Headlines may be linked with attribution. Full republication requires written permission. Contact the newsroom with the title and intended use." },
  { question: "Does advertising influence coverage?", answer: "No. Commercial and editorial work are separated, and advertisers cannot preview, assign, or suppress newsroom coverage." },
];

export default function ContactPage() {
  return (
    <main className="mx-auto w-[min(calc(100%-26px),1280px)] pb-[70px] sm:w-[min(calc(100%-40px),1280px)]">
      <header className="max-w-[850px] pb-9 pt-9 md:pt-[55px]">
        <span className="inline-block font-sans text-[11px] font-bold uppercase tracking-[.075em] text-brand-green-2">Contact</span>
        <h1 className="my-2.5 font-serif text-[49px] font-bold leading-[.95] md:text-[65px]">Talk to the newsroom.</h1>
        <p className="max-w-[660px] font-serif text-lg leading-[1.55] text-[#525a55]">Send a news tip, request a correction, ask about a subscription, or get in touch with our team.</p>
      </header>
      <div className="grid grid-cols-1 gap-8 border-t-[3px] border-double border-ink pt-8 md:grid-cols-[1.45fr_.75fr] md:gap-[70px]">
        <section>
          <h2 className="mb-1.5 font-serif text-[35px]">Send a message</h2>
          <p className="text-xs text-muted">Fields marked by their labels are required. This starter simulates a successful submission and is ready for your preferred form service.</p>
          <ContactForm />
        </section>
        <aside className="bg-[#ece9e0] p-6">
          <div className="grid grid-cols-[28px_1fr] gap-2.5 border-b border-line py-[15px] text-brand-gold">
            <FaEnvelope />
            <span className="grid font-serif text-sm text-ink"><small className="mb-[3px] font-sans text-[8px] uppercase text-muted">General inquiries</small><a href={`mailto:${site.email}`}>{site.email}</a></span>
          </div>
          <div className="grid grid-cols-[28px_1fr] gap-2.5 border-b border-line py-[15px] text-brand-gold">
            <FaPhone />
            <span className="grid font-serif text-sm text-ink"><small className="mb-[3px] font-sans text-[8px] uppercase text-muted">Newsroom desk</small><a href="tel:+12125550143">+1 212 555 0143</a></span>
          </div>
          <div className="grid grid-cols-[28px_1fr] gap-2.5 border-b border-line py-[15px] text-brand-gold">
            <FaMapMarkerAlt />
            <span className="grid font-serif text-sm text-ink"><small className="mb-[3px] font-sans text-[8px] uppercase text-muted">Correspondence</small>{site.city}</span>
          </div>
          <div className="mt-[25px] bg-brand-green p-5 text-white">
            <h3 className="mb-[7px] font-serif text-[22px]">Before sending a sensitive tip</h3>
            <p className="text-[10px] text-[#d8e0db]">Do not use this demonstration form for confidential material until you connect and secure a production submission service.</p>
            <Link className="text-[9px] font-bold text-[#dccb9d]" href="/source-methodology">How we protect sources →</Link>
          </div>
        </aside>
      </div>
      <section className="mx-auto mt-[65px] max-w-[850px]">
        <span className="inline-block font-sans text-[11px] font-bold uppercase tracking-[.075em] text-brand-green-2">Common questions</span>
        <h2 className="mb-5 mt-1.5 font-serif text-[38px]">Frequently asked</h2>
        <FaqAccordion items={faqs} />
      </section>
    </main>
  );
}
