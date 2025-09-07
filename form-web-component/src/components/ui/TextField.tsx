import type { ZodTypeAny } from "zod";
import { useState } from "react";
import TextInput from "./TextFields/TextInput";
import SelectInput from "./TextFields/SelectTextField";
import TextareaInput from "./TextFields/TextareaTextField";
import ImageInput from "./TextFields/ImageTextField";
import AddressInput from "./TextFields/AddressTextField";
export type FormInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  type?: "text" | "select" | "textarea" | "image" | "address";
  options?: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
  widthImage?: number;
  heightImage?: number;
  schema?: ZodTypeAny;
  google?: typeof google;
  country?: string;
  onPlaceSelect?: (place: { address: string }) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

const components = {
  text: TextInput,
  select: SelectInput,
  textarea: TextareaInput,
  image: ImageInput,
  address: AddressInput,
};

export default function TextField(props: FormInputProps) {
  const {
    label,
    error,
    required = false,
    type = "text",
    className = "",
    schema,
    onBlur,
    value,
    ...rest
  } = props;
  const [localError, setLocalError] = useState<string | undefined>(undefined);
  const InputComponent = components[type] || TextInput;

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (schema) {
      const result = schema.safeParse(value);
      if (!result.success) {
        setLocalError(result.error.issues[0]?.message || "Campo inválido");
      } else {
        setLocalError(undefined);
      }
    }
    if (onBlur) onBlur(e);
  };

  return (
    <label className={`block mb-2 ${className}`}>
      <span className="text-sm">
        {label} {required && <span className="text-red-600">*</span>}
      </span>
      <InputComponent
        {...rest}
        value={value}
        error={error || localError}
        onBlur={handleBlur}
      />
      {(error || localError) && (
        <p className="mt-1 text-xs text-red-600">{error || localError}</p>
      )}
    </label>
  );
}
