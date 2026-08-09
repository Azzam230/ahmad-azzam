import { Sparkles } from "lucide-react";

export function KeyInsights({ items }: { items: string[] }) {
  return (
    <section
      aria-label="ملخص تنفيذي"
      className="rounded-2xl border border-emerald-500/20 bg-white/60 p-6 backdrop-blur-md"
    >
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-emerald-600" />
        <h2 className="text-sm font-black tracking-tight text-ink">
          ملخص تنفيذي (Key Insights)
        </h2>
      </div>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 text-sm leading-relaxed text-zinc-600"
          >
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
