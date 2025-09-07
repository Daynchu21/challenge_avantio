import { Loader } from "@googlemaps/js-api-loader";
import { useState, useEffect } from "react";

export const useGoogleMapsLoader = (apiKey: string | undefined) => {
  const [google, setGoogle] = useState<typeof window.google>();

  useEffect(() => {
    let isMounted = true;
    if (apiKey) {
      new Loader({
        apiKey,
        version: "weekly",
        libraries: ["places"],
      })
        .load()
        .then((gg) => {
          if (isMounted) {
            setGoogle(gg);
          }
        })
        .catch((e) => {
          console.error("Failed to load Google Maps API", e);
        });
    }
    return () => {
      isMounted = false;
    };
  }, [apiKey]);

  return google;
};
