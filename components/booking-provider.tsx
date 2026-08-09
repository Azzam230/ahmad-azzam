"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
  type FormEvent,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const WHATSAPP_NUMBER = "9647859434040";

type BookingContextValue = {
  openBooking: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}

const GOALS = [
  { id: "cro", label: "زيادة المبيعات ومعدل التحويل (CRO)" },
  { id: "seo-geo", label: "تصدر محركات البحث والـ AI (SEO/GEO)" },
  { id: "automation", label: "أتمتة العمليات بالذكاء الاصطناعي" },
  { id: "strategy", label: "استراتيجية نمو شاملة" },
];

function BookingForm({ onDone }: { onDone: () => void }) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [goal, setGoal] = useState<string | null>(null);
  const [attempted, setAttempted] = useState(false);

  const errors = {
    name: name.trim() === "",
    company: company.trim() === "",
    phone: phone.replace(/\D/g, "").length < 8,
    goal: goal === null,
  };
  const hasErrors = Object.values(errors).some(Boolean);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAttempted(true);
    if (hasErrors) return;

    const message = [
      "مرحباً أحمد، أرغب في حجز جلسة استراتيجية:",
      `👤 الاسم: ${name.trim()}`,
      `🏢 الشركة / الموقع: ${company.trim()}`,
      `📞 الهاتف: ${phone.trim()}`,
      `🎯 الهدف الرئيسي: ${GOALS.find((g) => g.id === goal)?.label ?? ""}`,
    ].join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    onDone();
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5 p-6">
      <div>
        <Label htmlFor="bk-name">الاسم الكامل</Label>
        <Input
          id="bk-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="مثال: محمد العلي"
          className={cn(
            "mt-2",
            attempted &&
              errors.name &&
              "border-red-400 focus-visible:border-red-500 focus-visible:ring-red-500/20"
          )}
        />
        {attempted && errors.name && (
          <p className="mt-1.5 text-xs font-medium text-red-500">
            الرجاء إدخال الاسم الكامل
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="bk-company">اسم الشركة / الموقع</Label>
        <Input
          id="bk-company"
          dir="ltr"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="example.com"
          className={cn(
            "mt-2",
            attempted &&
              errors.company &&
              "border-red-400 focus-visible:border-red-500 focus-visible:ring-red-500/20"
          )}
        />
        {attempted && errors.company && (
          <p className="mt-1.5 text-xs font-medium text-red-500">
            الرجاء إدخال اسم الشركة أو رابط الموقع
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="bk-phone">رقم الهاتف / الواتساب</Label>
        <Input
          id="bk-phone"
          dir="ltr"
          type="tel"
          inputMode="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+964 7XX XXXXXXX"
          className={cn(
            "mt-2",
            attempted &&
              errors.phone &&
              "border-red-400 focus-visible:border-red-500 focus-visible:ring-red-500/20"
          )}
        />
        {attempted && errors.phone && (
          <p className="mt-1.5 text-xs font-medium text-red-500">
            الرجاء إدخال رقم هاتف صحيح
          </p>
        )}
      </div>

      <div>
        <Label>التحدي الرئيسي أو الهدف</Label>
        <div className="mt-2 grid gap-px overflow-hidden rounded-xl border border-zinc-200 bg-zinc-200 sm:grid-cols-2">
          {GOALS.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setGoal(g.id)}
              className={cn(
                "flex items-center justify-between gap-2 bg-white px-4 py-3 text-start text-sm font-medium transition-all duration-300 ease-in-out",
                goal === g.id
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-zinc-700 hover:bg-zinc-50"
              )}
            >
              {g.label}
              {goal === g.id && <Check className="h-4 w-4 shrink-0" />}
            </button>
          ))}
        </div>
        {attempted && errors.goal && (
          <p className="mt-1.5 text-xs font-medium text-red-500">
            اختر هدف الجلسة من الخيارات
          </p>
        )}
      </div>

      <Button type="submit" size="lg" className="w-full">
        <MessageCircle />
        إرسال عبر الواتساب
      </Button>
      <p className="text-center text-xs text-zinc-400">
        سيُفتح واتساب في نافذة جديدة لإكمال إرسال الطلب.
      </p>
    </form>
  );
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openBooking = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  return (
    <BookingContext.Provider value={{ openBooking }}>
      {children}
      <AnimatePresence>
        {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/60 p-4 backdrop-blur-sm sm:items-center"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="حجز جلسة استراتيجية للنمو الرقمي"
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-white shadow-card"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-zinc-100 p-6">
              <div>
                <h2 className="font-display text-xl font-black tracking-tight text-ink">
                  حجز جلسة استراتيجية للنمو الرقمي
                </h2>
                <p className="mt-1.5 text-sm font-light leading-relaxed text-zinc-500">
                  ادخل بيانات مشروعك وسنتواصل معك لتحديد موعد الجلسة.
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={close}
                aria-label="إغلاق النافذة"
              >
                <X />
              </Button>
            </div>
            <BookingForm onDone={close} />
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>
    </BookingContext.Provider>
  );
}
