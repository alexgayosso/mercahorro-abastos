// ============================================================
// B2BSection.tsx — Commercial Call-to-Action for Investors
// ============================================================
"use client";

import { TrendingUp, ShieldCheck, Building2, ArrowRight } from "lucide-react";

const PROOF_POINTS = [
  {
    icon: TrendingUp,
    stat: "+70%",
    label: "Incremento de ventas promedio documentado en 24 meses",
  },
  {
    icon: ShieldCheck,
    stat: "100%",
    label: "Locales con título de propiedad y plusvalía real",
  },
  {
    icon: Building2,
    stat: "52,000+",
    label: "m² de infraestructura comercial desarrollada",
  },
];

export default function B2BSection() {
  return (
    <section id="cotiza" className="bg-[#1E5631] relative overflow-hidden py-16 md:py-24">
      {/* Texture grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 60px,white 60px,white 61px),repeating-linear-gradient(90deg,transparent,transparent 60px,white 60px,white 61px)",
        }}
      />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF6B35]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-12">
          {/* Left: copy */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-[#FF6B35]/20 border border-[#FF6B35]/30 text-[#FF6B35] text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-6">
              Para Comerciantes e Inversionistas
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-none tracking-tight mb-4">
              Bienvenido a
              <br />
              <span className="text-[#FF6B35]">las grandes ligas.</span>
            </h2>
            <p className="text-white/70 text-lg leading-relaxed max-w-lg mb-8">
              Deja de pagar rentas sin plusvalía. Nuestros locatarios{" "}
              <strong className="text-white">incrementan sus ventas en promedio un 70%</strong>{" "}
              al mudarse a Mercahorro. Tu local es un activo que se valoriza.
            </p>
            <a
              href="https://wa.me/528120008031?text=Hola%2C%20estoy%20interesado%20en%20cotizar%20un%20local%20en%20Mercahorro.%20¿Me%20pueden%20dar%20información%20sobre%20disponibilidad%20y%20precios%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#FF6B35] hover:bg-[#e55c27] text-white font-black text-base px-8 py-4 rounded-xl transition-all hover:scale-105 shadow-xl shadow-orange-900/30"
            >
              Cotiza tu Local Ahora
              <ArrowRight size={18} />
            </a>
          </div>

          {/* Right: proof points */}
          <div className="flex flex-col gap-4 lg:w-96">
            {PROOF_POINTS.map(({ icon: Icon, stat, label }) => (
              <div
                key={stat}
                className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 bg-[#FF6B35]/20 rounded-xl flex items-center justify-center shrink-0">
                  <Icon size={22} className="text-[#FF6B35]" />
                </div>
                <div>
                  <div className="text-2xl font-black text-white">{stat}</div>
                  <div className="text-white/60 text-sm mt-0.5 leading-snug">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
