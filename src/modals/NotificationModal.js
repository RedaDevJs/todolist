// NotificationModal.js
import React from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap';

const NotificationModal = ({ isOpen, toggle, handleSignIn,forceModal }) => {
    const onClosedHandler = () => {
        if (forceModal) {
            // If modal is forced, navigate to /login when closed
            handleSignIn();
        }
    };
    return (
        <Modal className="notification-div" isOpen={isOpen} toggle={toggle} onClosed={onClosedHandler}>
            <ModalHeader toggle={toggle}>Notification</ModalHeader>
            <ModalBody className="flex flex-col">
                <label className="text-xl font-bold text-black">
                    Félicitation, votre compte est créé.<br /> Veuillez vous connecter!!
                </label>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSignIn}>
                    Sign In
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default NotificationModal;
