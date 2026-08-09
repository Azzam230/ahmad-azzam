export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "keyInsights"; items: string[] }
  | { type: "directAnswer"; text: string }
  | { type: "callout"; title?: string; text: string }
  | { type: "table"; caption?: string; headers: string[]; rows: string[][] }
  | { type: "faq"; items: { q: string; a: string }[] }
  | {
      type: "cta";
      title: string;
      text?: string;
      mode?: "booking" | "whatsapp";
      whatsappLabel?: string;
    };

export interface Article {
  slug: string;
  title: string;
  seoTitle?: string;
  description: string;
  category: string;
  categorySlug: string;
  tags: string[];
  publishDate: string;
  modifiedDate: string;
  readMinutes: number;
  featuredImage?: string;
  blocks: ArticleBlock[];
}

export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

export function slugify(text: string): string {
  const normalized = text
    .replace(/\s+/g, "-")
    .replace(/[^\w\u0600-\u06FF-]+/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return normalized || "section";
}

export function getHeadings(blocks: ArticleBlock[]): Heading[] {
  const headings: Heading[] = [];
  for (const block of blocks) {
    if (block.type === "h2") headings.push({ id: slugify(block.text), text: block.text, level: 2 });
    if (block.type === "h3") headings.push({ id: slugify(block.text), text: block.text, level: 3 });
  }
  return headings;
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("ar", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(iso));
}
