"use client";

import { ArrowLeft, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/section-heading";
import { cardMotionProps } from "@/components/motion";
import { getAllArticles } from "@/content/articles";

export function Articles() {
  const articles = getAllArticles();

  return (
    <section
      id="articles"
      className="scroll-mt-16 border-b border-zinc-200"
    >
      <div className="container py-20 lg:py-28">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            index="04"
            kicker="مقالات تحريرية"
            title="خلاصة ما نجح مع الشركات"
            description="كتابات عملية مبنية على مشاريع حقيقية، بلغة واضحة بلا فذلكة تسويقية."
          />
          <a
            href="/blog"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-zinc-500 transition-all duration-300 ease-in-out hover:text-emerald-600"
          >
            جميع المقالات
            <ArrowLeft className="h-4 w-4 rtl:rotate-0 ltr:rotate-180" />
          </a>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-200 shadow-card md:grid-cols-3">
          {articles.map((article) => (
            <motion.article
              key={article.slug}
              {...cardMotionProps}
              className="group flex flex-col bg-white p-6 transition-colors duration-300 ease-in-out hover:bg-emerald-50/60 lg:p-8"
            >
              <Badge variant="emerald" className="self-start">
                {article.category}
              </Badge>
              <h3 className="mt-6 font-display text-xl font-semibold leading-snug text-ink transition-colors duration-300 ease-in-out group-hover:text-emerald-600">
                <a href={`/blog/${article.slug}`}>{article.title}</a>
              </h3>
              <p className="mt-3 font-serif text-sm font-light leading-relaxed text-zinc-500">
                {article.description}
              </p>
              <div className="mt-8 flex items-center justify-between border-t border-zinc-200 pt-4">
                <span className="flex items-center gap-1.5 text-xs font-medium text-zinc-400">
                  <Clock className="h-3.5 w-3.5" />
                  {article.readMinutes} دقائق قراءة
                </span>
                <a
                  href={`/blog/${article.slug}`}
                  className="text-xs font-semibold text-zinc-300 transition-colors duration-300 ease-in-out group-hover:text-emerald-600"
                >
                  اقرأ المقال
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
