// ============================================================
// Directory.tsx — Directorio Dinámico de Locatarios
// Ahora recibe datos de Sanity como props (server → client)
// ============================================================
"use client";

import { useState, useMemo } from "react";
import {
  Leaf, Beef, Fish, ShoppingBag, UtensilsCrossed,
  Sparkles, Hammer, Shirt, HeartPulse, Laptop,
  Package, Wrench, MessageCircle, Search,
} from "lucide-react";
import { FILTER_TO_CATEGORIES } from "@/types";
import type { FilterButton } from "@/types";

// ── Tipo de Locatario (viene de Sanity) ─────────────────────
export interface LocatarioSanity {
  _id: string;
  localNumber: string;
  businessName: string;
  ownerName?: string;
  category: string;
  description?: string;
  imageUrl?: string;
  social?: {
    whatsapp?: string;
    instagram?: string;
    facebook?: string;
  };
  featured?: boolean;
  marketCity?: string;
}

// ── Filter Button Config ────────────────────────────────────
const FILTER_BUTTONS: { label: FilterButton; icon: React.FC<{ size?: number; className?: string }> }[] = [
  { label: "Frescos",    icon: Leaf },
  { label: "Carnes",     icon: Beef },
  { label: "Mariscos",   icon: Fish },
  { label: "Abarrotes",  icon: ShoppingBag },
  { label: "Comida",     icon: UtensilsCrossed },
  { label: "Limpieza",   icon: Sparkles },
  { label: "Hogar",      icon: Hammer },
  { label: "Ropa",       icon: Shirt },
  { label: "Salud",      icon: HeartPulse },
  { label: "Tecnología", icon: Laptop },
  { label: "Mayoreo",    icon: Package },
  { label: "Servicios",  icon: Wrench },
];

