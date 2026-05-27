// ============================================================
// app/page.tsx — Server Component: fetch desde Sanity
// ============================================================
import MainNav from "@/components/MainNav";
import Directory from "@/components/Directory";
import CommunitySection from "@/components/CommunitySection";
import B2BSection from "@/components/B2BSection";
import { getLocatarios } from "@/lib/sanity.queries";

export const revalidate = 60; // refresca datos cada 60 segundos

export default async function Home() {
  // Fetch desde Sanity — si falla, usa array vacío para no romper la web
  let locatarios = [];
  try {
    locatarios = await getLocatarios();
  } catch (error) {
    console.error("Error fetching locatarios from Sanity:", error);
  }

  return (
    <main className="bg-[#F4F5F7]">
      {/* 1. Navbar + Hero */}
      <MainNav />

      {/* 2. Directorio — recibe datos reales de Sanity */}
      <Directory locatarios={locatarios} />

      {/* 3. Comunidad */}
      <CommunitySection />

      {/* 4. B2B CTA */}
      <B2BSection />

      {/* Footer */}
      <footer className="bg-[#0D0F0E] text-white/40 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <span>© {new Date().getFullYear()} Grupo Mercahorro SAPI de CV. Todos los derechos reservados.</span>
          <div className="flex gap-4">
            <a href="/aviso-privacidad" className="hover:text-white/70 transition-colors">
              Aviso de Privacidad
            </a>
            <a href="/terminos" className="hover:text-white/70 transition-colors">
              Términos de Uso
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
