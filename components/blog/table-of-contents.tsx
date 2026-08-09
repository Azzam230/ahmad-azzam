"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ListOrdered } from "lucide-react";
import type { Heading } from "@/lib/article";
import { cn } from "@/lib/utils";

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );
    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      aria-label="محتويات المقال"
      className="sticky top-24 rounded-2xl border border-zinc-200 bg-white/70 p-5 backdrop-blur-md"
    >
      <div className="flex items-center gap-2">
        <ListOrdered className="h-4 w-4 text-emerald-600" />
        <p className="text-xs font-black uppercase tracking-widest text-ink">
          محتويات المقال
        </p>
      </div>
      <ul className="mt-4 space-y-1">
        {headings.map((heading) => (
          <li key={heading.id}>
            <button
              type="button"
              onClick={() => scrollTo(heading.id)}
              className={cn(
                "block w-full rounded-lg px-3 py-2 text-start text-sm leading-relaxed transition-colors duration-300 ease-in-out",
                heading.level === 3 && "ps-6",
                activeId === heading.id
                  ? "bg-emerald-50 font-bold text-emerald-700"
                  : "font-light text-zinc-500 hover:bg-zinc-50 hover:text-ink"
              )}
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
