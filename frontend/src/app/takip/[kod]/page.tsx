import { TrackingView } from "@/components/sections/TrackingView";

type Props = {
  params: Promise<{ kod: string }>;
};

export default async function TakipDetay({ params }: Props) {
  const { kod } = await params;
  return (
    <main className="relative min-h-dvh pt-28 pb-32 lg:pt-32 lg:pb-20">
      <div className="section-x">
        <TrackingView code={decodeURIComponent(kod).toUpperCase()} />
      </div>
    </main>
  );
}
