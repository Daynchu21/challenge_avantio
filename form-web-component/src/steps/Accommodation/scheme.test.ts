import { describe, expect, it } from "vitest";
import { accommodationSchema } from "./scheme";

describe("Accommodation schema validation", () => {
  const base = {
    name: "Hotel Example",
    address: "123 Main St",
    description: "x".repeat(128),
    type: "Villa",
    photos: ["http://example.com/photo1.jpg"],
  };

  it("valida ok con datos mínimos", () => {
    const r = accommodationSchema.safeParse(base);
    expect(r.success).toBe(true);
  });

  it("falla si name está vacío", () => {
    const r = accommodationSchema.safeParse({ ...base, name: "" });
    expect(r.success).toBe(false);
  });

  it("acepta description opcional vacía si así lo definiste", () => {
    const r = accommodationSchema.safeParse({ ...base, description: "" });
    expect(r.success).toBe(true);
  });

  it("limita cantidad de fotos (ej: max 2)", () => {
    const r = accommodationSchema.safeParse({
      ...base,
      photos: ["1", "2", "3"],
    });
    expect(r.success).toBe(false);
  });
});
