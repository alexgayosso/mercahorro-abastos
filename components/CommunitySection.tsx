// ============================================================
// CommunitySection.tsx — Eventos + Recetas desde Sanity
// Recibe datos como props desde el Server Component (page.tsx)
// ============================================================
"use client";

import { Calendar, ChefHat, MapPin, ArrowRight, ShoppingBag } from "lucide-react";

// ── Tipos que vienen de Sanity ───────────────────────────────
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
function RecipeCard({ recipe }: { recipe: RecetaSanity }) {
  // Locatarios únicos referenciados en los ingredientes
  const merchants = Array.from(
    new Map(
      (recipe.ingredients || [])
        .filter((i) => i.locatario)
        .map((i) => [i.locatario!._id, i.locatario!])
    ).values()
  );

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
      {/* Hero */}
      <div className="h-44 bg-gradient-to-br from-[#FF6B35]/10 to-amber-50 flex items-center justify-center">
        {recipe.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-full object-cover" />
        ) : (
          <ChefHat size={48} className="text-[#FF6B35]/30" />
        )}
      </div>

      <div className="p-5">
        <span className="text-[10px] text-[#FF6B35] font-bold tracking-widest uppercase">
          {recipe.category || "Receta"}
        </span>
        <h3 className="font-black text-[#2B2D42] text-lg mt-1 mb-2">{recipe.title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4">{recipe.description}</p>

        {/* Merchants vinculados dinámicamente */}
        {merchants.length > 0 && (
          <div className="border-t border-gray-100 pt-4">
            <p className="text-[11px] text-gray-400 font-semibold tracking-widest uppercase mb-3 flex items-center gap-1.5">
              <ShoppingBag size={11} />
              Consíguelo en Mercahorro
            </p>
            <div className="flex flex-col gap-2">
              {merchants.map((m) => (
                <div key={m._id} className="flex items-center gap-3 bg-[#F4F5F7] rounded-xl px-3 py-2.5">
                  <div className="bg-[#1E5631] text-white text-[10px] font-black px-2 py-1 rounded-lg leading-none text-center shrink-0">
                    <div className="tracking-widest">LOC</div>
                    <div className="text-sm">{m.localNumber}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-[#2B2D42] text-sm truncate">{m.businessName}</div>
                    <div className="text-gray-400 text-[11px]">{m.category}</div>
                  </div>
                  {m.social?.whatsapp && (
                    <a
                      href={`https://wa.me/52${m.social.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#25D366] hover:opacity-80 shrink-0"
                    >
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <a
          href={`/recetas/${recipe.slug?.current || ""}`}
          className="mt-4 flex items-center gap-1 text-[#1E5631] font-semibold text-sm hover:gap-2 transition-all"
        >
          Ver receta completa <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
}

// ── Main Community Section ───────────────────────────────────
export default function CommunitySection({
  eventos,
  recetas,
}: {
  eventos: EventoSanity[];
  recetas: RecetaSanity[];
}) {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">

          {/* Eventos */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Calendar size={18} className="text-[#FF6B35]" />
              <p className="text-[#FF6B35] text-xs font-bold tracking-widest uppercase">
                Próximos Eventos
              </p>
            </div>
            <h2 className="text-3xl font-black text-[#2B2D42] mb-6 leading-none">
              El mercado tiene vida propia.
            </h2>
            {eventos.length > 0 ? (
              <div className="flex flex-col gap-3">
                {eventos.map((event) => (
                  <EventCard key={event._id} event={event} />
                ))}
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
              <p className="text-[#FF6B35] text-xs font-bold tracking-widest uppercase">
                Recetas del Mercado
              </p>
            </div>
            <h2 className="text-3xl font-black text-[#2B2D42] mb-6 leading-none">
              Todo fresco, todo de aquí.
            </h2>
            {recetas.length > 0 ? (
              <div className="flex flex-col gap-4">
                {recetas.map((recipe) => (
                  <RecipeCard key={recipe._id} recipe={recipe} />
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-sm">Próximamente nuevas recetas.</p>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
