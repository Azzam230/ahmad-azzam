import type { Article, Heading } from "@/lib/article";
import { AUTHOR, SITE_NAME, SITE_URL } from "@/lib/site";

export function buildArticleSchema(
  article: Article,
  imageUrl: string
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: [imageUrl],
    datePublished: article.publishDate,
    dateModified: article.modifiedDate,
    author: {
      "@type": "Person",
      name: AUTHOR.name,
      url: SITE_URL,
      jobTitle: AUTHOR.role,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${article.slug}`,
    },
    keywords: article.tags.join(", "),
    articleSection: article.category,
  };
}

export function buildBreadcrumbSchema(article: Article): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "الرئيسية",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "المدونة",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.category,
        item: `${SITE_URL}/blog?category=${article.categorySlug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: article.title,
        item: `${SITE_URL}/blog/${article.slug}`,
      },
    ],
  };
}

export function buildFaqSchema(
  article: Article
): Record<string, unknown> | null {
  const faqBlocks = article.blocks.filter((block) => block.type === "faq");
  const items = faqBlocks.flatMap((block) =>
    block.type === "faq" ? block.items : []
  );
  if (items.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function buildArticleGraph(
  article: Article,
  imageUrl: string,
  headings: Heading[]
): Record<string, unknown>[] {
  const graph: Record<string, unknown>[] = [
    buildArticleSchema(article, imageUrl),
    buildBreadcrumbSchema(article),
  ];
  const faq = buildFaqSchema(article);
  if (faq) graph.push(faq);
  if (headings.length > 0) {
    graph.push({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${article.slug}`,
      url: `${SITE_URL}/blog/${article.slug}`,
      name: article.title,
      isPartOf: {
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
      },
      about: {
        "@type": "AboutPage",
        name: article.category,
      },
      hasPart: headings.map((heading, index) => ({
        "@type": "WebPageElement",
        headline: heading.text,
        position: index + 1,
      })),
    });
  }
  return graph;
}
