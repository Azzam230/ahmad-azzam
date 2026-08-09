"use client";

import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { BookingTrigger } from "@/components/booking-trigger";
import { Reveal, APPLE_EASE } from "@/components/motion";
import { cn } from "@/lib/utils";

const STATS = [
  { value: "+38%", label: "متوسط رفع معدل التحويل" },
  { value: "+120%", label: "نمو الزيارات العضوية" },
  { value: "-70%", label: "من التكاليف التشغيلية اليدوية" },
];

export function Hero() {
  return (
    <section id="top" className="border-b border-zinc-200">
      <div className="container grid gap-12 py-16 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-8">
          <Reveal>
            <Badge variant="emerald">
              <span className="text-emerald-600">✦</span> استشارات النمو الرقمي
              والأنظمة الذكية
            </Badge>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-7 text-balance font-display text-4xl font-black leading-[1.2] tracking-tight text-ink sm:text-5xl lg:text-[3.5rem] lg:leading-[1.15]">
              نصمّم موقعك ونربط مبيعاتك بالذكاء الاصطناعي... ليجلب لك{" "}
              <span className="text-emerald-600">عملاء حقيقيين</span> بدلاً من
              المصاريف الفارغة.
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-7 max-w-xl text-lg font-light leading-relaxed text-zinc-600">
              بدلاً من الضياع بين مبرمج لا يفهم المبيعات ومسوق يجمع لك
              المشاهدات فقط؛ نبني لك نظاماً رقمياً متكاملاً من الواجهة حتى إغلاق
              الصفقة.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-card sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row">
                <BookingTrigger size="lg">
                  احجز جلسة استراتيجية
                </BookingTrigger>
                <a
                  href="#audit"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "no-underline"
                  )}
                >
                  افحص مؤشر نمو موقعك
                  <ArrowLeft className="rtl:rotate-0 ltr:rotate-180" />
                </a>
              </div>
              <p className="text-xs font-medium text-zinc-500">
                جلسة تمهيدية مجانية · دون أي التزام
              </p>
            </div>
          </Reveal>
        </div>

        <motion.aside
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: APPLE_EASE }}
          className="lg:col-span-4"
        >
          <div className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-white shadow-card">
            <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4">
              <span className="text-xs font-bold text-zinc-500">
                مؤشرات المنظومة
              </span>
              <span className="text-[10px] font-light uppercase tracking-widest text-emerald-600">
                تحديث 2026
              </span>
            </div>
            <dl className="flex flex-1 flex-col justify-center divide-y divide-zinc-200">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center justify-between gap-4 px-5 py-5"
                >
                  <dt className="text-sm font-normal text-zinc-600">
                    {stat.label}
                  </dt>
                  <dd className="font-display text-xl font-black tracking-tight text-ink">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="border-t border-zinc-200 px-5 py-4">
              <a
                href="#philosophy"
                className="flex items-center justify-between text-xs font-semibold text-zinc-700 transition-all duration-300 ease-in-out hover:text-emerald-600"
              >
                اقرأ فلسفة العمل كاملة
                <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-0 ltr:rotate-180" />
              </a>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
