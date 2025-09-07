import FormStepper from "./steps/FormStepper";

export default function App() {
  return (
    <FormStepper
      mapsKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      country={import.meta.env.VITE_GOOGLE_COUNTRY}
    />
  );
}
