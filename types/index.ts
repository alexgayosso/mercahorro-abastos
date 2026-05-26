// ============================================================
// MERCAHORRO ABASTOS — TYPE DEFINITIONS
// ============================================================

export type BackendCategory =
  | "Frutas, Verduras y Perecederos"
  | "Carnicerías y Cárnicos"
  | "Pescados y Mariscos"
  | "Abarrotes y Granos"
  | "Pan, Tortilla y Comida"
  | "Restaurantes y Fast Food"
  | "Dulces y Materias Primas"
  | "Limpieza y Desechables"
  | "Hogar y Ferretería"
  | "Ropa y Accesorios"
  | "Salud y Farmacia"
  | "Tecnología y Papelería"
  | "Mayoreo e Importaciones"
  | "Tradición y Herbolaria"
  | "Juegos y Entretenimiento"
  | "Servicios y Trámites";

export type FilterButton =
  | "Frescos"
  | "Carnes"
  | "Mariscos"
  | "Abarrotes"
  | "Comida"
  | "Limpieza"
  | "Hogar"
  | "Ropa"
  | "Salud"
  | "Tecnología"
  | "Mayoreo"
  | "Servicios";

// Map frontend filter buttons → backend categories
export const FILTER_TO_CATEGORIES: Record<FilterButton, BackendCategory[]> = {
  Frescos: ["Frutas, Verduras y Perecederos"],
  Carnes: ["Carnicerías y Cárnicos"],
  Mariscos: ["Pescados y Mariscos"],
  Abarrotes: ["Abarrotes y Granos", "Dulces y Materias Primas"],
  Comida: ["Pan, Tortilla y Comida", "Restaurantes y Fast Food"],
  Limpieza: ["Limpieza y Desechables"],
  Hogar: ["Hogar y Ferretería"],
  Ropa: ["Ropa y Accesorios"],
  Salud: ["Salud y Farmacia", "Tradición y Herbolaria"],
  Tecnología: ["Tecnología y Papelería"],
  Mayoreo: ["Mayoreo e Importaciones"],
  Servicios: ["Servicios y Trámites", "Juegos y Entretenimiento"],
};

export interface SocialLinks {
  whatsapp?: string;
  instagram?: string;
  facebook?: string;
}

export interface Locatario {
  id: string;
  localNumber: string;     // e.g. "A-12"
  businessName: string;
  ownerName: string;
  category: BackendCategory;
  description: string;
  logoUrl?: string;
  imageUrl?: string;
  social: SocialLinks;
  featured: boolean;
  marketId: string;        // links to a Market
  active: boolean;
}

export interface Market {
  id: string;
  name: string;
  city: string;
  state: string;
  address: string;
  totalLocals: number;
  sqm: number;
  openYear: number;
  heroImageUrl?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  imageUrl?: string;
  marketId: string;
}

export interface RecipeIngredient {
  name: string;
  quantity: string;
  locatarioId?: string;   // inject merchant card dynamically
}

export interface Recipe {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl?: string;
  ingredients: RecipeIngredient[];
  steps: string[];
  category: string;
  marketId: string;
}
