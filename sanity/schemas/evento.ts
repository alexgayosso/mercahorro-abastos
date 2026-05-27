// ============================================================
// sanity/schemas/evento.ts
// ============================================================
import { defineField, defineType } from "sanity";

export default defineType({
  name: "evento",
  title: "Eventos",
  type: "document",
  icon: () => "📅",
  fields: [
    defineField({
      name: "title",
      title: "Nombre del Evento",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Fecha",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descripción",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "image",
      title: "Imagen del Evento",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "market",
      title: "Mercado",
      type: "reference",
      to: [{ type: "mercado" }],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "date" },
  },
});
