// ============================================================
// EcosystemHeader.tsx — Top Bar Institucional
// ============================================================
"use client";

import Link from "next/link";

const ECOSYSTEM_LINKS = [
  { label: "Merca Capital", href: "https://mercacapital.mx" },
  { label: "Grupo Mercahorro", href: "https://grupomercahorro.mx" },
  { label: "Mercahorro Abastos", href: "/", active: true },
];

export default function EcosystemHeader() {
  return (
    <div className="bg-[#0D0F0E] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-9 flex items-center justify-between">
        {/* Left: group label */}
        <span className="text-white/30 text-[10px] tracking-[0.2em] uppercase font-medium hidden sm:block">
          Grupo Mercahorro Ecosystem
        </span>

        {/* Right: links */}
        <nav className="flex items-center gap-1 ml-auto">
          {ECOSYSTEM_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className={`
                px-3 py-1 text-[11px] tracking-wide font-medium transition-all duration-200
                ${
                  link.active
                    ? "text-[#FF6B35] bg-[#FF6B35]/10 rounded"
                    : "text-white/50 hover:text-white/80"
                }
              `}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
