"use client";

import { Bot, MousePointerClick, TrendingUp, Filter } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { cardMotionProps } from "@/components/motion";

const SYSTEMS = [
  {
    icon: MousePointerClick,
    title: "واجهات تجلب المبيعات",
    subtitle: "High-Conversion Web",
    description:
      "تصميم مواقع سريعة وسهلة تُحوّل الزوار إلى عملاء فعليين.",
  },
  {
    icon: TrendingUp,
    title: "التصدر في Google والذكاء الاصطناعي",
    subtitle: "SEO & AI Search",
    description:
      "الظهور المباشر عندما يبحث العميل عن خدمتك في Search أو ChatGPT.",
  },
  {
    icon: Bot,
    title: "أتمتة المتابعة والواتساب",
    subtitle: "WhatsApp Automation",
    description:
      "رد أوتوماتيكي ومتابعة فورية للعملاء دون الحاجة لتدخل يدوي مستمر.",
  },
  {
    icon: Filter,
    title: "استراتيجية النمو الرقمي",
    subtitle: "Growth Strategy",
    description:
      "خطة عمل واضحة تحدّد مسار العميل وتضاعف عائد الاستثمار.",
  },
];

export function GrowthSystems() {
  return (
    <section id="systems" className="scroll-mt-16">
      <div className="container py-20 lg:py-28">
        <SectionHeading
          index="03"
          kicker="أركان المنظومة"
          title="أربعة أركان تصنع نمواً لا يهدأ"
          description="لا يعمل أي ركن بمعزل عن الآخر؛ المنظومة متكاملة تبدأ من الاستراتيجية وتنتهي بالأتمتة."
        />

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-200 shadow-card sm:grid-cols-2 lg:grid-cols-4">
          {SYSTEMS.map((system, index) => (
            <motion.article
              key={system.title}
              {...cardMotionProps}
              className="group flex flex-col bg-white p-6 transition-colors duration-300 ease-in-out hover:bg-emerald-50/60 lg:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-light tracking-widest text-zinc-300">
                  0{index + 1}
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-all duration-300 ease-in-out group-hover:bg-emerald-600 group-hover:text-white">
                  <system.icon className="h-5 w-5" />
                </span>
              </div>

              <h3 className="mt-10 font-display text-lg font-semibold leading-snug text-ink">
                {system.title}
              </h3>
              <p className="mt-1 text-[11px] font-light uppercase tracking-wider text-zinc-400">
                {system.subtitle}
              </p>
              <p className="mt-4 text-sm font-normal leading-relaxed text-zinc-500">
                {system.description}
              </p>

              <a
                href="#audit"
                className="mt-8 inline-flex items-center gap-1.5 border-t border-zinc-200 pt-4 text-xs font-semibold text-zinc-400 transition-all duration-300 ease-in-out group-hover:text-emerald-600"
              >
                قِس جاهزية هذا الركن
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
