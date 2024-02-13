import React, { useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";

const NotificationModal = ({
  isOpen,
  toggle,
  handleAction,
  label,
  buttonText,
  content,
}) => {
  useEffect(() => {
    // Automatically close the modal after 1000 milliseconds (1 second)
    const timeoutId = setTimeout(() => {
      toggle();
    }, 1000);

    // Clean up the timeout when the component unmounts or when the modal is closed manually
    return () => clearTimeout(timeoutId);
  }, [isOpen, toggle]);

  return (
    <Modal className="notification-div" isOpen toggle={toggle}>
      <ModalHeader toggle={toggle}>{label}</ModalHeader>
      <ModalBody className="flex flex-col">
        <label className="text-xl font-bold text-black">{content}</label>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleAction}>
          {buttonText}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default NotificationModal;
