"use client";

import { useState } from "react";
import { site } from "@/lib/site";

export default function NewsletterForm({ compact = false }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const submit = (event) => {
    event.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("error");
      return;
    }
    if (site.newsletterUrl) {
      window.open(`${site.newsletterUrl}?email=${encodeURIComponent(email)}`, "_blank", "noopener,noreferrer");
    }
    setStatus("success");
    setEmail("");
  };

  return (
    <form onSubmit={submit} noValidate>
      <div className="grid grid-cols-1 gap-2">
        <input
          aria-label="Email address"
          className="min-w-0 border border-line bg-cream px-3 py-2.5 text-xs outline-brand-green text-black"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setStatus("idle");
          }}
          placeholder="Enter your email address"
        />
        <button
          className="inline-flex min-h-[34px] cursor-pointer items-center justify-center border border-brand-green bg-brand-green px-4 text-[11px] font-bold tracking-[.02em] text-cream transition-colors hover:bg-brand-green-2"
          type="submit"
        >
          Subscribe
        </button>
      </div>
      <small
        className={`mt-[7px] block min-h-[13px] text-[9px] ${
          status === "error" ? "text-brand-red" : compact ? "text-[#c7d0cb]" : "text-muted"
        }`}
        aria-live="polite"
      >
        {status === "success"
          ? "You’re on the list. Welcome to the Chronicle."
          : status === "error"
            ? "Please enter a valid email address."
            : ""}
      </small>
    </form>
  );
}