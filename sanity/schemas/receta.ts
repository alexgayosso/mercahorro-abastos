// ============================================================
// sanity/schemas/receta.ts — Schema de Recetas con Cross-Selling
// ============================================================
import { defineField, defineType } from "sanity";

export default defineType({
  name: "receta",
  title: "Recetas",
  type: "document",
  icon: () => "🍽️",
  fields: [
    defineField({
      name: "title",
      title: "Nombre de la Receta",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL de la Receta",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descripción Corta",
      description: "Una línea que aparece en la tarjeta de la receta",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "image",
      title: "Foto de la Receta",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "category",
      title: "Categoría",
      type: "string",
      options: {
        list: [
          { title: "🥩 Carnes", value: "Carnes" },
          { title: "🐟 Mariscos", value: "Mariscos" },
          { title: "🥦 Vegetariana", value: "Vegetariana" },
          { title: "🍽️ Antojitos", value: "Antojitos" },
          { title: "🍞 Panadería", value: "Panadería" },
          { title: "🍬 Postres", value: "Postres" },
        ],
      },
    }),
    defineField({
      name: "market",
      title: "Mercado",
      type: "reference",
      to: [{ type: "mercado" }],
    }),
    defineField({
      name: "ingredients",
      title: "Ingredientes",
      type: "array",
      of: [
        {
          type: "object",
          name: "ingredient",
          title: "Ingrediente",
          fields: [
            defineField({
              name: "name",
              title: "Ingrediente",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "quantity",
              title: "Cantidad",
              description: "Ej: 500g, 3 piezas, 1 taza",
              type: "string",
            }),
            defineField({
              name: "locatario",
              title: "¿Dónde comprarlo en Mercahorro?",
              description: "Opcional — vincula al local que vende este ingrediente",
              type: "reference",
              to: [{ type: "locatario" }],
            }),
          ],
          preview: {
            select: {
              title: "name",
              subtitle: "quantity",
            },
          },
        },
      ],
    }),
    defineField({
      name: "steps",
      title: "Pasos de Preparación",
      type: "array",
      of: [{ type: "text" }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "image",
    },
  },
});
