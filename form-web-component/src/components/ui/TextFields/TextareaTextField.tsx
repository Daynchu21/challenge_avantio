export default function TextareaInput({
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  ...props
}: Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "onChange" | "onBlur"
> & {
  onChange: (value: string) => void; // tu handler controlado
  error?: string;
  onBlur?: React.FocusEventHandler;
}) {
  return (
    <textarea
      className={`mt-1 w-full rounded-md border p-2 ${
        error ? "border-red-500" : "border-neutral-300"
      }`}
      rows={3}
      value={value}
      placeholder={placeholder}
      onBlur={onBlur}
      onChange={(e) => onChange(e.target.value)}
      {...props}
    />
  );
}
