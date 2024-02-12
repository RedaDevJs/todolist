import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";

const NotificationModal = ({
  isOpen,
  toggle,
  handleAction,
  label,
  buttonText,
  content,
}) => {
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
