import { useEffect, useRef } from "react";
import { useGoogleAutocomplete } from "../../../hooks/useGoogleAutocomplete";

type AddressInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "onBlur" | "value" | "defaultValue"
> & {
  value: string;
  onChange: (value: string) => void; // handler controlado
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  error?: string;
  google?: typeof window.google;
  country?: string;
  className?: string;
};

export default function AddressInput({
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  google,
  country,
  ...props
}: AddressInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const selectingRef = useRef(false); // true mientras se hace click en una .pac-item

  // Marca cuando el blur viene de un click en el dropdown de Google (.pac-item)
  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && el.closest(".pac-item")) {
        selectingRef.current = true;
      }
    };
    const onMouseUp = () => {
      // resetea justo después del click
      // (usar setTimeout para dejar que place_changed se dispare primero)
      setTimeout(() => (selectingRef.current = false), 0);
    };

    document.addEventListener("mousedown", onMouseDown, true);
    document.addEventListener("mouseup", onMouseUp, true);
    return () => {
      document.removeEventListener("mousedown", onMouseDown, true);
      document.removeEventListener("mouseup", onMouseUp, true);
    };
  }, []);

  useGoogleAutocomplete({
    google,
    inputRef,
    country,
    onPlaceSelect: (selectedAddress) => {
      // Cuando el usuario selecciona una sugerencia del dropdown:
      onChange(selectedAddress);
      // Si quieres validar aquí en vez de en onBlur, hazlo desde el padre
      // (ej. llamar a schema.safeParse en ese momento)
    },
  });

  useGoogleAutocomplete({
    google,
    inputRef,
    country,
    onPlaceSelect: (selectedAddress) => {
      onChange(selectedAddress);
    },
  });

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    // Si el blur viene por click en .pac-item, lo ignoramos
    if (selectingRef.current) return;
    onBlur?.(e);
  };

  return (
    <input
      ref={inputRef}
      className={`mt-1 w-full rounded-md border p-2 ${
        error ? "border-red-500" : "border-neutral-300"
      }`}
      value={value}
      placeholder={placeholder}
      onBlur={handleBlur}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      autoComplete="off"
      {...props}
    />
  );
}
