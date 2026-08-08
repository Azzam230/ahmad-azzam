import { AtSign, Briefcase, Mail } from "lucide-react";

const NAV_LINKS = [
  { label: "المنظومة", href: "#systems" },
  { label: "فلسفة العمل", href: "#philosophy" },
  { label: "أداة النمو", href: "#audit" },
  { label: "مقالات", href: "#articles" },
];

const SOCIAL = [
  { label: "لينكد إن", href: "https://www.linkedin.com/", icon: Briefcase },
  { label: "إكس", href: "https://x.com/", icon: AtSign },
  { label: "البريد", href: "mailto:hello@example.com", icon: Mail },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white">
      <div className="container py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <a href="#top" className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink text-sm font-bold text-white">
                ن
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-sm font-bold text-ink">أحمد عزام</span>
                <span className="mt-1 text-[11px] font-medium text-zinc-500">
                  نمو رقمي وأنظمة ذكية
                </span>
              </span>
            </a>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-zinc-500">
              استشارات استراتيجية في النمو الرقمي، تحسين التحويل، التصدر في
              محركات البحث والذكاء الاصطناعي، وأتمتة العمليات — منظومة واحدة
              تخدم المبيعات مباشرة.
            </p>
            <div className="mt-8 flex items-center gap-2">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 transition-all duration-300 ease-in-out hover:border-emerald-600 hover:bg-emerald-50 hover:text-emerald-600"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs font-bold text-zinc-400">أقسام الموقع</p>
            <ul className="mt-4 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm font-medium text-zinc-700 transition-all duration-300 ease-in-out hover:text-emerald-600"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-xs font-bold text-zinc-400">ابدأ الآن</p>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500">
              افحص مؤشر نمو موقعك، أو احجز جلسة استراتيجية مباشرة.
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <a
                href="mailto:hello@example.com"
                className="text-sm font-bold text-emerald-600 underline-offset-4 hover:text-emerald-700 hover:underline"
              >
                hello@example.com
              </a>
              <a
                href="#audit"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-zinc-200 bg-white px-6 text-sm font-bold text-ink shadow-subtle transition-all duration-300 ease-in-out hover:bg-zinc-50"
              >
                فحص مؤشر النمو — مجاني
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-zinc-200 pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} أحمد عزام — نمو رقمي. جميع الحقوق محفوظة.
          </p>
          <p>تصميم تحريري عربي معاصر — يعتمد على الوضوح لا على الزخرفة.</p>
        </div>
      </div>
    </footer>
  );
}
