# nakliye — Premium Nakliye Sitesi (Next.js)

**Next.js 15 + App Router + TypeScript + Tailwind CSS** üzerine kurulu, Türk nakliye/taşımacılık sektörü için tasarlanmış vitrin + iletişim sitesi. JSON dosya tabanlı veri (DB yok), full SSR, Atlas Concierge / Tokyo-anime hibrit görsel dil.

---

## İçindekiler

1. [Özellikler](#özellikler)
2. [Teknoloji yığını](#teknoloji-yığını)
3. [Klasör yapısı](#klasör-yapısı)
4. [Kurulum](#kurulum)
5. [Geliştirme](#geliştirme)
6. [Production build](#production-build)
7. [Veri yapısı (seed.json)](#veri-yapısı-seedjson)
8. [Yapılandırılması gerekenler](#yapılandırılması-gerekenler)
9. [Admin paneline erişim](#admin-paneline-erişim)
10. [Demo reset](#demo-reset)
11. [Production'a deploy](#productiona-deploy)
12. [Güvenlik notları](#güvenlik-notları)
13. [Sorun giderme](#sorun-giderme)

---

## Özellikler

- 🚚 **Hizmetler** — şehirlerarası, evden eve, kurumsal, asansörlü
- 📋 **Online teklif** — adres + tarih + eşya formu, e-posta gönderimi
- 🛒 **Filo görüntüsü** — araç parkı slider'ı (kamyonet → tır)
- 🌍 **Hakkımızda** — kurumsal kimlik, ekip, değerler
- 📞 **İletişim formu** — gelen mesajlar admin'e e-posta + JSON kayıt
- 🎯 **Admin paneli** — JSON tabanlı içerik düzenleyici (DB yok)
- 🌟 **SEO** — Next.js metadata API, sitemap, robots.txt, OG tags
- 📱 **Mobile-first** — responsive layout, touch-friendly slider
- ⚡ **App Router + RSC** — server components ile bundle minimize

---

## Teknoloji yığını

| Katman | Teknoloji |
|---|---|
| Framework | Next.js 15 (App Router) |
| Dil | TypeScript |
| Stil | Tailwind CSS + custom CSS |
| Veri | JSON dosyaları (DB yok) |
| Animasyon | Framer Motion |
| Form | Native + server actions |
| Deploy | Docker (Node 20-alpine) |

---

## Klasör yapısı

```
nakliye/
├── frontend/
│   ├── src/
│   │   └── app/
│   │       ├── page.tsx               # Anasayfa
│   │       ├── layout.tsx
│   │       ├── globals.css
│   │       ├── hizmetler/page.tsx
│   │       ├── filomuz/page.tsx
│   │       ├── hakkimizda/page.tsx
│   │       ├── iletisim/page.tsx
│   │       ├── admin/                  # Admin paneli (auth'lu)
│   │       └── api/                    # Route handlers (form post, admin CRUD)
│   ├── public/                         # Statik (favicon, OG image, vs.)
│   ├── package.json
│   ├── next.config.js
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   └── Dockerfile                      # Multi-stage Node 20
├── snapshot/
│   ├── seed.json                       # Demo veri (hizmetler, filo, ekip, vs.)
│   └── demo-reset.sh                   # data/ → snapshot/seed.json'dan kopya
├── docker-compose.yml
└── README.md
```

> 🔍 `node_modules/`, `.next/` build artefactları **gitignore**'da.

---

## Kurulum

```bash
git clone https://github.com/ezakrada/nakliye.git
cd nakliye
docker compose up -d --build
```

| Servis | Container | Port | Adres |
|---|---|---|---|
| `nakliye-web` | `demo-nakliye-web` | `127.0.0.1:8091` → 3000 | http://localhost:8091 |

> 🔒 Port `127.0.0.1`'e bind. Public erişim için host nginx + TLS gerekir.

---

## Geliştirme

```bash
cd frontend
npm install   # veya pnpm install
npm run dev   # http://localhost:3000
```

Hot reload aktif. Veri değişikliği için `snapshot/seed.json`'u düzenle veya admin panelinden ekle.

---

## Production build

```bash
cd frontend
npm install --frozen-lockfile
npm run build
npm run start    # standalone server
```

veya Docker'la (`docker-compose.yml` zaten production-ready):

```bash
docker compose up -d --build
```

---

## Veri yapısı (`seed.json`)

`snapshot/seed.json` ~14 KB, şu bölümlerden oluşur:

```json
{
  "hizmetler": [
    { "id": 1, "title": "Şehirlerarası", "description": "...", "icon": "truck", "fiyat_baslangic": "₺2.000" }
  ],
  "filo": [
    { "id": 1, "ad": "Volvo FH16", "tip": "Tır", "kapasite_kg": 24000, "gorsel": "/images/volvo.jpg" }
  ],
  "ekip": [
    { "id": 1, "ad_soyad": "Ali Yılmaz", "unvan": "Genel Müdür", "foto": "..." }
  ],
  "site_ayarlari": {
    "telefon": "+90 ...",
    "whatsapp": "+90 ...",
    "email": "info@nakliye.com",
    "adres": "...",
    "kurumsal_yil": 1995
  },
  "iletisim_mesajlari": []
}
```

Form post'lar `iletisim_mesajlari` array'ine append eder.

---

## Yapılandırılması gerekenler

| Adım | Yer | Açıklama |
|---|---|---|
| 1️⃣ | `snapshot/seed.json` → `site_ayarlari` | Telefon, WhatsApp, e-posta |
| 2️⃣ | `frontend/public/` | Logo, favicon, OG image |
| 3️⃣ | Admin paneli | İçerik (hizmetler, filo, ekip) |
| 4️⃣ | `.env.local` (`frontend/`) | `ADMIN_USER`, `ADMIN_PASS` (basic auth) |
| 5️⃣ | Mail provider | `MAIL_HOST`, `MAIL_USER`, `MAIL_PASS` (Resend / Mailgun / SMTP) |
| 6️⃣ | `next.config.js` | `metadataBase` URL'i production domain'i olsun |

### `.env.local` örneği

```env
ADMIN_USER=admin
ADMIN_PASS=ChangeMeImmediately

# Mail (form gönderimleri için)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=info@nakliye.com
MAIL_PASS=app-password-from-google
MAIL_TO=info@nakliye.com

NEXT_PUBLIC_SITE_URL=https://nakliye.example.com
```

---

## Admin paneline erişim

- **URL:** `/admin`
- **Auth:** HTTP Basic auth — `.env.local` `ADMIN_USER` / `ADMIN_PASS`
- Modüller: Hizmetler · Filo · Ekip · Site Ayarları · Gelen Mesajlar

> 🔐 Default şifreleri **mutlaka değiştir**. Brute-force koruması yok, fail2ban veya rate-limit ekle.

---

## Demo reset

`snapshot/demo-reset.sh` çalıştırıldığında container içindeki `/app/data/` dizini `snapshot/seed.json`'dan kopyalanır → demo başlangıç durumuna dönülür.

```bash
docker exec demo-nakliye-web /opt/snapshot/demo-reset.sh
```

Cron örneği (her gece 03:00):

```cron
0 3 * * * docker exec demo-nakliye-web /opt/snapshot/demo-reset.sh
```

---

## Production'a deploy

```bash
# 1. Sunucu
git clone https://github.com/ezakrada/nakliye.git /opt/nakliye
cd /opt/nakliye

# 2. Production env
cat > frontend/.env.local <<EOF
ADMIN_USER=$(openssl rand -hex 8)
ADMIN_PASS=$(openssl rand -hex 16)
MAIL_HOST=smtp.example.com
MAIL_USER=info@example.com
MAIL_PASS=...
NEXT_PUBLIC_SITE_URL=https://nakliye.example.com
EOF

# 3. Stack
docker compose up -d --build

# 4. Reverse proxy + TLS
sudo certbot --nginx -d nakliye.example.com
```

Host nginx örneği:

```nginx
server {
    listen 443 ssl;
    server_name nakliye.example.com;
    ssl_certificate     /etc/letsencrypt/live/nakliye.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/nakliye.example.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:8091;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Proto https;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_http_version 1.1;
    }
}
```

---

## Güvenlik notları

- 🔐 **Admin basic auth — şifre güçlü olsun.** Brute-force koruma yok.
- 🛡️ İletişim formu spam'a karşı **rate-limit** ekle (Vercel KV / Redis ile)
- 📂 `data/` volume — demo reset cron'u bu dizini sıfırlar
- ⚠️ KVKK: form gönderen müşteri verisi `iletisim_mesajlari` JSON'unda saklanır → retention politika
- 🚨 Server actions CSRF korumalıdır (Next.js default), ek önlem gerekmez
- 📝 `MAIL_PASS` repo'da olmasın — `.env.local` gitignore'da

---

## Sorun giderme

| Sorun | Çözüm |
|---|---|
| Build başarısız (`npm run build`) | Node 20+ olduğundan emin ol. `rm -rf node_modules .next && npm i` |
| `next dev` 500 | `frontend/.env.local` dosyası yok mu? |
| Admin login açılmıyor | Basic auth header'ı browser cache'te eski kalmış — incognito dene |
| Form gönderildi ama mail gelmedi | `docker compose logs nakliye-web` → MAIL_* env doğru mu? |
| `Hydration mismatch` | Server vs client'ta `Date.now()` farklı; `suppressHydrationWarning` ekle veya client-only render |

---

## Lisans

Özel/kapalı kaynak — DemoLion altyapısı.
