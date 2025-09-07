import { describe, expect, it, vi } from "vitest";
import { registerStepperElement } from "./custom-element";

describe("custom-react-form web component", () => {
  it("emit custom-react-submit with detail", () => {
    registerStepperElement();

    const el = document.createElement("custom-react-form");
    document.body.appendChild(el);

    const handler = vi.fn();
    el.addEventListener("custom-react-submit", handler);

    el.dispatchEvent(
      new CustomEvent("custom-react-submit", {
        detail: {
          accommodation: {
            name: "Test",
            address: "Address",
            description: "Desc",
            type: "Type",
            photos: [],
          },
          owner: {
            name: "Owner",
            email: "casa@gmail.com",
            phone: "+541112345678",
          },
        },
        bubbles: true,
        composed: true,
      })
    );

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: {
          accommodation: {
            name: "Test",
            address: "Address",
            description: "Desc",
            type: "Type",
            photos: [],
          },
          owner: {
            name: "Owner",
            email: "casa@gmail.com",
            phone: "+541112345678",
          },
        },
      })
    );
  });
});
