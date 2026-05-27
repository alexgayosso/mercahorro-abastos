import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "mercahorro-abastos",
  title: "Mercahorro Abastos — Panel de Control",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Panel de Control")
          .items([
            S.listItem()
              .title("🏪 Mercados")
              .child(S.documentTypeList("mercado").title("Mercados")),
            S.listItem()
              .title("🏬 Locatarios")
              .child(S.documentTypeList("locatario").title("Locatarios")),
            S.listItem()
              .title("📅 Eventos")
              .child(S.documentTypeList("evento").title("Eventos")),
            S.listItem()
              .title("🍽️ Recetas")
              .child(S.documentTypeList("receta").title("Recetas")),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
