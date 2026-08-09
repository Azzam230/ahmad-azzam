"use client";

import { useMemo, useState, type CSSProperties } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  MessageCircle,
  MousePointerClick,
  RotateCcw,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Counter, Reveal, cardMotionProps } from "@/components/motion";
import { cn } from "@/lib/utils";

const WHATSAPP_NUMBER = "9647859434040";

type GoalId = "cro" | "seo" | "automation";
type TrafficId = "low" | "mid" | "high";
type BottleneckId = "visibility" | "conversion" | "ads" | "interface";

const GOALS: { id: GoalId; label: string; icon: typeof TrendingUp }[] = [
  { id: "cro", label: "زيادة المبيعات ومعدل التحويل", icon: TrendingUp },
  { id: "seo", label: "تصدر محركات البحث والـ AI", icon: MousePointerClick },
  { id: "automation", label: "أتمتة العمليات", icon: Bot },
];

const TRAFFIC: { id: TrafficId; label: string; hint: string }[] = [
  { id: "low", label: "أقل من 1,000", hint: "زيارة / شهر" },
  { id: "mid", label: "1,000 – 10,000", hint: "زيارة / شهر" },
  { id: "high", label: "أكثر من 10,000", hint: "زيارة / شهر" },
];

const BOTTLENECKS: { id: BottleneckId; label: string; hint: string }[] = [
  { id: "visibility", label: "عدم التواجد في Google/AI", hint: "الموقع لا يظهر في نتائج البحث أو الذكاء الاصطناعي" },
  { id: "conversion", label: "لا توجد مبيعات رغم وجود الزيارات", hint: "زيارات كثيرة لكن مبيعات قليلة" },
  { id: "ads", label: "تكلفة الإعلانات مرتفعة", hint: "مصاريف إعلانية عالية بعائد ضعيف" },
  { id: "interface", label: "تجربة الموقع وبطء الصفحات", hint: "أداء وسرعة وتصميم الصفحة" },
];

const TRAFFIC_WEIGHT: Record<TrafficId, number> = {
  low: 0,
  mid: 15,
  high: 30,
};

const GOAL_BONUS: Record<
  GoalId,
  { conversion: number; visibility: number; automation: number }
