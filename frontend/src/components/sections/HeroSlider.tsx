import { getActiveSlides } from "@/lib/site-server";
import { HeroSliderClient } from "./HeroSliderClient";

export async function HeroSlider() {
  const slides = await getActiveSlides();
  if (!slides.length) return null;
  return <HeroSliderClient slides={slides} />;
}
