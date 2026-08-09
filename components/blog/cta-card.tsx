import { ArrowLeft, MessageCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { BookingTrigger } from "@/components/booking-trigger";
import { cn } from "@/lib/utils";

const WHATSAPP_NUMBER = "9647859434040";

interface CtaCardProps {
  title: string;
  text?: string;
  mode?: "booking" | "whatsapp";
  whatsappLabel?: string;
}

export function CtaCard({
  title,
  text,
  mode = "booking",
  whatsappLabel = "تواصل معي لتحديد الخيار الأفضل",
}: CtaCardProps) {
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
        {mode === "whatsapp" ? (
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              "مرحباً أحمد، أريد مناقشة الخيار الأنسب لموقعي الإلكتروني."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: "lg" }), "no-underline")}
          >
            <MessageCircle className="shrink-0" />
            {whatsappLabel}
          </a>
        ) : (
          <>
            <a
              href="/#audit"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "no-underline"
              )}
            >
              افحص مؤشر نمو مشروعك الآن
              <ArrowLeft className="rtl:rotate-0 ltr:rotate-180" />
            </a>
            <BookingTrigger size="lg">
              <MessageCircle className="shrink-0" />
              احجز جلسة استراتيجية
            </BookingTrigger>
          </>
        )}
      </div>
    </aside>
  );
}
