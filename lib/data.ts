// ============================================================
// MERCAHORRO ABASTOS — MOCK DATA (simulates Headless CMS)
// Replace with real API / Sanity / Contentful calls in production
// ============================================================

import type { Locatario, Market, Event, Recipe } from "@/types";

// ─── MERCADOS ────────────────────────────────────────────────
export const MARKETS: Market[] = [
  {
    id: "mh-torreon",
    name: "Mercahorro Torreón",
    city: "Torreón",
    state: "Coahuila",
    address: "Blvd. Independencia 3200, Col. Los Ángeles",
    totalLocals: 120,
    sqm: 18000,
    openYear: 2018,
    heroImageUrl: "/markets/torreon.jpg",
  },
  {
    id: "mh-gomez",
    name: "Mercahorro Gómez Palacio",
    city: "Gómez Palacio",
    state: "Durango",
    address: "Av. Ejército Nacional 1500",
    totalLocals: 95,
    sqm: 14000,
    openYear: 2020,
    heroImageUrl: "/markets/gomez.jpg",
  },
  {
    id: "mh-monterrey",
    name: "Abastitos Monterrey",
    city: "Monterrey",
    state: "Nuevo León",
    address: "Av. Ruiz Cortines 2800, Col. Industrial",
    totalLocals: 110,
    sqm: 20000,
    openYear: 2023,
    heroImageUrl: "/markets/monterrey.jpg",
  },
];

// ─── LOCATARIOS ──────────────────────────────────────────────
export const LOCATARIOS: Locatario[] = [
  {
    id: "loc-001",
    localNumber: "A-04",
    businessName: "Carnicería El Corte Fino",
    ownerName: "Don Ramón Espinoza",
    category: "Carnicerías y Cárnicos",
    description:
      "Res, cerdo y borrego de primera. Cortes especiales y molida al momento. Más de 20 años de experiencia.",
    imageUrl: "/locatarios/carniceria.jpg",
    social: {
      whatsapp: "8711234567",
      instagram: "elcortefino_torreon",
      facebook: "ElCorteFinoTorreon",
    },
    featured: true,
    marketId: "mh-torreon",
    active: true,
  },
  {
    id: "loc-002",
    localNumber: "B-11",
    businessName: "Frutas y Verduras La Cosecha",
    ownerName: "Familia Guerrero",
    category: "Frutas, Verduras y Perecederos",
    description:
      "Frescura garantizada directo del campo. Jitomate, chile, aguacate, nopales y más de 60 variedades.",
    imageUrl: "/locatarios/verduras.jpg",
    social: {
      whatsapp: "8712345678",
      instagram: "lacosecha_abasto",
      facebook: "LaCosechaFrutasVerduras",
    },
    featured: true,
    marketId: "mh-torreon",
    active: true,
  },
  {
    id: "loc-003",
    localNumber: "C-07",
    businessName: "Mariscos El Puerto",
    ownerName: "Héctor Villarreal",
    category: "Pescados y Mariscos",
    description:
      "Producto fresco llegado tres veces por semana del Golfo. Camarón, filete, pulpo y ostión al mayoreo.",
    imageUrl: "/locatarios/mariscos.jpg",
    social: {
      whatsapp: "8713456789",
      instagram: "mariscos_elpuerto",
    },
    featured: false,
    marketId: "mh-torreon",
    active: true,
  },
  {
    id: "loc-004",
    localNumber: "D-02",
    businessName: "Abarrotes San Marcos",
    ownerName: "Sra. Lupita Rodríguez",
    category: "Abarrotes y Granos",
    description:
      "Arroz, frijol, lentejas, pastas y especias a granel. Precios de mayoreo desde 1 kilo.",
    imageUrl: "/locatarios/abarrotes.jpg",
    social: {
      whatsapp: "8714567890",
      facebook: "AbarrotesSanMarcosGP",
    },
    featured: false,
    marketId: "mh-gomez",
    active: true,
  },
  {
    id: "loc-005",
    localNumber: "A-19",
    businessName: "Tortillería y Antojitos Doña Pati",
    ownerName: "Patricia Flores",
    category: "Pan, Tortilla y Comida",
    description:
      "Tortillas de maíz azul, amarillo y totopos artesanales. Sopes, gorditas y quesadillas al comal.",
    imageUrl: "/locatarios/tortilleria.jpg",
    social: {
      whatsapp: "8715678901",
      instagram: "donapati_tortilleria",
      facebook: "TortillasDoñaPati",
    },
    featured: true,
    marketId: "mh-gomez",
    active: true,
  },
  {
    id: "loc-006",
    localNumber: "E-03",
    businessName: "Limpieza Industrial Norteña",
    ownerName: "Ing. Carlos Montoya",
    category: "Limpieza y Desechables",
    description:
      "Detergentes, desinfectantes, aromatizantes y desechables a granel para negocios y hogares. Distribución a tiendas.",
    imageUrl: "/locatarios/limpieza.jpg",
    social: {
      whatsapp: "8716789012",
      instagram: "limpieza_nortena",
    },
    featured: false,
    marketId: "mh-monterrey",
    active: true,
  },
  {
    id: "loc-007",
    localNumber: "B-28",
    businessName: "El Rincón del Medicamento",
    ownerName: "QFB Ana González",
    category: "Salud y Farmacia",
    description:
      "Medicamentos genéricos y de patente. Vitaminas, suplementos deportivos y productos naturales certificados.",
    imageUrl: "/locatarios/farmacia.jpg",
    social: {
      whatsapp: "8717890123",
      facebook: "RinconDelMedicamento",
    },
    featured: false,
    marketId: "mh-monterrey",
    active: true,
  },
  {
    id: "loc-008",
    localNumber: "F-01",
    businessName: "Mayoreo Pacífico",
    ownerName: "Grupo Distribuciones Baja",
    category: "Mayoreo e Importaciones",
    description:
      "Importaciones directas de Asia. Electrodomésticos, herramientas, consumibles y novedades. Precios de contenedor.",
    imageUrl: "/locatarios/mayoreo.jpg",
    social: {
      whatsapp: "8718901234",
      instagram: "mayoreo_pacifico",
      facebook: "MayoreoPacificoMX",
    },
    featured: true,
    marketId: "mh-monterrey",
    active: true,
  },
];

