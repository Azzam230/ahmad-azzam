import { Tajawal } from "next/font/google";

export const fontPrimary = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-primary",
  display: "swap",
});
