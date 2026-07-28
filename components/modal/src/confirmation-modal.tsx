import { Button } from "@lro-ui/button";
import { createCallable } from "react-call";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalTitle } from "./modal";

interface Props {
  message: string;
}
type Response = boolean;

export const ConfirmationModal = createCallable<Props, Response>(({ call, message }) => (
  <Modal
    open
    onOpenChange={(isOpen) => {
      if (!isOpen) {
        call.end(false);
      }
    }}
  >
    <ModalContent className="max-w-2xl" disableCloseButton disableCloseOnOutsideClick>
      <ModalHeader>
        <ModalTitle>Confirmation</ModalTitle>
      </ModalHeader>
      <ModalBody>{message}</ModalBody>
      <ModalFooter>
        <Button variant="text" onClick={() => call.end(false)}>
          Cancel
        </Button>
        <Button onClick={() => call.end(true)}>Confirm</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
));
ConfirmationModal.displayName = "ConfirmationModal";
