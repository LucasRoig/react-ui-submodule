"use client";
import { Button } from "@lro-ui/button";
import * as Modal from "@lro-ui/modal";
import { VisuallyHidden } from "@lro-ui/visually-hidden";
import type { ReactNode } from "react";

export type ConfirmationModalProps = {
  title: string;
  body: string | ReactNode;
  description: string;
  validateText: string;
  cancelText: string;
  onValidate: () => void;
  onCancel: () => void;
  isOpen: boolean;
  isDestructive?: boolean;
};

export function ConfirmationModal(props: ConfirmationModalProps) {
  return (
    <Modal.Modal
      open={props.isOpen}
      onOpenChange={(isOpen) => {
        if (isOpen === false) {
          // User closed the modal with outside click, escape key, cross button, etc.
          props.onCancel();
        }
      }}
    >
      <Modal.ModalContent className="max-w-2xl">
        <Modal.ModalHeader>
          <Modal.ModalTitle>{props.title}</Modal.ModalTitle>
          <VisuallyHidden asChild>
            <Modal.ModalDescription>{props.description}</Modal.ModalDescription>
          </VisuallyHidden>
        </Modal.ModalHeader>
        <Modal.ModalBody>{props.body}</Modal.ModalBody>
        <Modal.ModalFooter>
          <Button variant="text" onClick={props.onCancel}>
            {props.cancelText}
          </Button>
          <Button variant={props.isDestructive ? "destructive" : "primary"} onClick={props.onValidate}>
            {props.validateText}
          </Button>
        </Modal.ModalFooter>
      </Modal.ModalContent>
    </Modal.Modal>
  );
}
