import { Quote } from "lucide-react";

export function DirectAnswer({ text }: { text: string }) {
  return (
    <blockquote className="my-8 rounded-2xl border-r-4 border-emerald-500 bg-emerald-50/50 p-5 sm:p-6">
      <div className="flex items-center gap-2">
        <Quote className="h-4 w-4 rotate-180 text-emerald-600" />
        <p className="text-xs font-black uppercase tracking-widest text-emerald-700">
          إجابة مباشرة
        </p>
      </div>
      <p className="mt-3 text-base font-bold leading-relaxed text-emerald-950 sm:text-lg">
        {text}
      </p>
    </blockquote>
  );
}
