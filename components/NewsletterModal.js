"use client";

import { useEffect, useRef, useState } from "react";
import { FaCheckCircle, FaEnvelopeOpenText, FaTimes } from "react-icons/fa";
import { site } from "@/lib/site";

const PERKS = [
  "One concise digest, every weekday morning",
  "Early access to investigations & long reads",
  "No spam — unsubscribe with a single click",
];

export default function NewsletterModal({ open, onClose }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | error | loading | success
  const dialogRef = useRef(null);
  const inputRef = useRef(null);

  // Reset internal state whenever the modal is (re)opened.
  useEffect(() => {
    if (open) {
      setEmail("");
      setStatus("idle");
      const focusTimer = setTimeout(() => inputRef.current?.focus(), 60);
      return () => clearTimeout(focusTimer);
    }
  }, [open]);

  // Escape-to-close + lock background scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleBackdropClick = (event) => {
    if (dialogRef.current && !dialogRef.current.contains(event.target)) {
      onClose();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = email.trim();

    if (!trimmed) {
      setStatus("error");
      return;
    }
    if (!isValidEmail(trimmed)) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    // Simulate a subscription request. Wire this up to a real
    // endpoint / provider (Mailchimp, ConvertKit, etc.) when ready.
    if (site.newsletterUrl) {
      window.open(`${site.newsletterUrl}?email=${encodeURIComponent(trimmed)}`, "_blank", "noopener,noreferrer");
    }

    setTimeout(() => {
      setStatus("success");
    }, 650);
  };

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-[rgba(9,15,13,.6)] p-4 backdrop-blur-[2px]"
      onMouseDown={handleBackdropClick}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="newsletter-modal-title"
        className="relative w-full max-w-[440px] border border-line-dark bg-cream shadow-[0_30px_80px_rgba(8,16,13,.35)]"
      >
        {/* Header band */}
        <div className="relative overflow-hidden border-b border-[#0d5341] bg-brand-green px-6 pb-6 pt-7 text-cream">
          <div className="pointer-events-none absolute -right-6 -top-8 text-[110px] leading-none text-white/5">
            <FaEnvelopeOpenText />
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close subscribe dialog"
            className="absolute right-3 top-3 grid h-7 w-7 place-items-center border border-white/20 text-cream/80 transition-colors hover:border-white/50 hover:text-white"
          >
            <FaTimes size={12} />
          </button>

          <span className="mb-2 inline-block text-[10px] font-bold uppercase tracking-[.16em] text-brand-gold">
            {site.name} Newsletter
          </span>
          <h2 id="newsletter-modal-title" className="font-serif text-[26px] leading-[1.15]">
            Get the story before everyone else.
          </h2>
          <p className="mt-2 max-w-[360px] font-serif text-[12.5px] leading-[1.6] text-[#cdd8d2]">
            Join our readers and receive the day&apos;s essential headlines, straight from the newsroom.
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {status === "success" ? (
            <div className="grid justify-items-center gap-3 py-4 text-center">
              <FaCheckCircle className="text-[34px] text-brand-green" />
              <p className="font-serif text-[17px] font-semibold text-ink">You&apos;re on the list.</p>
              <p className="max-w-[300px] font-sans text-[12px] leading-[1.6] text-muted">
                A confirmation email is on its way to <span className="font-semibold text-ink">{email}</span>. Welcome to the Chronicle.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-2 inline-flex min-h-[36px] items-center justify-center border border-brand-green bg-brand-green px-5 text-[11px] font-bold tracking-[.02em] text-cream transition-colors hover:bg-brand-green-2"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              <ul className="mb-5 grid gap-2">
                {PERKS.map((perk) => (
                  <li key={perk} className="flex items-start gap-2 font-sans text-[11.5px] leading-[1.5] text-ink/80">
                    <span className="mt-[3px] h-[6px] w-[6px] flex-none rounded-full bg-brand-gold" />
                    {perk}
                  </li>
                ))}
              </ul>

              <form onSubmit={handleSubmit} noValidate>
                <label htmlFor="newsletter-modal-email" className="mb-1.5 block text-[10px] font-bold uppercase tracking-[.08em] text-muted">
                  Email address
                </label>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    id="newsletter-modal-email"
                    ref={inputRef}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    placeholder="you@example.com"
                    aria-invalid={status === "error"}
                    aria-describedby="newsletter-modal-message"
                    className={`h-[42px] min-w-0 flex-1 border bg-white px-3.5 text-[13px] text-ink outline-none transition-colors focus:border-brand-green ${
                      status === "error" ? "border-brand-red" : "border-line"
                    }`}
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex min-h-[42px] flex-none items-center justify-center border border-brand-green bg-brand-green px-5 text-[11px] font-bold tracking-[.02em] text-cream transition-colors hover:bg-brand-green-2 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "loading" ? "Subscribing…" : "Subscribe"}
                  </button>
                </div>
                <p
                  id="newsletter-modal-message"
                  aria-live="polite"
                  className={`mt-2 min-h-[14px] text-[10.5px] ${status === "error" ? "text-brand-red" : "text-muted"}`}
                >
                  {status === "error"
                    ? "Please enter a valid email address to continue."
                    : "We respect your inbox. One email a day, nothing more."}
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}