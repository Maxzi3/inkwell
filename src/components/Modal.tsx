import { cloneElement, createContext, useContext, useState } from "react";
import type { FC, ReactElement, ReactNode } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import { useOutsideClick } from "../hooks/useOutsideMouseClick";

// Context Types
interface ModalContextType {
  openName: string;
  open: (name: string) => void;
  close: () => void;
  isOpen: boolean;
}

const ModalContext = createContext<ModalContextType | null>(null);

// Main Modal component
interface ModalProps {
  children: ReactNode;
}

const Modal: FC<ModalProps> & {
  Open: FC<OpenProps>;
  Window: FC<WindowProps>;
} = ({ children }) => {
  const [openName, setOpenName] = useState<string>("");
  const close = () => setOpenName("");
  const open = (name: string) => setOpenName(name);
  const isOpen = Boolean(openName);

  return (
    <ModalContext.Provider value={{ openName, close, open, isOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

// Open Button Component
interface OpenProps {
  children: ReactElement<{ onClick?: () => void }>;
  opens: string;
  beforeOpen?: () => void;
}

const Open: FC<OpenProps> = ({ children, opens, beforeOpen }) => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("Modal.Open must be used inside Modal");
  const { open } = context;

  return cloneElement(children, {
    onClick: () => {
      beforeOpen?.(); // Call beforeOpen if provided
      open(opens);
    },
  });
};

// Window Component
interface WindowProps {
  children: ReactElement<{ onCloseModal?: () => void }>;
  name: string;
}

const Window: FC<WindowProps> = ({ children, name }: WindowProps) => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("Modal.Window must be used inside Modal");
  const { openName, close } = context;

  const modalRef = useOutsideClick<HTMLDivElement>(close);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[1000] flex items-center justify-center">
      <div
        ref={modalRef}
        className="relative text-text-primary bg-primary rounded-xl shadow-xl w-[90%] sm:w-full max-w-lg px-4 py-6 sm:p-8 animate-fadeIn mx-4"
        tabIndex={-1}
      >
        <button
          onClick={close}
          className="absolute top-4 right-4 text-gray-500 hover:bg-gray-100 p-2 rounded"
        >
          <HiXMark className="w-6 h-6" />
        </button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body
  );
};

// Attach subcomponents
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
