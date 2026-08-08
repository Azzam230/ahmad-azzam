"use client";

import { useMemo, useState, type CSSProperties } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  MousePointerClick,
  RotateCcw,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type GoalId = "sales" | "conversion" | "automation";
type TrafficId = "low" | "mid" | "high" | "very-high";
type BottleneckId = "visibility" | "conversion" | "interface" | "automation";

const GOALS: { id: GoalId; label: string; icon: typeof TrendingUp }[] = [
  { id: "sales", label: "زيادة المبيعات", icon: TrendingUp },
  { id: "conversion", label: "تحسين التحويل", icon: MousePointerClick },
  { id: "automation", label: "أتمتة العمليات", icon: Bot },
];

const TRAFFIC: { id: TrafficId; label: string; hint: string }[] = [
  { id: "low", label: "أقل من 1,000", hint: "زيارة / شهر" },
  { id: "mid", label: "1,000 – 10,000", hint: "زيارة / شهر" },
  { id: "high", label: "10,000 – 100,000", hint: "زيارة / شهر" },
  { id: "very-high", label: "أكثر من 100,000", hint: "زيارة / شهر" },
];

const BOTTLENECKS: { id: BottleneckId; label: string; hint: string }[] = [
  { id: "visibility", label: "الظهور والوصول", hint: "الموقع موجود لكن لا يصل إليه أحد" },
  { id: "conversion", label: "التحويل", hint: "زيارات كثيرة لكن مبيعات قليلة" },
  { id: "interface", label: "الواجهة والتجربة", hint: "سرعة وأداء وتصميم الموقع" },
  { id: "automation", label: "المتابعة والأتمتة", hint: "لا توجد متابعة آلية للعملاء" },
];

const TRAFFIC_WEIGHT: Record<TrafficId, number> = {
  low: 0,
  mid: 15,
  high: 30,
  "very-high": 40,
};

const GOAL_BONUS: Record<
  GoalId,
  { conversion: number; visibility: number; automation: number }
> = {
  sales: { conversion: 15, visibility: 8, automation: 15 },
  conversion: { conversion: 22, visibility: 5, automation: 10 },
  automation: { conversion: 8, visibility: 5, automation: 30 },
};

const STEPS = [
  { label: "الهدف", title: "ما هدفك الأساسي من النمو؟" },
  { label: "الموقع", title: "ما وضع موقعك الحالي؟" },
  { label: "العائق", title: "ما أكبر عائق تقف أمامه؟" },
];

const clamp = (value: number, min = 8, max = 96) =>
  Math.max(min, Math.min(max, Math.round(value)));

