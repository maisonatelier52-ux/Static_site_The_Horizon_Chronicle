"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function FaqAccordion({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="border-b border-line-dark">
      {items.map((item, index) => (
        <div className="border-t border-line-dark" key={item.question}>
          <button
            className="flex w-full cursor-pointer items-center justify-between border-0 bg-transparent py-[17px] text-left font-serif text-[17px] font-bold"
            type="button"
            onClick={() => setOpen(open === index ? -1 : index)}
            aria-expanded={open === index}
          >
            {item.question}
            <FaChevronDown className={`transition-transform duration-200 ${open === index ? "rotate-180" : ""}`} />
          </button>
          {open === index && <p className="-mt-1 mb-[18px] text-xs text-muted">{item.answer}</p>}
        </div>
      ))}
    </div>
  );
}
