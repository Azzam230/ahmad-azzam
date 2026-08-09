import { Award, MessageCircle } from "lucide-react";
import { AUTHOR } from "@/lib/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AuthorCard() {
  return (
    <section
      aria-label="عن الكاتب"
      className="mt-10 rounded-2xl border border-zinc-200 bg-white shadow-card"
    >
      <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-start sm:p-8">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-ink font-display text-2xl font-black text-white">
          ن
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-black uppercase tracking-widest text-emerald-600">
            كاتب المقال
          </p>
          <h3 className="mt-1 text-xl font-black tracking-tight text-ink">
            {AUTHOR.name}
          </h3>
          <p className="mt-0.5 text-sm font-medium text-zinc-500">
            {AUTHOR.role}
          </p>
          <p className="mt-3 text-sm font-light leading-relaxed text-zinc-600">
            {AUTHOR.bio}
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-1 lg:grid-cols-3">
            {AUTHOR.credentials.map((credential) => (
              <li
                key={credential}
                className="flex items-start gap-2 text-xs font-medium leading-relaxed text-zinc-500"
              >
                <Award className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                {credential}
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href={`https://wa.me/${AUTHOR.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ size: "sm" }), "no-underline")}
            >
              <MessageCircle />
              احجز جلسة استراتيجية
            </a>
            <a
              href={AUTHOR.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold text-zinc-500 transition-colors duration-300 ease-in-out hover:text-emerald-600"
            >
              لينكد إن
            </a>
            <a
              href={AUTHOR.x}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold text-zinc-500 transition-colors duration-300 ease-in-out hover:text-emerald-600"
            >
              إكس
            </a>
            <a
              href={`mailto:${AUTHOR.email}`}
              className="text-xs font-bold text-zinc-500 transition-colors duration-300 ease-in-out hover:text-emerald-600"
            >
              البريد
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
