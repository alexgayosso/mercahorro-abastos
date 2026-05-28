// ============================================================
// RecetaModal.tsx — Modal de receta, se abre sin salir de home
// ============================================================
"use client";

import { useEffect, useCallback } from "react";
import { X, ShoppingBag } from "lucide-react";
import type { RecetaSanity } from "./CommunitySection";

interface Props {
  receta: RecetaSanity | null;
  onClose: () => void;
}

function parseSteps(steps: string[]): { title: string | null; body: string }[] {
  return steps.flatMap((step) => {
    const numbered = step.match(/\d+\.\s[^0-9]+(?=\d+\.|$)/g);
    if (numbered && numbered.length > 1) {
      return numbered.map((s) => {
        const clean = s.replace(/^\d+\.\s*/, "").trim();
        const hasColon = clean.includes(":");
        return {
          title: hasColon ? clean.split(":")[0].trim() : null,
          body: hasColon ? clean.split(":").slice(1).join(":").trim() : clean,
        };
      });
    }
    const clean = step.replace(/^\d+\.\s*/, "").trim();
    const hasColon = clean.includes(":");
    return [{
      title: hasColon ? clean.split(":")[0].trim() : null,
      body: hasColon ? clean.split(":").slice(1).join(":").trim() : clean,
    }];
  });
}

export default function RecetaModal({ receta, onClose }: Props) {
  // Close on ESC
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    if (!receta) return;
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [receta, handleKey]);

  if (!receta) return null;

  const merchantsMap = new Map();
  (receta.ingredients || []).forEach((ing: any) => {
    if (ing.locatario) merchantsMap.set(ing.locatario._id, { ...ing.locatario, forIngredient: ing.name });
  });
  const merchants = Array.from(merchantsMap.values());
  const parsedSteps = receta.steps ? parseSteps(receta.steps as string[]) : [];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
        onClick={onClose}
      >
        {/* Modal */}
        <div
          className="relative bg-white w-full sm:max-w-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[88vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── Hero image ─────────────────────────── */}
          <div className="relative h-52 shrink-0 overflow-hidden">
            {receta.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={receta.imageUrl}
                alt={receta.title}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-full bg-[#1E5631]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Category + Title over image */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <span className="inline-flex items-center bg-[#FF6B35] text-white text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full mb-2">
                {receta.category}
              </span>
              <h2 className="text-2xl font-black text-white leading-none">{receta.title}</h2>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
              aria-label="Cerrar"
            >
              <X size={16} />
            </button>
          </div>

          {/* ── Scrollable body ────────────────────── */}
          <div className="overflow-y-auto flex-1 px-6 py-6 space-y-6">

            {/* Description */}
            {receta.description && (
              <p className="text-gray-500 text-sm leading-relaxed italic border-l-3 border-[#FF6B35] pl-4 border-l-4">
                {receta.description}
              </p>
            )}

            {/* Ingredients */}
            {(receta.ingredients || []).length > 0 && (
              <div>
                <h3 className="font-black text-[#2B2D42] text-base mb-3 flex items-center gap-2">
                  🛒 Ingredientes
                </h3>
                <div className="bg-[#F4F5F7] rounded-2xl divide-y divide-white overflow-hidden">
                  {receta.ingredients!.map((ing: any, i: number) => (
                    <div key={i} className="flex items-baseline gap-3 px-4 py-3">
                      <span className="bg-[#1E5631] text-white text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded shrink-0">
                        {ing.name}
                      </span>
                      <p className="text-gray-600 text-sm leading-snug">{ing.quantity}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Steps */}
            {parsedSteps.length > 0 && (
              <div>
                <h3 className="font-black text-[#2B2D42] text-base mb-3 flex items-center gap-2">
                  👨‍🍳 Preparación
                </h3>
                <div className="space-y-4">
                  {parsedSteps.map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-7 h-7 bg-[#FF6B35] text-white text-xs font-black rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <div className="flex-1 pt-0.5">
                        {step.title && (
                          <p className="font-bold text-[#2B2D42] text-sm mb-0.5">{step.title}</p>
                        )}
                        <p className="text-gray-500 text-sm leading-relaxed">{step.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Where to buy */}
            {merchants.length > 0 && (
              <div className="bg-[#1E5631] rounded-2xl overflow-hidden">
                <div className="px-5 py-4 flex items-center gap-2 border-b border-white/10">
                  <ShoppingBag size={15} className="text-white" />
                  <h3 className="text-white font-black text-sm">Consíguelo en Mercahorro</h3>
                </div>
                <div className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {merchants.map((m: any) => (
                    <div key={m._id} className="bg-white/10 rounded-xl p-3 flex items-center gap-3">
                      <div className="bg-white text-[#1E5631] font-black px-2 py-1.5 rounded-lg text-center shrink-0 min-w-[48px]">
                        <div className="text-[8px] tracking-widest uppercase opacity-60">LOC</div>
                        <div className="text-xs leading-tight">{m.localNumber}</div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-white text-xs truncate">{m.businessName}</div>
                        <div className="text-white/50 text-[10px]">Para: {m.forIngredient}</div>
                      </div>
                      {m.social?.whatsapp && (
                        <a
                          href={`https://wa.me/52${m.social.whatsapp}?text=Hola, vi la receta de ${receta.title} en Mercahorro y me interesa comprar en tu local ${m.localNumber}.`}
                          target="_blank" rel="noopener noreferrer"
                          className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center shrink-0"
                        >
                          <svg viewBox="0 0 24 24" width="14" height="14" fill="white">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom padding */}
            <div className="h-2" />
          </div>
        </div>
      </div>
    </>
  );
}
