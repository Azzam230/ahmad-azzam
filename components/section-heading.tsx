import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  index?: string;
  kicker: string;
  title: string;
  description?: string;
  dark?: boolean;
}

export function SectionHeading({
  index,
  kicker,
  title,
  description,
  dark = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "border-b pb-6",
        dark ? "border-white/10" : "border-zinc-200"
      )}
    >
      <div className="flex items-center justify-between">
        <p
          className={cn(
            "text-xs font-bold",
            dark ? "text-emerald-400" : "text-emerald-700"
          )}
        >
          {kicker}
        </p>
        {index && (
          <span
            className={cn(
              "text-sm font-black",
              dark ? "text-white/25" : "text-zinc-300"
            )}
          >
            {index}
          </span>
        )}
      </div>
      <h2
        className={cn(
          "mt-3 max-w-3xl font-display text-3xl font-black leading-tight tracking-tighter text-balance sm:text-4xl lg:text-[2.75rem]",
          dark ? "text-white" : "text-ink"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-base leading-relaxed",
            dark ? "text-zinc-300" : "text-zinc-500"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
