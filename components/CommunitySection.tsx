// ============================================================
// CommunitySection.tsx — Eventos + Recetas con modal
// ============================================================
"use client";

import { useState } from "react";
import { Calendar, ChefHat, MapPin, ArrowRight } from "lucide-react";
import RecetaModal from "./RecetaModal";

// ── Tipos ────────────────────────────────────────────────────
export interface EventoSanity {
  _id: string;
  title: string;
  date: string;
  description?: string;
  imageUrl?: string;
  marketName?: string;
}

export interface LocatarioRef {
  _id: string;
  localNumber: string;
  businessName: string;
  category: string;
  social?: { whatsapp?: string };
}

export interface IngredienteSanity {
  name: string;
  quantity?: string;
  locatario?: LocatarioRef;
}

export interface RecetaSanity {
  _id: string;
  title: string;
  slug?: { current: string };
  description?: string;
  imageUrl?: string;
  category?: string;
  ingredients?: IngredienteSanity[];
  steps?: string[];
}

// ── Event Card ───────────────────────────────────────────────
function EventCard({ event }: { event: EventoSanity }) {
  const dateObj = new Date(event.date + "T12:00:00");
  const day = dateObj.toLocaleDateString("es-MX", { day: "2-digit" });
  const month = dateObj.toLocaleDateString("es-MX", { month: "short" }).toUpperCase();

  return (
    <div className="flex gap-4 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="bg-[#1E5631] text-white rounded-xl px-4 py-3 text-center shrink-0 min-w-[64px]">
        <div className="text-2xl font-black leading-none">{day}</div>
        <div className="text-[11px] font-semibold uppercase tracking-wider opacity-80 mt-0.5">{month}</div>
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-[#2B2D42] text-sm leading-snug">{event.title}</h4>
        <p className="text-gray-500 text-xs mt-1 leading-relaxed line-clamp-2">{event.description}</p>
        {event.marketName && (
          <div className="flex items-center gap-1 mt-2 text-[11px] text-gray-400">
            <MapPin size={11} />
            {event.marketName}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Recipe Card ──────────────────────────────────────────────
function RecipeCard({ recipe, onOpen }: { recipe: RecetaSanity; onOpen: () => void }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer group" onClick={onOpen}>
      {/* Image */}
      <div className="h-44 overflow-hidden">
        {recipe.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#FF6B35]/10 to-amber-50 flex items-center justify-center">
            <ChefHat size={40} className="text-[#FF6B35]/30" />
          </div>
        )}
      </div>

      <div className="p-5">
        <span className="text-[10px] text-[#FF6B35] font-bold tracking-widest uppercase">
          {recipe.category || "Receta"}
        </span>
        <h3 className="font-black text-[#2B2D42] text-lg mt-1 mb-2 leading-tight">{recipe.title}</h3>
        {recipe.description && (
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">{recipe.description}</p>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); onOpen(); }}
          className="flex items-center gap-1 text-[#1E5631] font-semibold text-sm hover:gap-2 transition-all"
        >
          Ver receta completa <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

// ── Community Section ────────────────────────────────────────
export default function CommunitySection({
  eventos,
  recetas,
}: {
  eventos: EventoSanity[];
  recetas: RecetaSanity[];
}) {
  const [activeReceta, setActiveReceta] = useState<RecetaSanity | null>(null);

  return (
    <>
      <section id="comunidad" className="bg-white py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">

            {/* Eventos */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Calendar size={18} className="text-[#FF6B35]" />
                <p className="text-[#FF6B35] text-xs font-bold tracking-widest uppercase">Próximos Eventos</p>
              </div>
              <h2 className="text-3xl font-black text-[#2B2D42] mb-6 leading-none">El mercado tiene vida propia.</h2>
              {eventos.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {eventos.map((event) => <EventCard key={event._id} event={event} />)}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">Próximamente nuevos eventos.</p>
              )}
              <a href="/eventos" className="mt-5 inline-flex items-center gap-1 text-[#1E5631] font-semibold text-sm hover:gap-2 transition-all">
                Ver todos los eventos <ArrowRight size={14} />
              </a>
            </div>

            {/* Recetas */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <ChefHat size={18} className="text-[#FF6B35]" />
                <p className="text-[#FF6B35] text-xs font-bold tracking-widest uppercase">Recetas del Mercado</p>
              </div>
              <h2 className="text-3xl font-black text-[#2B2D42] mb-6 leading-none">Todo fresco, todo de aquí.</h2>
              {recetas.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {recetas.map((recipe) => (
                    <RecipeCard
                      key={recipe._id}
                      recipe={recipe}
                      onOpen={() => setActiveReceta(recipe)}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">Próximamente nuevas recetas.</p>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Modal */}
      <RecetaModal receta={activeReceta} onClose={() => setActiveReceta(null)} />
    </>
  );
}
