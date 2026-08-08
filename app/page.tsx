import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Manifesto } from "@/components/manifesto";
import { GrowthSystems } from "@/components/growth-systems";
import { Articles } from "@/components/articles";
import { GrowthAudit } from "@/components/growth-audit";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Manifesto />
        <GrowthSystems />
        <Articles />
        <GrowthAudit />
      </main>
      <SiteFooter />
    </>
  );
}
