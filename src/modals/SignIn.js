import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const SignInModal = ({ modal, toggle }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');

    useEffect(() => {
        // Reset state variables when modal prop changes
        if (modal) {
            setEmail('');
            setPassword('');
            setEmailError('');
        }
    }, [modal]);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSignIn = () => {
        // Validate email
        if (!validateEmail(email)) {
            setEmailError('Enter a valid email address.');
            return;
        }

        // Your existing sign-in logic here...
        console.log('Signing in:', email, password);

        // Close the modal after sign-in
        toggle();
    };

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);

        // Clear email error when the user corrects the email
        if (validateEmail(newEmail)) {
            setEmailError('');
        }
    };

    return (
        <>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Sign In</ModalHeader>
                <ModalBody className="flex flex-col">
                    <label>Email:</label>
                    <input type="text" value={email} onChange={handleEmailChange} />
                    {emailError && <div className="text-red-500">{emailError}</div>}

                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSignIn}>
                        Sign In
                    </Button>
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default SignInModal;
