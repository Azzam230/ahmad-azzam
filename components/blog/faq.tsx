"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FaqItem {
  q: string;
  a: string;
}

export function Faq({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section aria-label="الأسئلة الشائعة" className="my-8">
      <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
        الأسئلة الشائعة
      </h2>
      <div className="mt-6 divide-y divide-zinc-200 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-card">
        {items.map((item, index) => {
          const open = openIndex === index;
          return (
            <div key={item.q}>
              <button
                type="button"
                onClick={() => setOpenIndex(open ? null : index)}
                aria-expanded={open}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-start transition-colors duration-300 ease-in-out hover:bg-zinc-50 sm:px-6"
              >
                <span className="text-sm font-bold leading-relaxed text-ink sm:text-base">
                  {item.q}
                </span>
                <motion.span
                  animate={{ rotate: open ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="shrink-0 text-zinc-400"
                >
                  <ChevronDown className="h-5 w-5" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className={cn("overflow-hidden")}
                  >
                    <p className="px-5 pb-6 text-sm leading-relaxed text-zinc-600 sm:px-6 sm:text-base">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
