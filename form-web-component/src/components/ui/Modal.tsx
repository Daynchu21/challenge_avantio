import React, { useEffect, useState } from "react";

export type ModalUIProps = {
  open: boolean;
  onClose: () => void;
  icon: React.ReactNode;
  text: string;
  className?: string;
  overlayClassName?: string;
};

const ModalUI: React.FC<ModalUIProps> = ({
  open,
  onClose,
  icon,
  text,
  className = "",
  overlayClassName = "",
}) => {
  const [show, setShow] = useState(open);
  const [fade, setFade] = useState("");

  useEffect(() => {
    if (open) {
      setShow(true);
      setTimeout(() => setFade("opacity-100"), 10);
    } else {
      setFade("opacity-0");
      const timeout = setTimeout(() => setShow(false), 200);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-200 ${fade} ${overlayClassName}`}
      style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
      onClick={onClose}
    >
      <div
        className={`relative bg-white rounded-lg shadow-lg p-6 flex flex-col items-center min-w-[280px] max-w-[90vw] transition-all duration-200 ${fade} ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl font-bold focus:outline-none"
          onClick={onClose}
          aria-label="Cerrar modal"
          type="button"
        >
          ×
        </button>
        <div className="mb-4 text-4xl">{icon}</div>
        <div className="text-center text-base text-gray-700">{text}</div>
      </div>
    </div>
  );
};

export default ModalUI;
