// ============================================================
// app/page.tsx — Landing Page (mercahorro.com.mx)
// ============================================================
import MainNav from "@/components/MainNav";
import Directory from "@/components/Directory";
import CommunitySection from "@/components/CommunitySection";
import B2BSection from "@/components/B2BSection";

export default function Home() {
  return (
    <main className="bg-[#F4F5F7]">
      {/* 1. Navbar + Hero */}
      <MainNav />

      {/* 2. Directorio Dinámico de Locatarios */}
      <Directory />

      {/* 3. Comunidad: Eventos + Recetas con Cross-Selling */}
      <CommunitySection />

      {/* 4. B2B CTA Institucional */}
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
