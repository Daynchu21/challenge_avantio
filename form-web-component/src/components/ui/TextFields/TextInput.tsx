export default function TextInput({
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  ...props
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  error?: string;
  onChange: (value: string) => void;
}) {
  return (
    <input
      className={`mt-1 w-full rounded-md border p-2 ${
        error ? "border-red-500" : "border-neutral-300"
      }`}
      value={value}
      placeholder={placeholder}
      onBlur={onBlur}
      onChange={(e) => onChange(e.target.value)}
      {...props}
    />
  );
}
