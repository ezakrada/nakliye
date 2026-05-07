import { getSiteConfig } from "@/lib/site-server";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileBottomBar } from "./MobileBottomBar";

export async function SiteShell({
  children,
  hideMobileBar = false,
}: {
  children: React.ReactNode;
  hideMobileBar?: boolean;
}) {
  const config = await getSiteConfig();
  return (
    <>
      <Header config={config} />
      {children}
      <Footer config={config} />
      {hideMobileBar ? null : <MobileBottomBar config={config} />}
    </>
  );
}
