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
              href="tel:+526861234567"
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

      {/* ── Hero Section ──────────────────────────────── */}
      <section className="relative bg-[#1E5631] overflow-hidden">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.3) 40px, rgba(255,255,255,0.3) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.3) 40px, rgba(255,255,255,0.3) 41px)",
          }}
        />
        {/* Diagonal accent */}
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#FF6B35]/20 rounded-full blur-3xl" />
        <div className="absolute -left-10 bottom-0 w-64 h-64 bg-white/5 rounded-full blur-2xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-[#FF6B35] rounded-full animate-pulse" />
              Infraestructura Comercial · Norte de México
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tight mb-4">
              La Nueva Era
              <br />
              <span className="text-[#FF6B35]">del Abasto.</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl font-normal mb-8 max-w-xl leading-relaxed">
              Precios directos del productor.{" "}
              <span className="text-white font-semibold">Infraestructura de primer mundo.</span>{" "}
              300+ comerciantes en 5 mercados modernos.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap gap-3">
              <a
                href="#directorio"
                className="bg-[#FF6B35] hover:bg-[#e55c27] text-white font-bold px-7 py-3.5 rounded-xl text-sm tracking-wide transition-all hover:scale-105 shadow-lg shadow-orange-900/30"
              >
                Quiero Comprar
              </a>
              <a
                href="#cotiza"
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-7 py-3.5 rounded-xl text-sm tracking-wide transition-all hover:scale-105 backdrop-blur-sm"
              >
                Quiero Vender Aquí
              </a>
            </div>

            {/* Stats strip */}
            <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/10">
              {[
                { value: "52,000+", label: "m² desarrollados" },
                { value: "300+", label: "Comerciantes activos" },
                { value: "5", label: "Mercados modernos" },
                { value: "+70%", label: "Incremento de ventas promedio" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-black text-white">{stat.value}</div>
                  <div className="text-white/50 text-xs mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
