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

        <div className="mt-12 grid gap-px border border-zinc-200 bg-zinc-200 sm:grid-cols-2 lg:grid-cols-4">
          {SYSTEMS.map((system, index) => (
            <article
              key={system.title}
              className="group flex flex-col bg-white p-6 transition-colors hover:bg-emerald-50/40 lg:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black tracking-widest text-zinc-300">
                  0{index + 1}
                </span>
                <system.icon className="h-5 w-5 text-emerald-700" />
              </div>

              <h3 className="mt-10 font-display text-lg font-black leading-snug text-ink">
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
                className="mt-8 inline-flex items-center gap-1.5 border-t border-zinc-200 pt-4 text-xs font-bold text-zinc-400 transition-colors group-hover:text-emerald-700"
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
