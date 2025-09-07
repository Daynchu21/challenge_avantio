import type { Accommodation, Owner } from "../../types";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import ButtonUI from "../../components/ui/Button";
import TextElementUI from "../../components/ui/TextElement";

type Props = {
  accommodation: Accommodation;
  submit: () => void;
  owner: Owner;
  back: () => void;
  submitting?: boolean; // opcional si quieres mostrar loader
  feedback?: { type: "success" | "error"; msg: string } | null;
};

export default function SummaryStep({
  accommodation,
  submit,
  owner,
  back,
  submitting,
}: Props) {
  return (
    <section>
      <h1 className="text-xl font-semibold mb-4">Accommodation</h1>
      <div className="space-y-4 text-sm">
        <div>
          <TextElementUI label="Name" value={accommodation.name || "—"} />
          <TextElementUI label="Address" value={accommodation.address || "—"} />
          {accommodation.description && (
            <TextElementUI
              label="Description"
              value={accommodation.description}
              valueClassName="break-words max-w-full whitespace-pre-line w-full overflow-x-auto"
            />
          )}
          <TextElementUI label="Type" value={accommodation.type || "—"} />
          {Array.isArray(accommodation.photos) &&
            accommodation.photos.length > 0 && (
              <>
                <TextElementUI label="Photos" value="" />
                <div className="mt-2 flex gap-3">
                  {accommodation.photos.map((p, idx) => (
                    <div
                      key={idx}
                      className="rounded-md border overflow-hidden w-[100px] h-[100px] bg-rose-100 first:bg-emerald-100 flex items-center justify-center"
                    >
                      {p.startsWith("data:image") ? (
                        <img
                          src={p}
                          alt={`Photo ${idx + 1}`}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <span className="text-xs text-gray-500">No image</span>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
        </div>
        <h1 className="text-xl font-semibold mb-4">Owner</h1>
        <div>
          <TextElementUI label="Name" value={owner.name || "—"} />
          <TextElementUI label="Email" value={owner.email || "—"} />
          {owner.phone && (
            <TextElementUI
              label="Phone"
              value={(() => {
                const phoneNumber = parsePhoneNumberFromString(
                  owner.phone || ""
                );
                const country = phoneNumber?.country || "";
                function countryToFlag(iso: string) {
                  return iso
                    .toUpperCase()
                    .replace(/./g, (char) =>
                      String.fromCodePoint(127397 + char.charCodeAt(0))
                    );
                }
                return (
                  <>
                    {country && (
                      <span className="mr-1">{countryToFlag(country)}</span>
                    )}
                    {owner.phone}
                  </>
                );
              })()}
            />
          )}
        </div>
      </div>
      <div className="mt-6 flex gap-3">
        <ButtonUI
          onClick={back}
          variant="white"
          className="flex-1 rounded-xl font-medium py-3"
        >
          Back
        </ButtonUI>
        <ButtonUI
          onClick={submitting ? undefined : submit}
          variant="blue"
          className="flex-1 rounded-xl font-semibold py-3"
          disabled={submitting}
        >
          {submitting ? "Submitting…" : "Submit"}
        </ButtonUI>
      </div>
    </section>
  );
}
