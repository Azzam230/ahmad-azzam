import { Bot, MousePointerClick, TrendingUp, Filter } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

const SYSTEMS = [
  {
    icon: Filter,
    title: "هندسة استراتيجيات المبيعات",
    subtitle: "Funnel Architecture",
    description:
      "مسار عميل مدروس يحوّل الزائر إلى مشترٍ، ويضاعف معدل التحويل عند كل مرحلة من مراحل القرار.",
  },
  {
    icon: MousePointerClick,
    title: "الواجهات عالية التحويل",
    subtitle: "High-Conversion UX & Web",
    description:
      "مواقع سريعة ببنية حديثة وواجهات مبنية للنتيجة، لا للشكل فقط — لكل عنصر سبب في البيع.",
  },
  {
    icon: TrendingUp,
    title: "تصدر محركات البحث والـ AI",
    subtitle: "SEO & GEO",
    description:
      "الظهور المباشر في Google و ChatGPT و Perplexity حيث يبحث عميلك اليوم عن حلّه فعلياً.",
  },
  {
    icon: Bot,
    title: "أتمتة العمليات بالذكاء الاصطناعي",
    subtitle: "AI Automation",
    description:
      "ربط الأنظمة ومتابعة العملاء آلياً، لتشتغل أعمالك على مدار الساعة بلا تشغيل يدوي.",
  },
];

export function GrowthSystems() {
  return (
    <section id="systems" className="scroll-mt-16">
      <div className="container py-20 lg:py-28">
        <SectionHeading
          index="03"
          kicker="أركان المنظومة"
          title="أربعة أركان تصنع نمواً لا يهدأ"
          description="لا يعمل أي ركن بمعزل عن الآخر؛ المنظومة متكاملة تبدأ من الاستراتيجية وتنتهي بالأتمتة."
        />

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-200 shadow-card sm:grid-cols-2 lg:grid-cols-4">
          {SYSTEMS.map((system, index) => (
            <article
              key={system.title}
              className="group flex flex-col bg-white p-6 transition-all duration-300 ease-in-out hover:bg-emerald-50/60 lg:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-widest text-zinc-300">
                  0{index + 1}
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-all duration-300 ease-in-out group-hover:bg-emerald-600 group-hover:text-white">
                  <system.icon className="h-5 w-5" />
                </span>
              </div>

              <h3 className="mt-10 font-display text-lg font-bold leading-snug text-ink">
                {system.title}
              </h3>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                {system.subtitle}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-zinc-500">
                {system.description}
              </p>

              <a
                href="#audit"
                className="mt-8 inline-flex items-center gap-1.5 border-t border-zinc-200 pt-4 text-xs font-bold text-zinc-400 transition-all duration-300 ease-in-out group-hover:text-emerald-600"
              >
                قِس جاهزية هذا الركن
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
