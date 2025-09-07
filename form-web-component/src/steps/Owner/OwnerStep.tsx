import React, { useMemo } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import TextField from "../../components/ui/TextField";
import ButtonUI from "../../components/ui/Button";
import type { Owner } from "../../types";
import { ownerSchema } from "./scheme";

type Props = {
  owner: Owner;
  setOwner: React.Dispatch<React.SetStateAction<Owner>>;
  errors: Record<string, string>;
  next: () => void;
  back: () => void;
};

export default function OwnerStep({
  owner,
  setOwner,
  errors,
  next,
  back,
}: Props) {
  const shape = ownerSchema.shape;
  const requiredSchema = useMemo(
    () => ownerSchema.pick({ name: true, email: true, phone: true }),
    []
  );

  const isValidRequired = useMemo(() => {
    const r = requiredSchema.safeParse(owner);
    return r.success;
  }, [ownerSchema, owner]);

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Owner</h2>
      <TextField
        label="Name"
        value={owner.name}
        onChange={(value) => setOwner({ ...owner, name: value })}
        error={errors.name}
        required
        type="text"
        placeholder="Enter name"
        schema={shape.name}
      />
      <TextField
        label="Email"
        value={owner.email}
        onChange={(value) => setOwner({ ...owner, email: value })}
        error={errors.email}
        required
        type="text"
        placeholder="Enter email"
        schema={shape.email}
      />
      <label className="block mb-6">
        <span className="text-sm">Phone</span>
        <PhoneInput
          className="mt-1 w-full rounded-md border p-2"
          defaultCountry="ES"
          value={owner.phone === "" ? undefined : owner.phone}
          onChange={(value) => setOwner({ ...owner, phone: value || "" })}
          international
          countryCallingCodeEditable={false}
        />
        {errors.phone && (
          <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
        )}
      </label>
      <div className="flex gap-3">
        <ButtonUI
          onClick={back}
          variant="white"
          className="flex-1 rounded-xl font-medium py-3"
        >
          Back
        </ButtonUI>
        <ButtonUI
          onClick={next}
          variant="blue"
          className="flex-1 rounded-xl font-medium py-3"
          disabled={!isValidRequired}
        >
          Next
        </ButtonUI>
      </div>
    </section>
  );
}
