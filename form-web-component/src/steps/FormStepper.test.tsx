import { describe, expect, it } from "vitest";
import { accommodationSchema } from "./Accommodation/scheme";
import { formSchema } from "../validation/rootSchema";

describe("stepper flow (service and logic)", () => {
  const validAccommodation = {
    name: "Test",
    address: "Address",
    description: "Desc".repeat(128),
    type: "apartment",
    photos: [],
  };

  const validOwner = {
    name: "Owner",
    email: "casa@gmail.com",
    phone: "",
  };

  it("should not pass next step if 0 is not valid", () => {
    const InvalidAccommodation = { ...validAccommodation, name: "" };
    const r = accommodationSchema.safeParse(InvalidAccommodation);
    expect(r.success).toBe(false);
  });

  it("submit valid with both steps valid", () => {
    const res = formSchema.safeParse({
      accommodation: validAccommodation,
      owner: validOwner,
    });
    expect(res.success).toBe(true);
  });
});
