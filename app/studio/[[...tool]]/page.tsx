// ============================================================
// app/studio/[[...tool]]/page.tsx
// Monta el Panel de Control en localhost:3000/studio
// ============================================================
"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
