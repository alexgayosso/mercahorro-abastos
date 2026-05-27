// ============================================================
// MainNav.tsx — Navbar + Hero Section
// ============================================================
"use client";

import { useState } from "react";
import { Search, MapPin, Phone, Menu, X } from "lucide-react";
import Image from "next/image";

export default function MainNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <>
      {/* ── Sticky Navbar ─────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between gap-6">
          {/* Logo — espectacular */}
          <a href="/" className="shrink-0 flex items-center">
            <Image
              src="/logo-mercahorro.png"
              alt="MercAhorro Abastos"
              width={220}
              height={80}
              priority
              className="h-14 w-auto object-contain"
            />
          </a>

          {/* Search bar — desktop */}
          <div className="hidden md:flex flex-1 max-w-xl items-center gap-2 bg-[#F4F5F7] rounded-xl px-4 h-11 border border-transparent focus-within:border-[#1E5631] focus-within:bg-white transition-all">
            <Search size={16} className="text-gray-400 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="¿Qué buscas hoy? Carnicería, aguacate, abarrotes…"
              className="bg-transparent flex-1 text-sm text-[#2B2D42] placeholder-gray-400 outline-none"
            />
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <button className="flex items-center gap-1.5 text-sm font-semibold text-[#2B2D42] hover:text-[#1E5631] transition-colors">
              <MapPin size={15} />
              Sucursales
            </button>
            <a
              href="https://wa.me/528120008031?text=Hola%20👋%20Me%20gustaría%20obtener%20información%20sobre%20Mercahorro%20Abastos."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-semibold text-[#2B2D42] hover:text-[#1E5631] transition-colors"
            >
              <Phone size={15} />
              Contacto
            </a>
            <a
              href="#cotiza"
              className="bg-[#FF6B35] hover:bg-[#e55c27] text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-all hover:scale-105 shadow-md shadow-orange-200"
            >
              Cotiza tu Local
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-[#2B2D42]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menú"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
            <div className="flex items-center gap-2 bg-[#F4F5F7] rounded-xl px-4 h-10">
              <Search size={16} className="text-gray-400" />
              <input
                type="text"
                placeholder="¿Qué buscas?"
                className="bg-transparent flex-1 text-sm outline-none"
              />
            </div>
            <a href="#cotiza" className="block bg-[#FF6B35] text-white text-center font-bold py-2.5 rounded-lg">
              Cotiza tu Local
            </a>
          </div>
        )}
      </header>

      {/* ── Hero Section — Full Bleed Cinematográfico ─ */}
      <section className="relative overflow-hidden min-h-[92vh] flex items-end pb-0">

        {/* ── CAPA 1: Imagen de fondo full-bleed ──────── */}
        <Image
          src="/hero-obra.jpg"
          alt="Mercahorro — infraestructura de abasto moderno"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* ── CAPA 2: Overlay degradado — verde a transparente ── */}
        {/* Cubre de izquierda hacia el centro-derecha, dejando el atardecer visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d2e1a]/95 via-[#1E5631]/75 to-[#1a4a28]/20" />
        {/* Franja oscura en la parte inferior para anclar el contenido */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#0d2e1a]/80 to-transparent" />
        {/* Franja oscura en el top muy sutil */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/30 to-transparent" />

        {/* ── CAPA 3: Contenido ───────────────────────── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-24 pb-16 md:pb-20">
          <div className="max-w-2xl">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/85 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 bg-[#FF6B35] rounded-full animate-pulse" />
              Infraestructura Comercial · Norte de México
            </div>

            {/* Headline — GRANDE */}
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-black text-white leading-[0.92] tracking-tight mb-6">
              La Nueva Era
              <br />
              <span className="text-[#FF6B35]">del Abasto.</span>
            </h1>

            <p className="text-white/75 text-xl font-normal mb-10 max-w-lg leading-relaxed">
              Precios directos del productor.{" "}
              <span className="text-white font-bold">Infraestructura de primer mundo.</span>{" "}
              300+ comerciantes en 5 mercados modernos.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-14">
              <a
                href="#directorio"
                className="bg-[#FF6B35] hover:bg-[#e55c27] text-white font-black px-8 py-4 rounded-xl text-base tracking-wide transition-all hover:scale-105 shadow-2xl shadow-black/40"
              >
                Quiero Comprar
              </a>
              <a
                href="#cotiza"
                className="bg-white/10 hover:bg-white/20 border border-white/40 text-white font-black px-8 py-4 rounded-xl text-base tracking-wide transition-all hover:scale-105 backdrop-blur-sm"
              >
                Quiero Vender Aquí
              </a>
            </div>

            {/* Stats strip — inline con separadores */}
            <div className="flex flex-wrap items-center gap-0 pt-8 border-t border-white/15">
              {[
                { value: "52,000+", label: "m² desarrollados" },
                { value: "300+", label: "Comerciantes activos" },
                { value: "5", label: "Mercados" },
                { value: "+70%", label: "Más ventas" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className={`pr-8 ${i > 0 ? "pl-8 border-l border-white/15" : ""} py-1`}
                >
                  <div className="text-3xl font-black text-white leading-none">{stat.value}</div>
                  <div className="text-white/40 text-xs mt-1 uppercase tracking-widest font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Scroll cue ──────────────────────────────── */}
        <div className="absolute bottom-8 right-10 z-10 hidden md:flex items-center gap-2 text-white/30 text-xs font-semibold tracking-widest uppercase">
          <span>Descubre el directorio</span>
          <div className="w-px h-8 bg-white/20" />
        </div>

      </section>
    </>
  );
}

