// ============================================================
// lib/sanity.queries.ts — Todas las queries GROQ
// ============================================================
import { client } from "./sanity.client";

// ─── LOCATARIOS ──────────────────────────────────────────────
export async function getLocatarios() {
  return client.fetch(
    `*[_type == "locatario" && active == true] | order(featured desc, localNumber asc) {
      _id,
      localNumber,
      businessName,
      ownerName,
      category,
      description,
      "imageUrl": image.asset->url,
      social,
      featured,
      "marketId": market->_id,
      "marketName": market->name,
      "marketCity": market->city,
      active
    }`
  );
}

export async function getLocatarioById(id: string) {
  return client.fetch(
    `*[_type == "locatario" && _id == $id][0] {
      _id,
      localNumber,
      businessName,
      ownerName,
      category,
      description,
      "imageUrl": image.asset->url,
      social,
      featured,
      "marketId": market->_id,
      "marketName": market->name,
      active
    }`,
    { id }
  );
}

// ─── MERCADOS ────────────────────────────────────────────────
export async function getMercados() {
  return client.fetch(
    `*[_type == "mercado"] | order(name asc) {
      _id,
      name,
      city,
      state,
      address,
      totalLocals,
      sqm,
      openYear,
      "heroImageUrl": heroImage.asset->url
    }`
  );
}

// ─── EVENTOS ─────────────────────────────────────────────────
export async function getEventos() {
  return client.fetch(
    `*[_type == "evento"] | order(date asc) {
      _id,
      title,
      date,
      description,
      "imageUrl": image.asset->url,
      "marketId": market->_id,
      "marketName": market->name
    }`
  );
}

// ─── RECETAS ─────────────────────────────────────────────────
export async function getRecetas() {
  return client.fetch(
    `*[_type == "receta"] | order(_createdAt desc) {
      _id,
      title,
      slug,
      description,
      "imageUrl": image.asset->url,
      category,
      ingredients[] {
        name,
        quantity,
        "locatario": locatario-> {
          _id,
          localNumber,
          businessName,
          category,
          "social": social
        }
      },
      steps,
      "marketId": market->_id
    }`
  );
}
