import { useEffect, useRef } from "react";

type UseAutocompleteProps = {
  google?: typeof window.google | null;
  inputRef: React.RefObject<HTMLInputElement | null>;
  country?: string;
  onPlaceSelect: (address: string) => void;
};

export const useGoogleAutocomplete = ({
  google,
  inputRef,
  country,
  onPlaceSelect,
}: UseAutocompleteProps) => {
  const acRef = useRef<google.maps.places.Autocomplete | null>(null);
  const selectingFromAC = useRef(false);

  useEffect(() => {
    if (!google || !inputRef.current) return;

    if (acRef.current) {
      google.maps.event.clearInstanceListeners(acRef.current);
      acRef.current = null;
    }

    acRef.current = new google.maps.places.Autocomplete(inputRef.current, {
      fields: [
        "formatted_address",
        "geometry",
        "place_id",
        "address_components",
      ],
      types: ["address"],
      componentRestrictions: country ? { country } : undefined,
    });
    const handlePlaceChanged = () => {
      const place = acRef.current!.getPlace();
      const address = place?.formatted_address || inputRef.current!.value || "";

      selectingFromAC.current = true;

      if (inputRef.current) inputRef.current.value = address;

      onPlaceSelect(address);

      queueMicrotask(() => (selectingFromAC.current = false));
    };

    const listener = acRef.current.addListener(
      "place_changed",
      handlePlaceChanged
    );

    return () => {
      if (listener) {
        google.maps.event.removeListener(listener);
      }
      if (acRef.current) {
        google.maps.event.clearInstanceListeners(acRef.current);
        acRef.current = null;
      }
    };
  }, [google, country]);
};
