import React, { useEffect } from "react";


interface ModalProps {
  isOpen: boolean;
  onClose: () => void; // A function that returns nothing
  children: React.ReactNode; // Anything React can render (JSX, strings, etc.)
}

// 2. Apply the interface to your function
export default function Modal({ isOpen, onClose, children }: ModalProps) {
  // Close on Escape key logic
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {children}
      </div>
    </div>
  );
}