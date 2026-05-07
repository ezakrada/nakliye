import { getSiteConfig } from "@/lib/site-server";
import { ContactCta } from "./ContactCta";

export async function ContactSection() {
  const config = await getSiteConfig();
  return <ContactCta config={config} />;
}
