"use client";

import { createContext, type ReactNode, useContext, useRef, useState } from "react";
import { ConfirmationModal } from "./confirmation-modal";

type ShowConfirmationArgs = {
  title: string;
  body: string | ReactNode;
  description: string;
  validateText: string;
  cancelText: string;
  isDestructive?: boolean;
};

type ConfimationModalContextType = {
  showConfirmation: (args: ShowConfirmationArgs) => Promise<boolean>;
};

const ConfirmationModalContext = createContext<ConfimationModalContextType | undefined>(undefined);

export function ConfirmationModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ShowConfirmationArgs>();

  const resolver = useRef<((v: boolean) => void) | null>(null);

  const handleShow = (args: ShowConfirmationArgs): Promise<boolean> => {
    setIsOpen(true);
    setContent(args);
    return new Promise((resolve) => {
      resolver.current = resolve;
    });
  };

  const handleConfirm = () => {
    resolver.current?.(true);
    setIsOpen(false);
  };

  const handleCancel = () => {
    resolver.current?.(false);
    setIsOpen(false);
  };

  const value: ConfimationModalContextType = {
    showConfirmation: handleShow,
  };

  return (
    <ConfirmationModalContext.Provider value={value}>
      {children}
      {content && (
        <ConfirmationModal
          isOpen={isOpen}
          title={content.title}
          body={content.body}
          description={content.description}
          validateText={content.validateText}
          cancelText={content.cancelText}
          isDestructive={content.isDestructive}
          onValidate={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </ConfirmationModalContext.Provider>
  );
}

export function useConfirmationModal() {
  const context = useContext(ConfirmationModalContext);
  if (!context) {
    throw new Error("useConfirmationModal must be used within a ConfirmationModalProvider");
  }
  return context;
}
