import { ArrowLeft, MessageCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { BookingTrigger } from "@/components/booking-trigger";
import { cn } from "@/lib/utils";

export function CtaCard({ title, text }: { title: string; text?: string }) {
  return (
    <aside className="my-10 overflow-hidden rounded-2xl border border-emerald-500/20 bg-white/70 p-6 shadow-card backdrop-blur-md sm:p-8">
      <h2 className="text-balance font-display text-2xl font-black leading-snug tracking-tight text-ink sm:text-3xl">
        {title}
      </h2>
      {text && (
        <p className="mt-3 max-w-2xl font-serif text-base font-light leading-relaxed text-zinc-500">
          {text}
        </p>
      )}
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <a
          href="/#audit"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }), "no-underline")}
        >
          افحص مؤشر نمو مشروعك الآن
          <ArrowLeft className="rtl:rotate-0 ltr:rotate-180" />
        </a>
        <BookingTrigger size="lg">
          <MessageCircle className="shrink-0" />
          احجز جلسة استراتيجية
        </BookingTrigger>
      </div>
    </aside>
  );
}
