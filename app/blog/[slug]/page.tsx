import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock } from "lucide-react";
import {
  getArticleBySlug,
  getAllArticles,
  getRelatedArticles,
} from "@/content/articles";
import { formatDate, getHeadings } from "@/lib/article";
import { AUTHOR, SITE_NAME, SITE_URL } from "@/lib/site";
import {
  buildArticleGraph,
} from "@/lib/schemas";
import { Badge } from "@/components/ui/badge";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { ArticleBlocks } from "@/components/blog/article-blocks";
import { AuthorCard } from "@/components/blog/author-card";
import { BlogCard } from "@/components/blog/blog-card";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  const url = `${SITE_URL}/blog/${article.slug}`;
  const imageUrl = `${url}/opengraph-image`;

  return {
    metadataBase: new URL(SITE_URL),
    title: article.seoTitle ?? article.title,
    description: article.description,
    keywords: article.tags,
    category: article.category,
    authors: [{ name: AUTHOR.name, url: SITE_URL }],
    creator: AUTHOR.name,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: article.seoTitle ?? article.title,
      description: article.description,
      type: "article",
      url,
      locale: "ar_SA",
      siteName: SITE_NAME,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      publishedTime: article.publishDate,
      modifiedTime: article.modifiedDate,
      authors: [AUTHOR.name],
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.seoTitle ?? article.title,
      description: article.description,
      images: [imageUrl],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const headings = getHeadings(article.blocks);
  const related = getRelatedArticles(article);
  const jsonLd = buildArticleGraph(
    article,
    `${SITE_URL}/blog/${article.slug}/opengraph-image`,
    headings
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingProgress />
      <SiteHeader />

      <article className="border-b border-zinc-200">
        <header className="border-b border-zinc-200 bg-white">
          <div className="container py-14 lg:py-20">
            <nav aria-label="مسار التنقل" className="text-xs font-light text-zinc-500">
              <ol className="flex items-center gap-2">
                <li>
                  <a href="/" className="transition-colors duration-300 ease-in-out hover:text-emerald-600">
                    الرئيسية
                  </a>
                </li>
                <li aria-hidden="true" className="text-zinc-300">/</li>
                <li>
                  <a href="/blog" className="transition-colors duration-300 ease-in-out hover:text-emerald-600">
                    المدونة
                  </a>
                </li>
                <li aria-hidden="true" className="text-zinc-300">/</li>
                <li>
                  <a
                    href={`/blog?category=${article.categorySlug}`}
                    className="transition-colors duration-300 ease-in-out hover:text-emerald-600"
                  >
                    {article.category}
                  </a>
                </li>
              </ol>
            </nav>

            <div className="mt-8 max-w-4xl">
              <Badge variant="emerald">{article.category}</Badge>
              <h1 className="mt-6 text-balance font-display text-3xl font-black leading-tight tracking-tight text-ink sm:text-5xl">
                {article.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg font-light leading-relaxed text-zinc-600">
                {article.description}
              </p>
            </div>

            {article.featuredImage && (
              <div className="mt-10">
                <img
                  src={article.featuredImage}
                  alt={article.title}
                  width={1920}
                  height={1080}
                  loading="eager"
                  className="h-auto w-full max-w-4xl rounded-2xl border border-zinc-200 shadow-card"
                />
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-sm font-black text-white">
                  ن
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-ink">
                    {AUTHOR.name}
                  </span>
                  <span className="text-xs font-light text-zinc-500">
                    {AUTHOR.role}
                  </span>
                </div>
              </div>
              <span className="hidden h-4 w-px bg-zinc-200 sm:block" />
              <div className="flex flex-col">
                <span className="text-xs font-light text-zinc-400">
                  تاريخ النشر
                </span>
                <span className="text-sm font-semibold text-zinc-600">
                  {formatDate(article.publishDate)}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-light text-zinc-400">
                  آخر تحديث
                </span>
                <span className="text-sm font-semibold text-zinc-600">
                  {formatDate(article.modifiedDate)}
                </span>
              </div>
              <span className="flex items-center gap-1.5 text-sm font-semibold text-zinc-500">
                <Clock className="h-4 w-4 text-emerald-600" />
                {article.readMinutes} دقائق قراءة
              </span>
            </div>
          </div>
        </header>

        <div className="container py-12 lg:py-16">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="min-w-0 lg:col-span-8">
              <ArticleBlocks blocks={article.blocks} />

              <footer>
                <AuthorCard />
              </footer>
            </div>

            <aside className="hidden min-w-0 lg:col-span-4 lg:block">
              <TableOfContents headings={headings} />
            </aside>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-b border-zinc-200">
          <div className="container py-16">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-black uppercase tracking-widest text-zinc-500">
                اقرأ أيضاً
              </h2>
              <a
                href="/blog"
                className="text-xs font-bold text-emerald-600 transition-colors duration-300 ease-in-out hover:text-emerald-700"
              >
                جميع المقالات
              </a>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {related.map((relatedArticle) => (
                <BlogCard key={relatedArticle.slug} article={relatedArticle} />
              ))}
            </div>
          </div>
        </section>
      )}
      <SiteFooter />
    </>
  );
}
