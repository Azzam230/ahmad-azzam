import type { Metadata } from "next";
import { fontPrimary } from "@/app/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "مستشار النمو الرقمي والأنظمة الذكية",
  description:
    "نحوّل التسويق، التقنية، والذكاء الاصطناعي إلى محرك نمو أوتوماتيكي للشركات. استشارات استراتيجية، تحويل أعلى، وتصدر محركات البحث والـ AI.",
  keywords: [
    "استشارات النمو الرقمي",
    "تحسين معدل التحويل",
    "SEO",
    "GEO",
    "أتمتة الذكاء الاصطناعي",
    "أنظمة ذكية",
    "مستشار نمو رقمي",
  ],
  openGraph: {
    title: "مستشار النمو الرقمي والأنظمة الذكية",
    description:
      "منظومة رقمية متكاملة يخدم فيها الموقع والذكاء الاصطناعي أهداف المبيعات مباشرة.",
    type: "website",
    locale: "ar_SA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={fontPrimary.variable}>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
