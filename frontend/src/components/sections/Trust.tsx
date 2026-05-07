"use client";

import { motion } from "framer-motion";
import { ShieldCheck, BadgeCheck, Clock, Award, Users } from "lucide-react";

const numbers = [
  { value: "14.000+", label: "Tamamlanmış taşıma", Icon: BadgeCheck },
  { value: "%98", label: "Zamanında teslim oranı", Icon: Clock },
  { value: "12 yıl", label: "Sektör tecrübesi", Icon: Award },
  { value: "64", label: "Üniformalı saha ekibi", Icon: Users },
];

const badges = [
  "TOBB Üye",
  "K1 Yetki Belgesi",
  "Anadolu Sigorta",
  "TÜRSAB Belgeli",
  "ISO 9001",
];

export function Trust() {
  return (
    <section id="guvence" className="relative">
      <div className="section-x">
        <div className="overflow-hidden rounded-[40px] border border-[var(--glass-border-strong)] bg-[var(--bg-deep)] px-6 py-14 text-[var(--text-on-deep)] sm:px-12 lg:px-16">
          <div className="grid items-start gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <span className="h-eyebrow text-[#a39a8e]">Güvenceniz</span>
              <h2
                className="h-display mt-3 text-[clamp(1.8rem,3.6vw,2.6rem)]"
                style={{ color: "var(--text-on-deep)" }}
              >
                Eşyanızı güvence altına almadan kamyonumuza koymayız.
              </h2>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#bcb1a3]">
                Her taşıma Anadolu Sigorta poliçesi altında. Kırılan, kaybolan veya
                hasar gören eşyalarınız 250.000 ₺'ye kadar teminat altında. Belge
                paylaşılmadan iş başlamaz.
              </p>

              <div className="mt-7 flex flex-wrap gap-2.5">
                {badges.map((b) => (
                  <span
                    key={b}
                    className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,245,230,0.14)] bg-[rgba(255,245,230,0.04)] px-3.5 py-1.5 text-xs font-medium text-[#e2d6c5] backdrop-blur"
                  >
                    <ShieldCheck size={12} className="text-[var(--accent-cypress)]" />
                    {b}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {numbers.map((n, idx) => (
                <motion.div
                  key={n.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.07 }}
                  className="rounded-2xl border border-[rgba(255,245,230,0.08)] bg-[rgba(255,245,230,0.03)] p-4 backdrop-blur"
                >
                  <n.Icon size={16} className="text-[var(--accent-terra)]" />
                  <p className="num mt-3 text-2xl font-semibold tracking-tight text-[var(--text-on-deep)]">
                    {n.value}
                  </p>
                  <p className="mt-1 text-xs text-[#a39a8e]">{n.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
