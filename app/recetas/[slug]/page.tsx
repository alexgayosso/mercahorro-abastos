// ============================================================
// app/recetas/[slug]/page.tsx — Página de detalle de receta
// ============================================================
import { client } from "@/lib/sanity.client";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, ShoppingBag, ChefHat } from "lucide-react";
import Link from "next/link";

async function getReceta(slug: string) {
  return client.fetch(
    `*[_type == "receta" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
      _id,
      title,
      slug,
      description,
      "imageUrl": image.asset->url,
      category,
      "marketName": market->name,
      ingredients[] {
        name,
        quantity,
        "locatario": locatario-> {
          _id,
          localNumber,
          businessName,
          category,
          social
        }
      },
      steps
    }`,
    { slug }
  );
}

export default async function RecetaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const receta = await getReceta(slug);
  if (!receta) notFound();

  // Unique merchants
  const merchantsMap = new Map();
  (receta.ingredients || []).forEach((ing: any) => {
    if (ing.locatario) merchantsMap.set(ing.locatario._id, ing.locatario);
  });
  const merchants = Array.from(merchantsMap.values());

  return (
    <main className="min-h-screen bg-[#F4F5F7]">

      {/* ── Hero Banner ───────────────────────────────── */}
      <div className="relative w-full h-64 md:h-96 overflow-hidden">
        {receta.imageUrl ? (
          <Image
            src={receta.imageUrl}
            alt={receta.title}
            fill
            className="object-cover object-center"
            priority
          />
        ) : (
          <div className="w-full h-full bg-[#1E5631] flex items-center justify-center">
            <ChefHat size={64} className="text-white/20" />
          </div>
        )}
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Back button */}
        <div className="absolute top-4 left-4 md:top-6 md:left-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-white/25 transition-all"
          >
            <ArrowLeft size={15} />
            Volver
          </Link>
        </div>

        {/* Title over image */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <span className="text-[#FF6B35] text-xs font-bold tracking-widest uppercase">
            {receta.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mt-1">
            {receta.title}
          </h1>
          {receta.marketName && (
            <span className="mt-2 inline-flex items-center gap-1.5 text-white/70 text-sm">
              📍 {receta.marketName}
            </span>
          )}
        </div>
      </div>

      {/* ── Content ───────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8">

        {/* Description */}
        {receta.description && (
          <p className="text-gray-600 text-lg leading-relaxed border-l-4 border-[#FF6B35] pl-5">
            {receta.description}
          </p>
        )}

        {/* ── Ingredients ────────────────────────────── */}
        {receta.ingredients?.length > 0 && (
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <div className="bg-[#1E5631] px-6 py-4">
              <h2 className="text-white font-black text-lg flex items-center gap-2">
                🛒 Ingredientes
              </h2>
            </div>
            <div className="divide-y divide-gray-50">
              {receta.ingredients.map((ing: any, i: number) => (
                <div key={i} className="flex items-center justify-between px-6 py-3.5 hover:bg-[#F4F5F7] transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-[#FF6B35] rounded-full shrink-0" />
                    <span className="text-[#2B2D42] font-medium">{ing.name}</span>
                  </div>
                  {ing.quantity && (
                    <span className="text-[#1E5631] font-bold text-sm ml-4 shrink-0">{ing.quantity}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Steps ──────────────────────────────────── */}
        {receta.steps?.length > 0 && (
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <div className="bg-[#2B2D42] px-6 py-4">
              <h2 className="text-white font-black text-lg flex items-center gap-2">
                👨‍🍳 Preparación
              </h2>
            </div>
            <div className="p-6 space-y-5">
              {receta.steps.map((step: string, i: number) => (
                <div key={i} className="flex gap-4">
                  <div className="w-9 h-9 bg-[#FF6B35] text-white text-sm font-black rounded-full flex items-center justify-center shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1 pt-1.5">
                    <p className="text-gray-600 leading-relaxed">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Where to buy ───────────────────────────── */}
        {merchants.length > 0 && (
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <div className="bg-[#FF6B35] px-6 py-4 flex items-center gap-2">
              <ShoppingBag size={18} className="text-white" />
              <h2 className="text-white font-black text-lg">
                Consíguelo en Mercahorro
              </h2>
            </div>
            <div className="p-4 grid sm:grid-cols-2 gap-3">
              {merchants.map((m: any) => (
                <div key={m._id} className="flex items-center gap-3 bg-[#F4F5F7] rounded-xl p-3.5">
                  <div className="bg-[#1E5631] text-white font-black px-2.5 py-1.5 rounded-lg text-center shrink-0 min-w-[52px]">
                    <div className="text-[9px] tracking-widest uppercase opacity-80">Local</div>
                    <div className="text-sm leading-tight">{m.localNumber}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-[#2B2D42] text-sm truncate">{m.businessName}</div>
                    <div className="text-gray-400 text-xs mt-0.5 truncate">{m.category}</div>
                  </div>
                  {m.social?.whatsapp && (
                    <a
                      href={`https://wa.me/52${m.social.whatsapp}?text=Hola, vi la receta de ${receta.title} en Mercahorro y me interesa comprar en tu local ${m.localNumber}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 bg-[#25D366] rounded-full flex items-center justify-center shrink-0 hover:opacity-80 transition-opacity"
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </a>
                  )}
                </div>
              ))}
            </div>
            <div className="px-4 pb-4">
              <Link
                href="/#directorio"
                className="block text-center bg-[#1E5631] hover:bg-[#164a27] text-white font-bold text-sm py-3 rounded-xl transition-colors"
              >
                Ver todos los locatarios →
              </Link>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
