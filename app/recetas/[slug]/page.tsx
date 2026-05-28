// ============================================================
// app/recetas/[slug]/page.tsx — Página de detalle de receta
// ============================================================
import { client } from "@/lib/sanity.client";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Clock, Users, ShoppingBag } from "lucide-react";
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

  const merchantsMap = new Map();
  (receta.ingredients || []).forEach((ing: any) => {
    if (ing.locatario) {
      merchantsMap.set(ing.locatario._id, ing.locatario);
    }
  });
  const merchants = Array.from(merchantsMap.values());

  return (
    <main className="min-h-screen bg-[#F4F5F7]">
      {/* Back button */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <Link
            href="/#comunidad"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1E5631] hover:opacity-80 transition-opacity"
          >
            <ArrowLeft size={16} />
            Volver al inicio
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <span className="text-[#FF6B35] text-xs font-bold tracking-widest uppercase">
            {receta.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-[#2B2D42] mt-2 mb-4 leading-tight">
            {receta.title}
          </h1>
          {receta.description && (
            <p className="text-gray-500 text-lg leading-relaxed max-w-2xl">
              {receta.description}
            </p>
          )}
          {receta.marketName && (
            <div className="mt-3 inline-flex items-center gap-2 bg-[#1E5631]/8 text-[#1E5631] text-sm font-semibold px-3 py-1.5 rounded-full">
              📍 {receta.marketName}
            </div>
          )}
        </div>

        {/* Hero image */}
        {receta.imageUrl && (
          <div className="relative w-full h-72 md:h-96 rounded-3xl overflow-hidden mb-10 shadow-xl">
            <Image
              src={receta.imageUrl}
              alt={receta.title}
              fill
              className="object-cover object-top"
              priority
            />
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left: Ingredients + Steps */}
          <div className="md:col-span-2 space-y-8">

            {/* Ingredients */}
            {receta.ingredients && receta.ingredients.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-black text-[#2B2D42] mb-5 flex items-center gap-2">
                  🛒 Ingredientes
                </h2>
                <ul className="space-y-3">
                  {receta.ingredients.map((ing: any, i: number) => (
                    <li key={i} className="flex items-start justify-between gap-4 py-2 border-b border-gray-50 last:border-0">
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-[#FF6B35] rounded-full shrink-0 mt-1.5" />
                        <span className="text-[#2B2D42] font-medium">{ing.name}</span>
                      </div>
                      <span className="text-gray-400 text-sm font-semibold shrink-0">{ing.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Steps */}
            {receta.steps && receta.steps.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-black text-[#2B2D42] mb-5 flex items-center gap-2">
                  👨‍🍳 Preparación
                </h2>
                <ol className="space-y-5">
                  {receta.steps.map((step: string, i: number) => (
                    <li key={i} className="flex gap-4">
                      <span className="w-8 h-8 bg-[#1E5631] text-white text-sm font-black rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-gray-600 leading-relaxed pt-1">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          {/* Right: Where to buy */}
          <div className="space-y-4">
            {merchants.length > 0 && (
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 sticky top-24">
                <h3 className="font-black text-[#2B2D42] mb-4 flex items-center gap-2 text-sm">
                  <ShoppingBag size={15} className="text-[#FF6B35]" />
                  CONSÍGUELO EN MERCAHORRO
                </h3>
                <div className="space-y-3">
                  {merchants.map((m: any) => (
                    <div key={m._id} className="flex items-center gap-3 bg-[#F4F5F7] rounded-xl p-3">
                      <div className="bg-[#1E5631] text-white text-[9px] font-black px-2 py-1 rounded-lg text-center shrink-0 leading-tight">
                        <div className="tracking-widest">LOC</div>
                        <div className="text-xs">{m.localNumber}</div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-[#2B2D42] text-sm truncate">{m.businessName}</div>
                        <div className="text-gray-400 text-[11px]">{m.category}</div>
                      </div>
                      {m.social?.whatsapp && (
                        <a
                          href={`https://wa.me/52${m.social.whatsapp}?text=Hola, vi la receta de ${receta.title} en Mercahorro y me interesa comprar en tu local ${m.localNumber}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#25D366] hover:opacity-80 shrink-0"
                        >
                          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href="/#directorio"
                  className="mt-4 block text-center bg-[#FF6B35] hover:bg-[#e55c27] text-white font-bold text-sm py-3 rounded-xl transition-colors"
                >
                  Ver todos los locatarios
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
