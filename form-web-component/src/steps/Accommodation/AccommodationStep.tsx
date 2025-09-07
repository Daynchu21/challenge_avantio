import { useMemo, useState, type Dispatch, type SetStateAction } from "react";
import TextField from "../../components/ui/TextField";
import ButtonUI from "../../components/ui/Button";
import ModalUI from "../../components/ui/Modal";
import type { Accommodation } from "../../types";
import { accommodationSchema } from "./scheme";

type Props = {
  google: typeof google | undefined;
  country?: string; // ej: "AR", "ES", etc.
  accommodation: Accommodation;
  setAccommodation: Dispatch<SetStateAction<Accommodation>>;
  errors: Record<string, string>;
  next: () => void;
};

export default function AccommodationStep({
  google,
  country,
  accommodation,
  setAccommodation,
  errors,
  next,
}: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const shape = accommodationSchema.shape;

  const requiredSchema = useMemo(
    () => accommodationSchema.pick({ name: true, address: true, type: true }),
    []
  );

  const isValidRequired = useMemo(() => {
    const r = requiredSchema.safeParse(accommodation);
    return r.success;
  }, [requiredSchema, accommodation]);

  const handleChange = (name: string, value: string | Array<string>) => {
    setAccommodation((prevAccommodation) => ({
      ...prevAccommodation,
      [name]: value,
    }));
  };

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Accommodation</h2>
      <TextField
        label="Name"
        value={accommodation.name}
        onChange={(value) => handleChange("name", value)}
        error={errors.name}
        required
        type="text"
        placeholder="Enter name"
        schema={shape.name}
      />
      <TextField
        type="address"
        label="Address"
        value={accommodation.address}
        placeholder="Enter address"
        required
        error={errors.address}
        schema={shape.address}
        google={google} // puede ser undefined; el input funciona igual
        country={country}
        onChange={(value) => handleChange("address", value)}
      />
      <TextField
        label="Description"
        value={accommodation.description}
        onChange={(value) => handleChange("description", value)}
        error={errors.description}
        type="textarea"
        placeholder="Enter description"
        schema={shape.description}
      />
      <TextField
        label="Type"
        value={accommodation.type}
        onChange={(value) => handleChange("type", value)}
        error={errors.type}
        required
        type="select"
        options={[
          { value: "apartment", label: "Apartment" },
          { value: "house", label: "House" },
          { value: "villa", label: "Villa" },
        ]}
        schema={shape.type}
      />
      <div className="mb-6">
        <span className="text-sm block mb-2">Photos</span>
        <div className="flex gap-3">
          {accommodation.photos.map((photo, idx) => (
            <div
              key={idx}
              className="relative group rounded-md border overflow-hidden w-[100px] h-[100px] bg-rose-100 first:bg-emerald-100 flex items-center justify-center"
            >
              {photo.startsWith("data:image") ? (
                <img
                  src={photo}
                  alt={`Photo ${idx + 1}`}
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-xs text-gray-500">No image</span>
              )}
              <button
                type="button"
                className="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full px-1 text-xs text-red-600 font-bold opacity-80 hover:opacity-100 cursor-pointer"
                onClick={() => {
                  setAccommodation((prev) => ({
                    ...prev,
                    photos: prev.photos.filter((_, i) => i !== idx),
                  }));
                }}
                aria-label="Remove photo"
              >
                ×
              </button>
            </div>
          ))}
          {accommodation.photos.length < 2 && (
            <div className="w-[100px] h-[100px] flex items-center justify-center">
              <TextField
                label=""
                value={""}
                onChange={(imgValue) => {
                  const img = new window.Image();
                  img.onload = () => {
                    if (img.width > 500 || img.height > 500) {
                      setModalOpen(true);
                      return;
                    }
                    handleChange("photos", [...accommodation.photos, imgValue]);
                  };
                  img.src = imgValue;
                }}
                type="image"
                widthImage={100}
                heightImage={100}
                className="w-full h-full"
              />
            </div>
          )}
        </div>
      </div>
      <ButtonUI
        onClick={next}
        variant="blue"
        className="w-full rounded-xl font-medium py-3"
        disabled={!isValidRequired}
      >
        Next
      </ButtonUI>
      <ModalUI
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        icon={
          <span role="img" aria-label="warning">
            ⚠️
          </span>
        }
        text="The image must be a maximum of 500x500 pixels."
      />
    </section>
  );
}
