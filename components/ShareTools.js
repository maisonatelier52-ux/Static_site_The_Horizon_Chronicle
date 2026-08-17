"use client";

import { useEffect, useState } from "react";
import {
  FaCheck,
  FaCopy,
  FaEnvelope,
  FaFacebookF,
  FaLinkedinIn,
  FaPinterestP,
  FaShareAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const iconButtonClass =
  "grid h-7 w-7 cursor-pointer place-items-center rounded-full border border-line bg-transparent text-[11px] text-brand-green transition-colors hover:border-brand-green hover:bg-brand-green hover:text-white";

export default function ShareTools({ title, image }) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  useEffect(() => setUrl(window.location.href), []);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const open = (target) => window.open(target, "share", "width=720,height=560,noopener,noreferrer");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const input = document.createElement("textarea");
      input.value = url;
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };
  const nativeShare = async () => {
    try {
      if (navigator.share) await navigator.share({ title, url });
      else await copy();
    } catch (error) {
      if (error?.name !== "AbortError") await copy();
    }
  };

  return (
    <div className="relative flex flex-wrap items-center gap-1.5">
      <span className="mr-[3px] text-[9px] font-extrabold uppercase text-muted">Share</span>
      <button className={iconButtonClass} type="button" onClick={nativeShare} aria-label="Share this article"><FaShareAlt /></button>
      <button className={iconButtonClass} type="button" onClick={() => open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`)} aria-label="Share on Facebook"><FaFacebookF /></button>
      <button className={iconButtonClass} type="button" onClick={() => open(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`)} aria-label="Share on X"><FaXTwitter /></button>
      <button className={iconButtonClass} type="button" onClick={() => open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`)} aria-label="Share on LinkedIn"><FaLinkedinIn /></button>
      <button className={iconButtonClass} type="button" onClick={() => open(`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`)} aria-label="Share on WhatsApp"><FaWhatsapp /></button>
      <button className={iconButtonClass} type="button" onClick={() => open(`https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodeURIComponent(image)}&description=${encodedTitle}`)} aria-label="Share on Pinterest"><FaPinterestP /></button>
      <a className={iconButtonClass} href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`} aria-label="Share by email"><FaEnvelope /></a>
      <button className={iconButtonClass} type="button" onClick={copy} aria-label="Copy article link">{copied ? <FaCheck /> : <FaCopy />}</button>
      {copied && <small className="absolute right-0 top-[34px] bg-brand-green px-1.5 py-[3px] text-[7px] text-white" role="status">Copied</small>}
    </div>
  );
}