// ── Locatario Card ──────────────────────────────────────────
function LocatarioCard({ loc }: { loc: LocatarioSanity }) {
  return (
    <article className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1 flex flex-col">
      {/* Image / Color Block */}
      <div className="relative h-36 bg-gradient-to-br from-[#1E5631]/10 to-[#1E5631]/5 flex items-center justify-center overflow-hidden">
        {loc.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={loc.imageUrl}
            alt={loc.businessName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="text-[#1E5631]/20 text-7xl font-black select-none">
            {loc.businessName.charAt(0)}
          </div>
        )}
        {/* Local number badge */}
        <div className="absolute top-3 left-3 bg-[#1E5631] text-white px-2.5 py-1 rounded-lg">
          <span className="font-black text-xs tracking-widest uppercase">Local</span>
          <div className="font-black text-lg leading-none tracking-tight">{loc.localNumber}</div>
        </div>
        {/* Featured ribbon */}
        {loc.featured && (
          <div className="absolute top-3 right-3 bg-[#FF6B35] text-white text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded-md">
            Destacado
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <span className="text-[10px] text-[#1E5631] font-semibold tracking-widest uppercase bg-[#1E5631]/8 px-2 py-0.5 rounded-md self-start mb-2">
          {loc.category}
        </span>
        <h3 className="font-black text-[#2B2D42] text-base leading-tight mb-1">
          {loc.businessName}
        </h3>
        <p className="text-gray-500 text-xs leading-relaxed flex-1 mb-4 line-clamp-2">
          {loc.description}
        </p>

        {/* Social buttons */}
        <div className="flex items-center gap-2 mt-auto">
          {loc.social?.whatsapp && (
            <a
              href={`https://wa.me/52${loc.social.whatsapp}?text=Hola, vi tu local ${loc.localNumber} en Mercahorro y me interesa.`}
              target="_blank" rel="noopener noreferrer" title="WhatsApp"
              className="w-9 h-9 rounded-full bg-[#25D366] hover:bg-[#1ebe59] flex items-center justify-center transition-colors shadow-sm"
            >
              <MessageCircle size={16} className="text-white" />
            </a>
          )}
          {loc.social?.instagram && (
            <a
              href={`https://instagram.com/${loc.social.instagram}`}
              target="_blank" rel="noopener noreferrer" title="Instagram"
              className="w-9 h-9 rounded-full bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-90 flex items-center justify-center transition-opacity shadow-sm"
            >
              <span className="text-white font-black text-xs">IG</span>
            </a>
          )}
          {loc.social?.facebook && (
            <a
              href={`https://facebook.com/${loc.social.facebook}`}
              target="_blank" rel="noopener noreferrer" title="Facebook"
              className="w-9 h-9 rounded-full bg-[#1877F2] hover:bg-[#166fe5] flex items-center justify-center transition-colors shadow-sm"
            >
              <span className="text-white font-black text-sm">f</span>
            </a>
          )}
          <span className="ml-auto text-[10px] text-gray-400 font-medium bg-gray-50 px-2 py-1 rounded-md">
            {loc.marketCity || "Mercahorro"}
          </span>
        </div>
      </div>
    </article>
  );
}

// ── Main Directory Component ─────────────────────────────────
// Recibe locatarios como prop desde el Server Component (page.tsx)
export default function Directory({ locatarios }: { locatarios: LocatarioSanity[] }) {
  const [activeFilter, setActiveFilter] = useState<FilterButton | null>(null);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let results = [...locatarios];

    if (activeFilter) {
      const allowedCats = FILTER_TO_CATEGORIES[activeFilter];
      results = results.filter((l) => allowedCats.includes(l.category as any));
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      results = results.filter(
        (l) =>
          l.businessName.toLowerCase().includes(q) ||
          l.category.toLowerCase().includes(q) ||
          l.localNumber.toLowerCase().includes(q)
      );
    }

    return results;
  }, [activeFilter, search, locatarios]);

  return (
    <section id="directorio" className="bg-[#F4F5F7] py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-[#FF6B35] text-xs font-bold tracking-widest uppercase mb-1">
              Directorio de Locatarios
            </p>
            <h2 className="text-3xl font-black text-[#2B2D42] leading-none">
              Encuentra tu proveedor ideal
            </h2>
          </div>
          <div className="flex items-center gap-2 bg-white rounded-xl px-4 h-10 border border-gray-200 focus-within:border-[#1E5631] transition-colors w-full sm:w-72">
            <Search size={15} className="text-gray-400 shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre o local…"
              className="flex-1 text-sm outline-none bg-transparent text-[#2B2D42] placeholder-gray-400"
            />
          </div>
        </div>

        {/* 12 Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          {FILTER_BUTTONS.map(({ label, icon: Icon }) => {
            const isActive = activeFilter === label;
            return (
              <button
                key={label}
                onClick={() => setActiveFilter(isActive ? null : label)}
                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold
                  border transition-all duration-200 cursor-pointer select-none
                  ${isActive
                    ? "bg-[#1E5631] text-white border-[#1E5631] shadow-md shadow-green-900/20 scale-[1.03]"
                    : "bg-white text-[#2B2D42] border-gray-200 hover:border-[#1E5631] hover:text-[#1E5631] hover:shadow-sm"
                  }
                `}
              >
                <Icon size={15} className={isActive ? "text-[#FF6B35]" : ""} />
                {label}
              </button>
            );
          })}
          {(activeFilter || search) && (
            <button
              onClick={() => { setActiveFilter(null); setSearch(""); }}
              className="ml-auto px-4 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-[#2B2D42] border border-transparent hover:border-gray-200 transition-all"
            >
              ✕ Limpiar filtros
            </button>
          )}
        </div>

        {/* Result count */}
        <p className="text-xs text-gray-400 font-medium mb-5">
          {filtered.length} locatario{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
          {activeFilter && (
            <span> en <span className="text-[#1E5631] font-semibold">{activeFilter}</span></span>
          )}
        </p>

        {/* Merchant Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((loc) => (
              <LocatarioCard key={loc._id} loc={loc} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <div className="text-5xl mb-4">🔍</div>
            <p className="font-semibold text-lg text-[#2B2D42]">Sin resultados</p>
            <p className="text-sm mt-1">Prueba con otra categoría o un término diferente.</p>
          </div>
        )}
      </div>
    </section>
  );
}
