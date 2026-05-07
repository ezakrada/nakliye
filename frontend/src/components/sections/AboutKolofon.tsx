import { SectionMark } from "@/components/atlas/SectionMark";
import { SafeImage } from "@/components/atlas/SafeImage";

const milestones = [
  { year: "2014", text: "Bir kamyonla Kadıköy'de başladık. Adımız Eşyam." },
  { year: "2016", text: "İlk şehirler arası rota: İstanbul → Ankara. Bir gün, dört kişi." },
  { year: "2019", text: "Hassas eşya ekibi kuruldu. İlk müze projesi tamamlandı." },
  { year: "2022", text: "Anadolu Sigorta ile çerçeve anlaşma. Standart poliçe 250.000 ₺." },
  { year: "2025", text: "28 araç, 64 isim, 41 il. Dosyalar açık." },
];

export function AboutKolofon() {
  return (
    <section id="hakkimizda" className="relative py-24 lg:py-32">
      <div className="section-x">
        <SectionMark num="07" coord="2014'ten beri" label="Hakkımızda" />

        <div className="mx-auto max-w-[640px]">
          <h2 className="h-display-tight text-[clamp(2.4rem,5vw,3.6rem)] leading-[1.05]">
            On iki yıl önce bir kamyon, bir defter, üç kişi.{" "}
            <span className="text-[var(--accent-signal)]">
              Hâlâ aynı defterdeyiz.
            </span>
          </h2>

          <div className="prose mt-10 max-w-none text-[16.5px] leading-[1.7] text-[var(--text-secondary)]">
            <p>
              Eşyam, klasik nakliye sektörünün karşıtı bir hikâye. Komisyoncu yok,
              taşeron yok, gizli ücret yok. Sahanın içinden gelen bir ekibin, eşyanın
              taşındığı kadar emek de taşıyacağına inanmasıyla kuruldu.
            </p>
            <p className="mt-5">
              Her dosya bir taşınmadır; her taşınma bir hikaye. Biz işin teknik
              kısmını üstlendiğimiz için, sizin tarafınız sadece geri dönüşle yeni
              eve ısınmak.
            </p>
          </div>

          {/* Üniformalı saha ekibi — TR güven sinyali, doğrulanmış mover photo */}
          <figure className="mt-14 overflow-hidden rounded-[18px] border border-[var(--hairline-strong)]">
            <div className="relative aspect-[3/2] w-full overflow-hidden bg-[var(--bg-mist)]">
              <SafeImage
                src="https://images.pexels.com/photos/4506270/pexels-photo-4506270.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&fit=crop"
                alt="Eşyam saha ekibi"
                fallbackSeed="team"
                fallbackW={900}
                fallbackH={600}
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(11,18,32,0.55)] via-transparent to-transparent" />
              <figcaption className="absolute bottom-3 left-4 text-[11px] font-semibold tracking-[0.12em] text-white drop-shadow-md">
                Saha ekibimiz · 64 üniformalı isim
              </figcaption>
            </div>
          </figure>

          {/* Hairline + milestones */}
          <div className="mt-10 border-t border-[var(--hairline-strong)] pt-8">
            <span className="coord">KRONOLOJİ</span>
            <ol className="mt-5 space-y-0">
              {milestones.map((m) => (
                <li
                  key={m.year}
                  className="grid grid-cols-[80px_1fr] items-baseline gap-4 border-b border-[var(--hairline)] py-3 last:border-b-0"
                >
                  <span className="num text-sm font-semibold text-[var(--accent-signal)]">
                    {m.year}
                  </span>
                  <span className="text-[15px] text-[var(--text-primary)]">
                    {m.text}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* Signature with founder portrait */}
          <div className="mt-12 flex items-center gap-4 border-t border-[var(--hairline-strong)] pt-5">
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full border border-[var(--hairline-strong)] bg-[var(--bg-mist)]">
              <SafeImage
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop"
                alt="Mahmut Eren — Kurucu"
                fallbackSeed="founder"
                fallbackW={200}
                fallbackH={200}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="num text-sm font-semibold text-[var(--text-primary)]">
                MAHMUT EREN
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text-tertiary)]">
                Kurucu
              </p>
            </div>
            <p className="text-right text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text-tertiary)]">
              Eşyam Nakliyat
              <br />
              İstanbul · 2014
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
