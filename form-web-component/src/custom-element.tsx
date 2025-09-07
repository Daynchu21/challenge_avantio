import React from "react";
import ReactDOM from "react-dom/client";
import FormStepper from "./steps/FormStepper";
import "./styles/global.css";

class StepperElement extends HTMLElement {
  private root?: ReactDOM.Root;

  private mountStylesInto(shadow: ShadowRoot) {
    const injected = document.getElementById(
      "formwc-styles"
    ) as HTMLStyleElement | null;
    if (injected) {
      shadow.appendChild(injected.cloneNode(true));
    } else {
      requestAnimationFrame(() => this.mountStylesInto(shadow));
    }
  }

  connectedCallback() {
    const mapsKey = this.getAttribute("maps-key") || undefined;
    const country = this.getAttribute("country") || undefined;
    const shadow = this.attachShadow({ mode: "open" });

    this.mountStylesInto(shadow);

    const mountPoint = document.createElement("div");
    shadow.appendChild(mountPoint);

    this.root = ReactDOM.createRoot(mountPoint);
    this.root.render(
      <React.StrictMode>
        <FormStepper
          mapsKey={mapsKey}
          country={country}
          onSubmit={(payload) => {
            const ev = new CustomEvent("custom-react-submit", {
              detail: payload,
              bubbles: true,
              composed: true,
            });
            this.dispatchEvent(ev);
          }}
        />
      </React.StrictMode>
    );
  }

  disconnectedCallback() {
    this.root?.unmount();
  }
}

export function registerStepperElement(tag = "custom-react-form") {
  if (!customElements.get(tag)) {
    customElements.define(tag, StepperElement);
  }
}

registerStepperElement();
