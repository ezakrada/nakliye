import { SiteShell } from "@/components/layout/SiteShell";
import { notFound } from "next/navigation";

const docs = {
  kvkk: {
    title: "KVKK Aydınlatma Metni",
    intro:
      "Eşyam Nakliyat olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında veri sorumlusu sıfatıyla kişisel verilerinizi işliyoruz.",
    body: [
      ["Hangi veriler", "Ad, soyad, telefon, e-posta, taşınma adresleri, ödeme bilgileri."],
      ["İşleme amacı", "Teklif hazırlama, taşıma hizmetinin yürütülmesi, fatura, sigorta poliçesi, iletişim."],
      ["Hukuki sebep", "KVKK m.5/2 (sözleşmenin kurulması), m.5/2-f (meşru menfaat), açık rıza (pazarlama)."],
      ["Saklama süresi", "Hizmet ilişkisi sonrası 10 yıl (mali mevzuat) — açık rıza ile alınanlar rıza geri çekilene kadar."],
      ["Haklarınız", "KVKK m.11 — bilgi alma, düzeltme, silme, işlemeye itiraz, taşınabilirlik."],
      ["İletişim", "Talepleriniz için: kvkk@esyam.com.tr"],
    ],
  },
  cerez: {
    title: "Çerez Politikası",
    intro:
      "Sitemiz; deneyimi iyileştirmek, kullanım istatistikleri toplamak ve teklif formundaki tercihlerinizi hatırlamak için çerezler kullanır.",
    body: [
      ["Zorunlu", "Oturum, dil tercihi, KVKK onayı. Devre dışı bırakılamaz."],
      ["Performans", "Sayfa yükleme, hata raporu — tarafsız analiz amaçlı."],
      ["Pazarlama", "Reklam ve dönüşüm ölçümü — sadece açık rıza ile."],
      ["Yönetim", "Tarayıcı ayarlarından silebilir veya bizden talep edebilirsiniz."],
    ],
  },
  sozlesme: {
    title: "Hizmet Sözleşmesi",
    intro:
      "Aşağıdaki şartlar müşteri ve Eşyam Nakliyat arasındaki taşıma hizmetinin temel koşullarını düzenler.",
    body: [
      ["Hizmet", "Belirlenen tarih ve adresler arasında, sigortalı ve kayıtlı taşıma."],
      ["Fiyat", "Foto-envanter sonrası kesinleşen tutar; fatura yasal süresinde düzenlenir."],
      ["İptal", "48 saat öncesine kadar ücretsiz; 24 saatten kısa süre %25 hizmet bedeli."],
      ["Hasar", "Anadolu Sigorta poliçesi kapsamı dahilinde — fotoğraflı tutanak ile."],
      ["Mücbir sebep", "Olağanüstü hava, doğal afet, kamu yasağı durumunda taşıma yeniden planlanır."],
    ],
  },
  "iletisim-onayi": {
    title: "İletişim İzni",
    intro: "Aşağıdaki kanallar üzerinden iletişim almayı tercih ediyorsanız ilgili rızayı verebilirsiniz.",
    body: [
      ["Servis bildirimleri", "Taşıma günü, takip kodu, ekip varış uyarıları — varsayılan açık."],
      ["Pazarlama (SMS)", "Kampanya ve indirim — açık rıza."],
      ["Pazarlama (E-posta)", "Aylık bülten, sezon önerileri — açık rıza."],
      ["Geri çekme", "kvkk@esyam.com.tr adresine 'iletişimi durdur' yazmanız yeterlidir."],
    ],
  },
} as const;

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = (docs as Record<string, (typeof docs)[keyof typeof docs]>)[slug];
  if (!doc) notFound();

  return (
    <SiteShell hideMobileBar>
      <main className="pt-28 pb-32 lg:pt-36">
        <div className="section-x">
          <div className="mx-auto max-w-3xl">
            <span className="h-eyebrow">Yasal</span>
            <h1 className="h-display mt-3 text-[clamp(1.8rem,3.6vw,2.4rem)]">{doc.title}</h1>
            <p className="mt-4 text-[15px] leading-relaxed text-[var(--text-secondary)]">{doc.intro}</p>
            <dl className="mt-10 space-y-5">
              {doc.body.map(([k, v]) => (
                <div key={k} className="rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-elevated)] p-5">
                  <dt className="h-eyebrow">{k}</dt>
                  <dd className="mt-1 text-[15px] leading-relaxed text-[var(--text-primary)]">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
