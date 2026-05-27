// ============================================================
// sanity/schemas/locatario.ts — Schema de Locatarios
// ============================================================
import { defineField, defineType } from "sanity";

const CATEGORIAS = [
  { title: "🥦 Frutas, Verduras y Perecederos", value: "Frutas, Verduras y Perecederos" },
  { title: "🥩 Carnicerías y Cárnicos", value: "Carnicerías y Cárnicos" },
  { title: "🐟 Pescados y Mariscos", value: "Pescados y Mariscos" },
  { title: "🛒 Abarrotes y Granos", value: "Abarrotes y Granos" },
  { title: "🍽️ Pan, Tortilla y Comida", value: "Pan, Tortilla y Comida" },
  { title: "🍔 Restaurantes y Fast Food", value: "Restaurantes y Fast Food" },
  { title: "🍬 Dulces y Materias Primas", value: "Dulces y Materias Primas" },
  { title: "✨ Limpieza y Desechables", value: "Limpieza y Desechables" },
  { title: "🔨 Hogar y Ferretería", value: "Hogar y Ferretería" },
  { title: "👕 Ropa y Accesorios", value: "Ropa y Accesorios" },
  { title: "💊 Salud y Farmacia", value: "Salud y Farmacia" },
  { title: "💻 Tecnología y Papelería", value: "Tecnología y Papelería" },
  { title: "📦 Mayoreo e Importaciones", value: "Mayoreo e Importaciones" },
  { title: "🌿 Tradición y Herbolaria", value: "Tradición y Herbolaria" },
  { title: "🎮 Juegos y Entretenimiento", value: "Juegos y Entretenimiento" },
  { title: "🔧 Servicios y Trámites", value: "Servicios y Trámites" },
];

export default defineType({
  name: "locatario",
  title: "Locatarios",
  type: "document",
  icon: () => "🏬",
  fields: [
    defineField({
      name: "localNumber",
      title: "Número de Local",
      description: "Ej: A-04, B-11, C-07",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "businessName",
      title: "Nombre del Negocio",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ownerName",
      title: "Nombre del Propietario",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Categoría",
      type: "string",
      options: {
        list: CATEGORIAS,
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descripción del Negocio",
      description: "Máximo 2-3 líneas. Qué venden, qué los hace especiales.",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "image",
      title: "Foto del Local",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "market",
      title: "Mercado",
      type: "reference",
      to: [{ type: "mercado" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "social",
      title: "Redes Sociales",
      type: "object",
      fields: [
        defineField({
          name: "whatsapp",
          title: "WhatsApp",
          description: "Solo los 10 dígitos, sin +52. Ej: 8121234567",
          type: "string",
        }),
        defineField({
          name: "instagram",
          title: "Instagram",
          description: "Solo el @handle sin el @. Ej: carniceria_cortefino",
          type: "string",
        }),
        defineField({
          name: "facebook",
          title: "Facebook",
          description: "Nombre de la página de Facebook",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "featured",
      title: "¿Destacado?",
      description: "Los locales destacados aparecen primero y con badge naranja",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "active",
      title: "¿Activo?",
      description: "Desactiva para ocultar sin borrar",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "businessName",
      subtitle: "localNumber",
      media: "image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: `Local ${subtitle}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Número de Local",
      name: "localNumberAsc",
      by: [{ field: "localNumber", direction: "asc" }],
    },
    {
      title: "Nombre del Negocio",
      name: "businessNameAsc",
      by: [{ field: "businessName", direction: "asc" }],
    },
  ],
});
