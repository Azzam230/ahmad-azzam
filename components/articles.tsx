import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/section-heading";

const ARTICLES = [
  {
    category: "الظهور في الذكاء الاصطناعي",
    title: "لماذا لا ينافس موقعك داخل ChatGPT؟",
    excerpt:
      "دليل عملي لنظام GEO: كيف تجعل محركات الذكاء الاصطناعي تختار علامتك التجارية جواباً لعملائك.",
    readTime: "قراءة 8 دقائق",
  },
  {
    category: "تحسين التحويل",
    title: "من 1% إلى 4%: ما الذي تغيّر فعلاً؟",
    excerpt:
      "تفكيك حقيقي لمسار مبيعات أعدناه هندسياً: العناصر التي رفعت التحويل والعناصر التي تجاهلها الجميع.",
    readTime: "قراءة 6 دقائق",
  },
  {
    category: "أتمتة المبيعات",
    title: "أتمتة المبيعات بالذكاء الاصطناعي في 90 يوماً",
    excerpt:
      "خريطة طريق على ثلاث مراحل لربط CRM ورسائل المتابعة والذكاء الاصطناعي في دورة بيع واحدة.",
    readTime: "قراءة 10 دقائق",
  },
];

export function Articles() {
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
            href="mailto:editor@example.com"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-zinc-500 transition-all duration-300 ease-in-out hover:text-emerald-600"
          >
            جميع المقالات
            <ArrowLeft className="h-4 w-4 rtl:rotate-0 ltr:rotate-180" />
          </a>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-200 shadow-card md:grid-cols-3">
          {ARTICLES.map((article) => (
            <article
              key={article.title}
              className="group flex flex-col bg-white p-6 transition-all duration-300 ease-in-out hover:bg-emerald-50/60 lg:p-8"
            >
              <Badge variant="emerald" className="self-start">
                {article.category}
              </Badge>
              <h3 className="mt-6 font-display text-xl font-bold leading-snug text-ink transition-all duration-300 ease-in-out group-hover:text-emerald-600">
                {article.title}
              </h3>
              <p className="mt-3 font-serif text-sm leading-relaxed text-zinc-500">
                {article.excerpt}
              </p>
              <div className="mt-8 flex items-center justify-between border-t border-zinc-200 pt-4">
                <span className="text-xs font-medium text-zinc-400">
                  {article.readTime}
                </span>
                <span className="text-xs font-bold text-zinc-300 transition-all duration-300 ease-in-out group-hover:text-emerald-600">
                  اقرأ المقال
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