export function GrowthAudit() {
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState<GoalId | null>(null);
  const [url, setUrl] = useState("");
  const [traffic, setTraffic] = useState<TrafficId | null>(null);
  const [bottleneck, setBottleneck] = useState<BottleneckId | null>(null);
  const [showResult, setShowResult] = useState(false);

  const canContinue = useMemo(() => {
    if (step === 0) return goal !== null;
    if (step === 1) return url.trim().length > 3 && traffic !== null;
    if (step === 2) return bottleneck !== null;
    return true;
  }, [step, goal, url, traffic, bottleneck]);

  const analysis = useMemo(() => {
    const g = goal ?? "sales";
    const t = traffic ?? "mid";
    const bonus = GOAL_BONUS[g];
    const hasUrl = url.trim().length > 3;

    let interfaceScore = 52 + (hasUrl ? 12 : 0);
    let visibilityScore = 30 + TRAFFIC_WEIGHT[t] + bonus.visibility;
    let conversionScore = 40 + bonus.conversion + (hasUrl ? 6 : 0);
    let automationScore = 24 + bonus.automation;

    if (bottleneck === "visibility") visibilityScore -= 10;
    if (bottleneck === "conversion") conversionScore -= 10;
    if (bottleneck === "interface") interfaceScore -= 10;
    if (bottleneck === "automation") automationScore -= 10;

    interfaceScore = clamp(interfaceScore);
    visibilityScore = clamp(visibilityScore);
    conversionScore = clamp(conversionScore);
    automationScore = clamp(automationScore);

    const score = Math.round(
      interfaceScore * 0.2 +
        visibilityScore * 0.25 +
        conversionScore * 0.3 +
        automationScore * 0.25
    );

    const bars = [
      { label: "الظهور والوصول (SEO/GEO)", value: visibilityScore },
      { label: "التحويل إلى مبيعات", value: conversionScore },
      { label: "واجهة الموقع وتجربة المستخدم", value: interfaceScore },
      { label: "الأتمتة والتشغيل", value: automationScore },
    ];
    const weakest = [...bars].sort((a, b) => a.value - b.value)[0];

    return { score, bars, weakest };
  }, [goal, traffic, url, bottleneck]);

  const reset = () => {
    setStep(0);
    setGoal(null);
    setUrl("");
    setTraffic(null);
    setBottleneck(null);
    setShowResult(false);
  };

  const next = () => {
    if (!canContinue) return;
    if (step < 2) setStep((s) => s + 1);
    else setShowResult(true);
  };

  return (
    <section
      id="audit"
      className="scroll-mt-16 border-b border-zinc-200 bg-ink text-white"
    >
      <div className="container py-20 lg:py-28">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-emerald-400">
            أداة تقييم الجاهزية الرقمية
          </p>
          <span className="text-sm font-bold text-white/25">05</span>
        </div>

        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-balance font-display text-3xl font-bold leading-tight tracking-tighter sm:text-4xl lg:text-[2.75rem]">
              فحص مجاني لمؤشر نمو موقعك
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-zinc-300">
              ثلاث خطوات فقط، ثم تحصل على مؤشر أولي لجاهزية منظومتك الرقمية مع
              توصية عملية بأهم نقطة تحسين.
            </p>
          </div>
          <p className="shrink-0 text-xs font-bold text-zinc-400">
            يستغرق أقل من دقيقتين
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-zinc-800 bg-[#111113]">
          <div className="flex items-center border-b border-zinc-800">
            {[...STEPS, { label: "النتيجة" }].map((s, i) => {
              const active = showResult ? i === 3 : i === step;
              const done = showResult ? i < 3 : i < step;
              return (
                <div
                  key={s.label}
                  className={cn(
                    "flex flex-1 items-center gap-3 border-e border-zinc-800 px-4 py-4 last:border-e-0",
                    active && "bg-emerald-600"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                      done
                        ? "bg-emerald-600 text-white"
                        : active
                          ? "bg-white/20 text-white"
                          : "border border-white/20 text-white/40"
                    )}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={cn(
                      "hidden text-xs font-bold sm:inline",
                      active ? "text-white" : "text-white/50"
                    )}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>

          {!showResult ? (
            <div className="p-6 lg:p-10">
              <p className="text-xs font-bold text-zinc-500">
                الخطوة {step + 1} من 3 — {STEPS[step].label}
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold tracking-tight">
                {STEPS[step].title}
              </h3>

              {step === 0 && (
                <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-zinc-800 bg-zinc-800 sm:grid-cols-3">
                  {GOALS.map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setGoal(g.id)}
                      className={cn(
                        "flex flex-col items-start gap-4 bg-[#111113] p-5 text-start transition-all duration-300 ease-in-out",
                        goal === g.id &&
                          "bg-emerald-600 hover:bg-emerald-600"
                      )}
                    >
                      <g.icon
                        className={cn(
                          "h-5 w-5",
                          goal === g.id ? "text-white" : "text-emerald-400"
                        )}
                      />
                      <span
                        className={cn(
                          "text-base font-bold",
                          goal === g.id ? "text-white" : "text-white"
                        )}
                      >
                        {g.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {step === 1 && (
                <div className="mt-8 space-y-6">
                  <div>
                    <label
                      htmlFor="site-url"
                      className="text-sm font-bold text-zinc-300"
                    >
                      رابط الموقع
                    </label>
                    <Input
                      id="site-url"
                      dir="ltr"
                      placeholder="https://example.com"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="mt-2 border-white/20 bg-[#111113] text-white placeholder:text-white/30 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-300">
                      حجم الزيارات الشهرية
                    </p>
                    <div className="mt-2 grid gap-px overflow-hidden rounded-xl border border-zinc-800 bg-zinc-800 sm:grid-cols-2 lg:grid-cols-4">
                      {TRAFFIC.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setTraffic(t.id)}
                          className={cn(
                            "flex flex-col items-start gap-1 bg-[#111113] px-4 py-4 text-start transition-all duration-300 ease-in-out",
                            traffic === t.id && "bg-emerald-600"
                          )}
                        >
                          <span className="text-sm font-bold text-white">
                            {t.label}
                          </span>
                          <span className="text-[11px] text-white/50">
                            {t.hint}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-zinc-800 bg-zinc-800 sm:grid-cols-2">
                  {BOTTLENECKS.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setBottleneck(b.id)}
                      className={cn(
                        "flex flex-col items-start gap-2 bg-[#111113] px-5 py-5 text-start transition-all duration-300 ease-in-out",
                        bottleneck === b.id && "bg-emerald-600"
                      )}
                    >
                      <span className="text-base font-bold text-white">
                        {b.label}
                      </span>
                      <span className="text-sm leading-relaxed text-white/50">
                        {b.hint}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              <div className="mt-10 flex items-center justify-between border-t border-zinc-800 pt-6">
                <Button
                  variant="ghost"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  className="text-white hover:bg-white/10 hover:text-white"
                >
                  <ArrowRight className="rtl:rotate-0 ltr:rotate-180" />
                  السابق
                </Button>
                <Button
                  onClick={next}
                  disabled={!canContinue}
                  className={cn(
                    !canContinue && "cursor-not-allowed opacity-40"
                  )}
                >
                  {step === 2 ? "عرض النتيجة" : "المتابعة"}
                  <ArrowLeft className="rtl:rotate-0 ltr:rotate-180" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-6 lg:p-10">
              <div className="grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <p className="text-xs font-bold text-zinc-500">
                    مؤشر جاهزية منظومتك الرقمية
                  </p>
                  <div className="mt-4 flex items-end gap-2">
                    <span className="font-display text-7xl font-bold tracking-tighter text-white lg:text-8xl">
                      {analysis.score}
                    </span>
                    <span className="mb-3 text-lg font-bold text-white/40">
                      / 100
                    </span>
                  </div>
                  <div className="mt-6 h-1.5 w-full bg-white/10">
                    <div
                      className="h-full animate-grow bg-emerald-400"
                      style={
                        {
                          "--grow-to": `${analysis.score}%`,
                        } as CSSProperties
                      }
                    />
                  </div>
                  <p className="mt-6 border-t border-zinc-800 pt-5 text-sm leading-relaxed text-zinc-300">
                    أبرز نقطة قصور لديك:{" "}
                    <span className="font-bold text-white">
                      {analysis.weakest.label}
                    </span>
                    . ننصح بالبدء منها ثم بناء بقية المنظومة حولها.
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={`mailto:book@example.com?subject=جلسة%20استراتيجية%20عميقة%20—%20مؤشر%20${analysis.score}%2F100`}
                      className="inline-flex h-12 items-center justify-center rounded-xl bg-emerald-600 px-8 text-sm font-bold text-white shadow-subtle transition-all duration-300 ease-in-out hover:bg-emerald-600 hover:shadow-none"
                    >
                      احجز جلسة استراتيجية عميقة
                    </a>
                    <Button
                      variant="ghost"
                      onClick={reset}
                      className="text-white hover:bg-white/10 hover:text-white"
                    >
                      <RotateCcw />
                      إعادة الفحص
                    </Button>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <div className="flex h-full flex-col justify-center gap-6 border-t border-zinc-800 pt-8 lg:border-e lg:border-t-0 lg:pe-8 lg:pt-0">
                    {analysis.bars.map((bar, index) => (
                      <div key={bar.label}>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-zinc-200">
                            {bar.label}
                          </span>
                          <span className="text-sm font-bold text-white">
                            {bar.value}
                            <span className="text-white/40">%</span>
                          </span>
                        </div>
                        <div className="mt-2 h-1.5 w-full bg-white/10">
                          <div
                            className={cn(
                              "h-full animate-grow",
                              bar.value === analysis.weakest.value
                                ? "bg-zinc-400"
                                : "bg-emerald-400"
                            )}
                            style={
                              {
                                "--grow-to": `${bar.value}%`,
                              } as CSSProperties
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