// ─── EVENTOS ─────────────────────────────────────────────────
export const EVENTS: Event[] = [
  {
    id: "evt-001",
    title: "Feria del Productor Lagunero 2026",
    date: "2026-06-15",
    description:
      "Más de 40 productores locales presentan sus mejores cosechas. Degustaciones, talleres y precios especiales.",
    imageUrl: "/events/feria-productor.jpg",
    marketId: "mh-torreon",
  },
  {
    id: "evt-002",
    title: "Día del Comerciante Mercahorro",
    date: "2026-07-20",
    description:
      "Celebramos a los locatarios que hacen grande a Mercahorro. Sorteos, reconocimientos y dinámica especial para clientes.",
    imageUrl: "/events/dia-comerciante.jpg",
    marketId: "mh-gomez",
  },
];

// ─── RECETAS ─────────────────────────────────────────────────
export const RECIPES: Recipe[] = [
  {
    id: "rec-001",
    title: "Discada Lagunera Auténtica",
    slug: "discada-lagunera",
    description:
      "La receta original que se cocina en disco de arado con los mejores cortes del norte. Todo lo consigues en Mercahorro.",
    imageUrl: "/recipes/discada.jpg",
    category: "Carnes",
    marketId: "mh-torreon",
    ingredients: [
      { name: "Chorizo norteño", quantity: "300g", locatarioId: "loc-001" },
      { name: "Tocino ahumado", quantity: "200g", locatarioId: "loc-001" },
      { name: "Carne molida de res", quantity: "500g", locatarioId: "loc-001" },
      { name: "Chile poblano", quantity: "3 piezas", locatarioId: "loc-002" },
      { name: "Cebolla blanca", quantity: "2 piezas", locatarioId: "loc-002" },
      { name: "Jitomate bola", quantity: "4 piezas", locatarioId: "loc-002" },
      { name: "Tortillas de maíz", quantity: "1 kg", locatarioId: "loc-005" },
    ],
    steps: [
      "Calentar el disco a fuego alto y agregar el tocino en trozos.",
      "Incorporar el chorizo y acitronar junto al tocino.",
      "Agregar la cebolla y el chile en juliana; sofreír 5 minutos.",
      "Añadir la carne molida y cocinar hasta dorar completamente.",
      "Incorporar el jitomate picado y sazonar al gusto.",
      "Servir caliente con tortillas recién hechas.",
    ],
  },
];
