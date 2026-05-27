// ============================================================
// sanity/schemas/mercado.ts — Schema de Mercados
// ============================================================
import { defineField, defineType } from "sanity";

export default defineType({
  name: "mercado",
  title: "Mercados",
  type: "document",
  icon: () => "🏪",
  fields: [
    defineField({
      name: "name",
      title: "Nombre del Mercado",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "city",
      title: "Ciudad",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "state",
      title: "Estado",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Dirección",
      type: "string",
    }),
    defineField({
      name: "totalLocals",
      title: "Total de Locales",
      type: "number",
    }),
    defineField({
      name: "sqm",
      title: "Metros Cuadrados",
      type: "number",
    }),
    defineField({
      name: "openYear",
      title: "Año de Apertura",
      type: "number",
    }),
    defineField({
      name: "heroImage",
      title: "Imagen Principal",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "city" },
  },
});
