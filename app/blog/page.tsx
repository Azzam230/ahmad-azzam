import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { getAllArticles } from "@/content/articles";
import { SITE_DESCRIPTION, SITE_URL } from "@/lib/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BlogCard } from "@/components/blog/blog-card";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "المدونة — نمو رقمي وأنظمة ذكية",
  description:
    "مقالات عملية مبنية على مشاريع حقيقية في النمو الرقمي، تحسين التحويل، التصدر في محركات البحث والذكاء الاصطناعي، وأتمتة العمليات.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: "المدونة — نمو رقمي وأنظمة ذكية",
    description: SITE_DESCRIPTION,
    type: "website",
    url: `${SITE_URL}/blog`,
    locale: "ar_SA",
  },
};

export default function BlogPage() {
  const articles = getAllArticles();

  return (
    <>
      <SiteHeader />
      <main>
        <section className="border-b border-zinc-200">
          <div className="container py-16 lg:py-24">
            <div className="flex items-center justify-between">
              <p className="text-xs font-light text-emerald-600">
                المدونة التحريرية
              </p>
              <span className="text-sm font-thin tracking-wider text-zinc-300">
                Blog
              </span>
            </div>
            <h1 className="mt-6 max-w-3xl text-balance font-display text-3xl font-black leading-tight tracking-tight text-ink sm:text-5xl">
              خلاصة ما نجح مع الشركات
            </h1>
            <p className="mt-5 max-w-2xl text-lg font-light leading-relaxed text-zinc-600">
              كتابات عملية مبنية على مشاريع حقيقية، بلغة واضحة بلا فذلكة
              تسويقية — ومصممة لتكون قابلة للاقتباس في محركات البحث والذكاء
              الاصطناعي.
            </p>
          </div>
        </section>

        <section className="border-b border-zinc-200">
          <div className="container py-16 lg:py-20">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-black uppercase tracking-widest text-zinc-500">
                جميع المقالات
              </h2>
              <span className="text-xs font-bold text-zinc-400">
                {articles.length} مقالات
              </span>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <BlogCard key={article.slug} article={article} />
              ))}
            </div>

            <div className="mt-16 rounded-2xl border border-zinc-200 bg-ink p-8 text-white sm:p-12">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-display text-2xl font-black tracking-tight">
                    تحتاج تحليلاً خاصاً بمنظومتك؟
                  </h2>
                  <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-zinc-300">
                    احجز جلسة استراتيجية مباشرة، أو افحص مؤشر نمو موقعك مجاناً
                    للحصول على توصية عملية بأهم نقطة تحسين.
                  </p>
                </div>
                <a
                  href="/#audit"
                  className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-8 text-sm font-bold text-white shadow-subtle transition-all duration-300 ease-in-out hover:bg-emerald-700"
                >
                  افحص مؤشر نمو موقعك
                  <ArrowLeft className="rtl:rotate-0 ltr:rotate-180" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
