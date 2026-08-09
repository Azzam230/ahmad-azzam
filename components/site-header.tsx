"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BookingTrigger } from "@/components/booking-trigger";

const NAV_LINKS = [
  { label: "المنظومة", href: "/#systems" },
  { label: "فلسفة العمل", href: "/#philosophy" },
  { label: "أداة النمو", href: "/#audit" },
  { label: "مقالات", href: "/blog" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 220, damping: 24 }}
      className="sticky top-0 z-50 border-b border-zinc-200/80 bg-background/80 backdrop-blur-xl backdrop-saturate-150"
    >
      <div className="container flex h-16 items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink text-sm font-bold text-white">
            ن
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-sm font-bold text-ink">أحمد عزام</span>
            <span className="mt-1 text-[11px] font-light text-zinc-500">
              نمو رقمي وأنظمة ذكية
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-600 transition-all duration-300 ease-in-out hover:text-zinc-950"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <BookingTrigger className="hidden md:inline-flex">
            احجز استشارة
          </BookingTrigger>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {open && (
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="border-t border-zinc-200 bg-white md:hidden"
        >
          <div className="container flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-zinc-100 py-3 text-sm font-medium text-zinc-700 last:border-b-0"
              >
                {link.label}
              </a>
            ))}
            <BookingTrigger className="mt-3 w-full">
              احجز استشارة
            </BookingTrigger>
          </div>
        </motion.nav>
      )}
    </motion.header>
  );
}
