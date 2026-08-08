import { Check, X } from "lucide-react";

const TRADITIONAL = [
  "خدمات منفصلة بلا استراتيجية موحدة",
  "مسوّق يركز على المشاهدات لا على المبيعات",
  "مبرمج يبني واجهات ولا يفهم أهداف الربح",
];

const GROWTH_SYSTEM = [
  "استراتيجية موحدة تربط التقنية بالبيع",
  "واجهات عالية التحويل مبنية للنتيجة",
  "أتمتة بالذكاء الاصطناعي للتشغيل والمتابعة",
  "تصدر محركات البحث والـ AI — SEO/GEO",
];

export function Manifesto() {
  return (
    <section
      id="philosophy"
      className="scroll-mt-16 border-b border-zinc-200 bg-ink text-white"
    >
      <div className="container py-20 lg:py-28">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-emerald-400">
            فلسفة العمل — بيان المنظومة
          </p>
          <span className="text-sm font-bold text-white/25">02</span>
        </div>

        <h2 className="mt-6 max-w-4xl text-balance font-display text-3xl font-bold leading-snug tracking-tighter sm:text-4xl lg:text-5xl">
          نموّ حقيقي لا يصنعه وعدٌ، بل{" "}
          <span className="text-emerald-400">منظومة رقمية تفي</span>.
        </h2>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-800 md:grid-cols-2">
          <div className="bg-ink p-8 lg:p-10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-400">
                النهج التقليدي
              </span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-zinc-600 text-zinc-500">
                <X className="h-3.5 w-3.5" />
              </span>
            </div>
            <ul className="mt-8 space-y-4 text-lg leading-relaxed text-zinc-300">
              {TRADITIONAL.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-3 h-px w-6 shrink-0 bg-zinc-600" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-10 border-t border-zinc-800 pt-6 text-2xl font-bold tracking-tight text-zinc-200">
              النتيجة: هدر الميزانية
            </p>
          </div>

          <div className="bg-emerald-600 p-8 lg:p-10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-100">
                منظومة النمو
              </span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-emerald-300/60 text-emerald-100">
                <Check className="h-3.5 w-3.5" />
              </span>
            </div>
            <ul className="mt-8 space-y-4 text-lg leading-relaxed text-white">
              {GROWTH_SYSTEM.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-3 h-px w-6 shrink-0 bg-emerald-400/60" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-10 border-t border-emerald-300/30 pt-6 text-2xl font-bold tracking-tight text-white">
              النتيجة: محرك نمو أوتوماتيكي
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
