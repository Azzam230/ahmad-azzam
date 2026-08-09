import type { ArticleBlock } from "@/lib/article";
import { slugify } from "@/lib/article";
import { KeyInsights } from "@/components/blog/key-insights";
import { DirectAnswer } from "@/components/blog/direct-answer";
import { Callout } from "@/components/blog/callout";
import { DataTable } from "@/components/blog/data-table";
import { Faq } from "@/components/blog/faq";
import { CtaCard } from "@/components/blog/cta-card";

function Heading({
  level,
  id,
  children,
}: {
  level: 2 | 3;
  id: string;
  children: React.ReactNode;
}) {
  const className =
    level === 2
      ? "mt-10 mb-4 font-display text-2xl font-bold tracking-tight text-ink scroll-mt-28 sm:text-3xl"
      : "mt-8 mb-3 text-xl font-bold tracking-tight text-ink scroll-mt-28 sm:text-2xl";
  if (level === 2) return <h2 id={id} className={className}>{children}</h2>;
  return <h3 id={id} className={className}>{children}</h3>;
}

export function ArticleBlocks({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "p":
            return (
              <p
                key={index}
                className="text-lg font-normal leading-relaxed text-slate-700"
              >
                {block.text}
              </p>
            );
          case "h2":
          case "h3":
            return (
              <Heading
                key={index}
                level={block.type === "h2" ? 2 : 3}
                id={slugify(block.text)}
              >
                {block.text}
              </Heading>
            );
          case "ul":
            return (
              <ul
                key={index}
                className="my-6 space-y-3 ps-1 text-lg font-normal leading-relaxed text-slate-700"
              >
                {block.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol
                key={index}
                className="my-6 list-decimal space-y-3 ps-6 text-lg font-normal leading-relaxed text-slate-700 marker:font-bold marker:text-emerald-600"
              >
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            );
          case "keyInsights":
            return <KeyInsights key={index} items={block.items} />;
          case "directAnswer":
            return <DirectAnswer key={index} text={block.text} />;
          case "callout":
            return (
              <Callout key={index} title={block.title} text={block.text} />
            );
          case "table":
            return (
              <DataTable
                key={index}
                caption={block.caption}
                headers={block.headers}
                rows={block.rows}
              />
            );
          case "faq":
            return <Faq key={index} items={block.items} />;
          case "cta":
            return <CtaCard key={index} title={block.title} text={block.text} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
