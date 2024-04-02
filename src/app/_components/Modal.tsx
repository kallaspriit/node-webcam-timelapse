import { Spinner } from "@/app/_components/Spinner";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";

export interface ModalProps {
  visible: boolean;
  loading: boolean;
  title: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
  onClose: VoidFunction;
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  loading,
  title,
  footer,
  children,
  onClose,
}) => {
  const modalRef = React.useRef<HTMLDivElement>(null);

  // close the modal when the escape key is pressed
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose]);

  // close the modal when clicked outside
  useOnClickOutside(modalRef, onClose);

  // do not render anything if the modal is not visible
  if (!visible) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-20 flex items-center justify-center backdrop-blur-lg">
      <div className="absolute inset-0 bg-black/50"></div>
      <div
        ref={modalRef}
        className="z-30 m-10 max-w-[600px] flex-1 overflow-hidden rounded-lg bg-white outline outline-8 outline-white/50"
      >
        <div className="flex items-stretch justify-between border-b border-neutral-200">
          <h2 className="px-5 py-4 text-xl font-medium">{title}</h2>
          <button className="px-5" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto px-5 py-10">
          {children}
          {loading && <Spinner cover />}
        </div>
        <div className="border-t border-neutral-200 px-5 py-4">{footer}</div>
      </div>
    </div>,
    document.body,
  );
};
