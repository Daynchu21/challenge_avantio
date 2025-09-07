export default function ImageInput({
  value,
  onChange,
  widthImage = 100,
  heightImage = 100,
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  onChange: (value: string) => void;
  widthImage?: number;
  heightImage?: number;
}) {
  return (
    <div className="flex flex-col gap-2 mt-1 items-center justify-center">
      {value && typeof value === "string" && value.startsWith("data:image") ? (
        <img
          src={value}
          alt="Preview"
          style={{
            width: widthImage,
            height: heightImage,
            objectFit: "cover",
            borderRadius: 8,
            border: "1px solid #ddd",
            display: "block",
          }}
        />
      ) : (
        <label
          className="rounded-md border text-sm flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100"
          style={{
            width: widthImage,
            height: heightImage,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            verticalAlign: "middle",
          }}
        >
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = (ev) => {
                const result =
                  typeof ev.target?.result === "string"
                    ? ev.target.result
                    : null;
                if (result) onChange(result);
              };
              reader.readAsDataURL(file);
              e.target.value = "";
            }}
          />
          <span className="text-xs text-center text-gray-500">
            Upload Image
          </span>
        </label>
      )}
    </div>
  );
}
