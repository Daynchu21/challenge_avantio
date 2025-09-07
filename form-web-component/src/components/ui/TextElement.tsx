import React from "react";

export type TextElementUIProps = {
  label: string;
  value: React.ReactNode;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
};

const TextElementUI: React.FC<TextElementUIProps> = ({
  label,
  value,
  className = "",
  labelClassName = "",
  valueClassName = "",
}) => (
  <div className={`flex items-baseline gap-2 ${className}`}>
    <span className={`font-bold font-weight-700 ${labelClassName}`}>
      {label}:
    </span>
    <span className={valueClassName}>{value}</span>
  </div>
);

export default TextElementUI;
