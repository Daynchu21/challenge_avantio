import { describe, expect, it } from "vitest";
import { ownerSchema } from "./scheme";

describe("scheme owner validation", () => {
  const base = {
    name: "John Doe",
    email: "casa@gmail.com",
    phone: "+54 11 1234-5678",
  };

  it("should accept valid data", () => {
    const r = ownerSchema.safeParse(base);
    expect(r.success).toBe(true);
  });

  it("should reject empty name", () => {
    const r = ownerSchema.safeParse({ ...base, name: "" });
    expect(r.success).toBe(false);
  });

  it("should optional phone", () => {
    const r = ownerSchema.safeParse({ ...base, phone: "" });
    expect(r.success).toBe(true);
  });
});
