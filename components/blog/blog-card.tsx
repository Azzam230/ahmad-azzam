"use client";

import { ArrowLeft, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import type { Article } from "@/lib/article";
import { cardMotionProps } from "@/components/motion";

export function BlogCard({ article }: { article: Article }) {
  return (
    <motion.article
      {...cardMotionProps}
      className="group flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-card transition-colors duration-300 ease-in-out hover:bg-emerald-50/60"
    >
      <div className="flex items-center justify-between gap-2">
        <Badge variant="emerald">{article.category}</Badge>
        <span className="shrink-0 text-xs font-medium text-zinc-400">
          {article.readMinutes} دقائق
        </span>
      </div>
      <a href={`/blog/${article.slug}`} className="mt-5 flex flex-1 flex-col">
        <h3 className="font-display text-xl font-semibold leading-snug text-ink transition-colors duration-300 ease-in-out group-hover:text-emerald-600">
          {article.title}
        </h3>
        <p className="mt-3 line-clamp-3 font-serif text-sm font-light leading-relaxed text-zinc-500">
          {article.description}
        </p>
      </a>
      <div className="mt-6 flex items-center justify-between border-t border-zinc-200 pt-4">
        <span className="flex items-center gap-1.5 text-xs font-medium text-zinc-400">
          <Clock className="h-3.5 w-3.5" />
          {article.readMinutes} دقائق قراءة
        </span>
        <a
          href={`/blog/${article.slug}`}
          className="flex items-center gap-1 text-xs font-bold text-zinc-400 transition-colors duration-300 ease-in-out group-hover:text-emerald-600"
        >
          اقرأ المقال
          <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-0 ltr:rotate-180" />
        </a>
      </div>
    </motion.article>
  );
}
