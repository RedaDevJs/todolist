// ... (imports and other code)

import React, {useEffect, useState} from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

const SignUpModal = ({ modal, toggle }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);

    const [validationErrors, setValidationErrors] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: '',
    });

    useEffect(() => {
        // Reset state variables when modal prop changes
        if (modal) {
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setAcceptTerms(false);
            setValidationErrors({
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
                acceptTerms: '',
            });
        }
    }, [modal]);

    const handleSignUp = () => {
        // Reset validation errors
        setValidationErrors({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            acceptTerms: '',
        });

        let hasErrors = false;

        // Validate username
        if (!username.trim()) {
            setValidationErrors((prevErrors) => ({ ...prevErrors, username: 'Username is required.' }));
            hasErrors = true;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim() || !emailRegex.test(email)) {
            setValidationErrors((prevErrors) => ({ ...prevErrors, email: 'Enter a valid email address.' }));
            hasErrors = true;
        }

        // Validate password
        if (!password.trim()) {
            setValidationErrors((prevErrors) => ({ ...prevErrors, password: 'Password is required.' }));
            hasErrors = true;
        }

        // Validate confirmPassword
        if (!confirmPassword.trim()) {
            setValidationErrors((prevErrors) => ({
                ...prevErrors,
                confirmPassword: 'Confirm Password is required.',
            }));
            hasErrors = true;
        }

        // Validate password match
        if (password !== confirmPassword) {
            setValidationErrors((prevErrors) => ({
                ...prevErrors,
                password: 'Passwords do not match.',
                confirmPassword: 'Passwords do not match.',
            }));
            hasErrors = true;
        }

        // Validate acceptTerms
        if (!acceptTerms) {
            setValidationErrors((prevErrors) => ({ ...prevErrors, acceptTerms: 'Please accept the terms.' }));
            hasErrors = true;
        }

        // If there are validation errors, return without signing up
        if (hasErrors) {
            return;
        }

        // Perform sign-up logic
        console.log('Signing up:', username, email, password);

        // Close the modal after sign-up
        toggle();

        // Reset the state variables
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setAcceptTerms(false);
    };

    return (
        <>
            <Modal isOpen={modal} toggle={toggle} className="max-w-24">
                <ModalHeader toggle={toggle}>Sign Up</ModalHeader>
                <ModalBody >
                    <div className="grid grid-cols-2 bg-white p-3">
                        <div className="flex flex-col font-semibold">
                            <label className="mb-3 " htmlFor="username">Username</label>
                            <label className="mb-3" htmlFor="email">Email</label>
                            <label className="mb-3" htmlFor="password">Password</label>
                            <label className="mb-3" htmlFor="confirmPassword">Confirm Password</label>
                        </div>
                        <div className="flex flex-col text-left">
                            <div className="mb-3">
                                <span>: </span>
                                <input
                                    className="border-1 border-black"
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                {validationErrors.username && (
                                    <div className="text-red-500">{validationErrors.username}</div>
                                )}
                            </div>
                            <div className="mb-3">
                                <span>: </span>
                                <input
                                    className="border-1 border-black"
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {validationErrors.email && (
                                    <div className="text-red-500">{validationErrors.email}</div>
                                )}
                            </div>
                            <div className="mb-3">
                                <span>: </span>
                                <input
                                    className="border-1 border-black"
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {validationErrors.password && (
                                    <div className="text-red-500">{validationErrors.password}</div>
                                )}
                            </div>
                            <div className="mb-3">
                                <span>: </span>
                                <input
                                    className="border-1 border-black"
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                {validationErrors.confirmPassword && (
                                    <div className="text-red-500">{validationErrors.confirmPassword}</div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="p-3">
                        <input
                            type="checkbox"
                            id="acceptTerms"
                            checked={acceptTerms}
                            onChange={() => setAcceptTerms(!acceptTerms)}
                        />
                        <label htmlFor="acceptTerms" className="ml-2">
                            I have read and agree to the terms of use.
                        </label>
                        {validationErrors.acceptTerms && (
                            <div className="text-red-500">{validationErrors.acceptTerms}</div>
                        )}
                    </div>
                </ModalBody>

                <ModalFooter>
                    <Button color="primary" onClick={handleSignUp}>
                        Sign Up
                    </Button>
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default SignUpModal;
