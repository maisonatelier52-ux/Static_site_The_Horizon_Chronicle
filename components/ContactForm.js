"use client";

import { useState } from "react";

const fieldInputClass =
  "w-full resize-y border border-line-dark bg-cream px-3 py-3 text-[13px] font-normal normal-case outline-brand-green";
const fieldLabelClass = "grid gap-[7px] text-[10px] font-extrabold uppercase text-brand-green";

export default function ContactForm() {
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});

  const submit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nextErrors = {};
    if (!data.get("name")?.trim()) nextErrors.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(data.get("email") || "")) nextErrors.email = "Enter a valid email address.";
    if ((data.get("message") || "").trim().length < 20) nextErrors.message = "Please include at least 20 characters.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setStatus("success");
    event.currentTarget.reset();
  };

  return (
    <form className="mt-[25px] grid gap-[15px]" onSubmit={submit} noValidate>
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <label className={fieldLabelClass}>Name<input className={fieldInputClass} name="name" type="text" aria-describedby="name-error" /></label>
        <label className={fieldLabelClass}>Email<input className={fieldInputClass} name="email" type="email" aria-describedby="email-error" /></label>
      </div>
      <div className="grid min-h-[10px] grid-cols-1 gap-3.5 text-[9px] text-brand-red sm:grid-cols-2">
        <span id="name-error">{errors.name}</span>
        <span id="email-error">{errors.email}</span>
      </div>
      <label className={fieldLabelClass}>Topic
        <select className={fieldInputClass} name="topic" defaultValue="News tip">
          <option>News tip</option><option>Correction</option><option>Subscription</option><option>Advertising</option><option>General inquiry</option>
        </select>
      </label>
      <label className={fieldLabelClass}>Message<textarea className={fieldInputClass} name="message" rows="7" aria-describedby="message-error" /></label>
      <span id="message-error" className="m-0 min-h-[12px] text-[9px] text-brand-red">{errors.message}</span>
      <button
        className="inline-flex min-h-[34px] w-max cursor-pointer items-center justify-center border border-brand-green bg-brand-green px-4 text-[11px] font-bold tracking-[.02em] text-cream transition-colors hover:bg-brand-green-2"
        type="submit"
      >
        Send message
      </button>
      <p className="m-0 min-h-[12px] text-[9px] text-brand-green" aria-live="polite">{status === "success" ? "Thank you. Your message has been received for this demo." : ""}</p>
    </form>
  );
}