> = {
  cro: { conversion: 22, visibility: 5, automation: 10 },
  seo: { conversion: 8, visibility: 22, automation: 10 },
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
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ fullName?: string; phone?: string }>(
    {}
  );
  const [sent, setSent] = useState(false);

  const canContinue = useMemo(() => {
    if (step === 0) return goal !== null;
    if (step === 1) return url.trim().length > 3 && traffic !== null;
    if (step === 2) return bottleneck !== null;
    return true;
  }, [step, goal, url, traffic, bottleneck]);

  const analysis = useMemo(() => {
    const g = goal ?? "cro";
    const t = traffic ?? "mid";
    const bonus = GOAL_BONUS[g];
    const hasUrl = url.trim().length > 3;

    let interfaceScore = 52 + (hasUrl ? 12 : 0);
    let visibilityScore = 30 + TRAFFIC_WEIGHT[t] + bonus.visibility;
    let conversionScore = 40 + bonus.conversion + (hasUrl ? 6 : 0);
    let automationScore = 24 + bonus.automation;

    if (bottleneck === "visibility") visibilityScore -= 10;
    if (bottleneck === "ads") visibilityScore -= 8;
    if (bottleneck === "conversion") conversionScore -= 10;
    if (bottleneck === "interface") interfaceScore -= 10;

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
    setFullName("");
    setPhone("");
    setErrors({});
    setSent(false);
  };

  const next = () => {
    if (!canContinue) return;
    if (step < 2) setStep((s) => s + 1);
    else setShowResult(true);
  };

  const selectedLabel = <T extends { id: string; label: string }>(
    list: T[],
    id: string | null
  ) => (list.find((i) => i.id === id)?.label ?? "");

  const submitLead = () => {
    const nextErrors: typeof errors = {};
    if (fullName.trim().length < 2)
      nextErrors.fullName = "أدخل اسمك الكامل";
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 8)
      nextErrors.phone = "أدخل رقم هاتف صحيح (خانة 8 أرقام على الأقل)";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const message = [
      "مرحباً أحمد، قمت بإجراء فحص مؤشر النمو الرقمي للموقع:",
      "",
      `👤 الاسم: ${fullName.trim()}`,
      `📞 الهاتف: ${phone.trim()}`,
      `🌐 رابط الموقع: ${url.trim()}`,
      `📊 حجم الزيارات: ${selectedLabel(TRAFFIC, traffic)}`,
      `🎯 الهدف الرئيسي: ${selectedLabel(GOALS, goal)}`,
      `⚠️ العائق الحالي: ${selectedLabel(BOTTLENECKS, bottleneck)}`,
      `📈 مؤشر الجاهزية الأولي: ${analysis.score}/100`,
      "",
      "أرغب في حجز جلسة استراتيجية لمراجعة هذه النتائج وتطوير المنظومة.",
    ].join("\n");

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
    setSent(true);
  };

  return (
    <section
      id="audit"
      className="scroll-mt-16 border-b border-zinc-200 bg-ink text-white"
    >
      <div className="container py-20 lg:py-28">
        <div className="flex items-center justify-between">
          <p className="text-xs font-light text-emerald-400">
            أداة تقييم الجاهزية الرقمية
          </p>
          <span className="text-sm font-thin tracking-wider text-white/25">
            05
          </span>
        </div>

        <Reveal className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-balance font-display text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]">
              فحص مجاني لمؤشر نمو موقعك
            </h2>
            <p className="mt-4 max-w-2xl font-light leading-relaxed text-zinc-300">
              ثلاث خطوات فقط، ثم تحصل على مؤشر أولي لجاهزية منظومتك الرقمية مع
              توصية عملية بأهم نقطة تحسين.
            </p>
          </div>
          <p className="shrink-0 text-xs font-light text-zinc-400">
            يستغرق أقل من دقيقتين
          </p>
        </Reveal>

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
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
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
                      "hidden text-xs font-semibold sm:inline",
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
              <p className="text-xs font-light text-zinc-500">
                الخطوة {step + 1} من 3 — {STEPS[step].label}
              </p>
              <h3 className="mt-2 font-display text-2xl font-black tracking-tight">
                {STEPS[step].title}
              </h3>

              {step === 0 && (
                <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-zinc-800 bg-zinc-800 sm:grid-cols-3">
                  {GOALS.map((g) => (
                    <motion.button
                      key={g.id}
                      type="button"
                      onClick={() => setGoal(g.id)}
                      {...cardMotionProps}
                      className={cn(
                        "flex flex-col items-start gap-4 bg-[#111113] p-5 text-start transition-colors duration-300 ease-in-out",
                        goal === g.id && "bg-emerald-600 hover:bg-emerald-600"
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
                          "text-base font-semibold",
                          goal === g.id ? "text-white" : "text-white"
                        )}
                      >
                        {g.label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              )}

              {step === 1 && (
                <div className="mt-8 space-y-6">
                  <div>
                    <label
                      htmlFor="site-url"
                      className="text-sm font-semibold text-zinc-300"
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
                    <p className="text-sm font-semibold text-zinc-300">
                      حجم الزيارات الشهرية
                    </p>
                    <div className="mt-2 grid gap-px overflow-hidden rounded-xl border border-zinc-800 bg-zinc-800 sm:grid-cols-3">
                      {TRAFFIC.map((t) => (
                        <motion.button
                          key={t.id}
                          type="button"
                          onClick={() => setTraffic(t.id)}
                          {...cardMotionProps}
                          className={cn(
                            "flex flex-col items-start gap-1 bg-[#111113] px-4 py-4 text-start transition-colors duration-300 ease-in-out",
                            traffic === t.id && "bg-emerald-600"
                          )}
                        >
                          <span className="text-sm font-semibold text-white">
                            {t.label}
                          </span>
                          <span className="text-[11px] font-light text-white/50">
                            {t.hint}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-zinc-800 bg-zinc-800 sm:grid-cols-2">
                  {BOTTLENECKS.map((b) => (
                    <motion.button
                      key={b.id}
                      type="button"
                      onClick={() => setBottleneck(b.id)}
                      {...cardMotionProps}
                      className={cn(
                        "flex flex-col items-start gap-2 bg-[#111113] px-5 py-5 text-start transition-colors duration-300 ease-in-out",
                        bottleneck === b.id && "bg-emerald-600"
                      )}
                    >
                      <span className="text-base font-semibold text-white">
                        {b.label}
                      </span>
                      <span className="text-sm font-light leading-relaxed text-white/50">
                        {b.hint}
                      </span>
                    </motion.button>
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
                  <p className="text-xs font-light text-zinc-500">
                    مؤشر جاهزية منظومتك الرقمية
                  </p>
                  <div className="mt-4 flex items-end gap-2">
                    <Counter
                      value={analysis.score}
                      className="font-display text-7xl font-black tracking-tight text-white lg:text-8xl"
                    />
                    <span className="mb-3 text-lg font-semibold text-white/40">
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
                  <p className="mt-6 border-t border-zinc-800 pt-5 text-sm font-light leading-relaxed text-zinc-300">
                    أبرز نقطة قصور لديك:{" "}
                    <span className="font-semibold text-white">
                      {analysis.weakest.label}
                    </span>
                    . ننصح بالبدء منها ثم بناء بقية المنظومة حولها.
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
                    {analysis.bars.map((bar) => (
                      <div key={bar.label}>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-zinc-200">
                            {bar.label}
                          </span>
                          <span className="text-sm font-semibold text-white">
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

              <div className="mt-10 border-t border-zinc-800 pt-8">
                <div className="grid gap-6 lg:grid-cols-12">
                  <div className="lg:col-span-5">
                    <h4 className="text-lg font-bold text-white">
                      احصل على التحليل الكامل
                    </h4>
                    <p className="mt-2 text-sm font-light leading-relaxed text-zinc-300">
                      أدخل بياناتك وسنرسل لك التحليل الكامل عبر واتساب، مع
                      تحديد موعد لجلسة استراتيجية مجانية لمراجعة نتائجك.
                    </p>
                  </div>
                  <div className="lg:col-span-7">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        submitLead();
                      }}
                      className="space-y-4"
                    >
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="lead-name"
                            className="text-sm font-semibold text-zinc-300"
                          >
                            الاسم الكامل
                          </label>
                          <Input
                            id="lead-name"
                            placeholder="مثال: أحمد محمد"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className={cn(
                              "mt-2 border-white/20 bg-[#111113] text-white placeholder:text-white/30 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20",
                              errors.fullName &&
                                "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20"
                            )}
                          />
                          {errors.fullName && (
                            <p className="mt-1 text-xs text-red-400">
                              {errors.fullName}
                            </p>
                          )}
                        </div>
                        <div>
                          <label
                            htmlFor="lead-phone"
                            className="text-sm font-semibold text-zinc-300"
                          >
                            رقم الهاتف
                          </label>
                          <Input
                            id="lead-phone"
                            dir="ltr"
                            inputMode="tel"
                            placeholder="07XXXXXXXX"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className={cn(
                              "mt-2 border-white/20 bg-[#111113] text-white placeholder:text-white/30 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20",
                              errors.phone &&
                                "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20"
                            )}
                          />
                          {errors.phone && (
                            <p className="mt-1 text-xs text-red-400">
                              {errors.phone}
                            </p>
                          )}
                        </div>
                      </div>
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full sm:w-auto"
                      >
                        <MessageCircle />
                        احصل على التحليل الكامل + احجز جلسة استراتيجية عبر الواتساب
                      </Button>
                      {sent && (
                        <p className="text-sm font-light text-emerald-400">
                          تم فتح واتساب برسالتك الجاهزة — أرسلها لتأكيد حجز
                          الجلسة.
                        </p>
                      )}
                    </form>
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
