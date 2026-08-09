import { Lightbulb } from "lucide-react";

export function Callout({ title, text }: { title?: string; text: string }) {
  return (
    <aside className="my-8 rounded-2xl border border-zinc-200 bg-white p-5 shadow-subtle sm:p-6">
      <div className="flex items-center gap-2">
        <Lightbulb className="h-4 w-4 text-emerald-600" />
        {title && (
          <p className="text-xs font-black uppercase tracking-widest text-ink">
            {title}
          </p>
        )}
      </div>
      <p className="mt-3 text-base font-light leading-relaxed text-zinc-600">
        {text}
      </p>
    </aside>
  );
}
