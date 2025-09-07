export default function SelectInput({
  value,
  onChange,
  onBlur,
  options = [],
  error,
  ...props
}: Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "onChange" | "onBlur" | "value" | "defaultValue" | "children"
> & {
  value: string;
  options?: { value: string; label: string }[];
  onChange: (value: string) => void; // handler controlado
  onBlur?: React.FocusEventHandler<HTMLSelectElement>;
  error?: string;
  placeholderOption?: string; // opcional: texto inicial
  className?: string;
}) {
  return (
    <select
      className={`mt-1 w-full rounded-md border p-2 ${
        error ? "border-red-500" : "border-neutral-300"
      }`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      {...props}
    >
      <option value="">Select…</option>
      {options.map((opt: { value: string; label: string }) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
