import React, { useState} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import NotificationModal from "../components/modals/NotificationModal.js";

const RegistrationForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [showRegistrationForm, setShowRegistrationForm] = useState(true);
    const [loading, setLoading] = useState(false);
    const [registrationError, setRegistrationError] = useState('');
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [modal, setModal] = useState(false);
    const [forceModal, setForceModal] = useState(true); // Added state to force the modal

    const toggle = () => setModal(!modal);

    const handleRegister = async () => {
        // Validate form fields
        if (!username || !email || !password || !confirmPassword || !acceptTerms) {
            setRegistrationError('Please fill in all the required fields.');
            return;
        }

        // Additional validation logic for email, password, confirmPassword if needed
        if (!validateEmail(email)) {
            setEmailError('Invalid email format.');
            return;
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match.');
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post('http://localhost:6001/api/users/register', {
                username,
                email,
                password,
            });

            if (response?.data) {
                console.log('Registration success:', response.data);
                setRegistrationSuccess(true);
                toggle(); // Open the modal
                // Additional actions or state updates on success
            } else {
                console.error('Invalid response:', response);
                setRegistrationError('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('API error:', error?.response?.data);
            setRegistrationError('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        if (validateEmail(newEmail)) {
            setEmailError('');
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleAcceptTermsChange = () => {
        setAcceptTerms(!acceptTerms);
        setRegistrationError('');
    };

    const handleCancel = () => {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setEmailError('');
        setPasswordError('');
        setConfirmPasswordError('');
        setAcceptTerms(false);

        setShowRegistrationForm(false);
    };

    const navigate = useNavigate();

    const handleSignIn = () => {
        // Handle the logic for signing in
        setForceModal(false); // Disable forcing the modal
        navigate('/login');
    };
    const handleModalClosed = (reason) => {
        if (reason === 'backdrop' || reason === 'escape') {
            // The modal was closed by clicking outside or pressing escape
            navigate('/login');
        }
    };
    return (
        <>
            {showRegistrationForm && (
                <div className="h-screen">
                    <div className="auth-form w-96 mx-auto mt-8 ">
                        <div className="h-10 bg-green-950 text-yellow-300 ">
                            <label className="m-2 text-lg">Registration Form</label>
                        </div>
                        <div className=" p-8 border border-gray-300 rounded shadow-md">
                            <div className="flex flex-col mb-4">
                                <label className="mb-2" htmlFor="username">
                                    Username:
                                </label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={handleUsernameChange}
                                    className="border p-2 rounded"
                                />
                            </div>

                            <div className="flex flex-col mb-4">
                                <label className="mb-2" htmlFor="email">
                                    Email:
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    className="border p-2 rounded"
                                />
                                {emailError && <div className="text-red-500">{emailError}</div>}
                            </div>

                            <div className="flex flex-col mb-4">
                                <label className="mb-2" htmlFor="password">
                                    Password:
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    className="border p-2 rounded"
                                />
                                {passwordError && (
                                    <div className="text-red-500">{passwordError}</div>
                                )}
                            </div>

                            <div className="flex flex-col mb-4">
                                <label className="mb-2" htmlFor="confirmPassword">
                                    Confirm Password:
                                </label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    className="border p-2 rounded"
                                />
                                {confirmPasswordError && (
                                    <div className="text-red-500">{confirmPasswordError}</div>
                                )}
                            </div>

                            <div className="flex items-center mb-4">
                                <input
                                    type="checkbox"
                                    checked={acceptTerms}
                                    onChange={handleAcceptTermsChange}
                                />
                                <label className="ml-2">
                                    I have read and agree to the terms of use.
                                </label>
                            </div>

                            <div className="flex justify-between">
                                <button
                                    onClick={handleRegister}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    disabled={loading}
                                >
                                    {loading ? 'Registering...' : 'Register'}
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                            </div>
                            {registrationError && (
                                <div className="text-red-500 mt-4">{registrationError}</div>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {registrationSuccess && (
                <NotificationModal
                    isOpen={modal}
                    toggle={toggle}
                    handleSignIn={handleSignIn}
                    onClosed={handleModalClosed}
                    forceModal={forceModal}
                />
            )}
        </>
    );
};

export default RegistrationForm;

/*import React, { useState} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import NotificationModal from "../modals/NotificationModal.js";


const RegistrationForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [showRegistrationForm, setShowRegistrationForm] = useState(true);
    const [loading, setLoading] = useState(false);
    const [registrationError, setRegistrationError] = useState('');
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:6001/api/users/register', {
                username,
                email,
                password,
            });

            if (response?.data) {
                console.log('Registration success:', response.data);
                setRegistrationSuccess(true);
                toggle(); // Open the modal
                // Additional actions or state updates on success
            } else {
                console.error('Invalid response:', response);
                setRegistrationError('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('API error:', error?.response?.data);
            setRegistrationError('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        if (validateEmail(newEmail)) {
            setEmailError('');
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        console.log('Password confirmé:');
    };

    const handleAcceptTermsChange = () => {
        setAcceptTerms(!acceptTerms);
        setRegistrationError('');
    };

    const handleCancel = () => {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setEmailError('');
        setPasswordError('');
        setConfirmPasswordError('');
        setAcceptTerms(false);

        setShowRegistrationForm(false);
    };

    const navigate = useNavigate();

    const handleSignIn = () => {
        // Handle the logic for signing in
        navigate('/login');
    };
    return (
        <>
            {showRegistrationForm && (
                <div className="h-screen">
                    <div className="auth-form w-96 mx-auto mt-8 ">
                        <div className="h-10 bg-green-950 text-yellow-300 ">
                            <label className="m-2 text-lg">Registration Form</label>
                        </div>
                        <div className=" p-8 border border-gray-300 rounded shadow-md">
                            <div className="flex flex-col mb-4">
                                <label className="mb-2" htmlFor="username">
                                    Username:
                                </label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={handleUsernameChange}
                                    className="border p-2 rounded"
                                />
                            </div>

                            <div className="flex flex-col mb-4">
                                <label className="mb-2" htmlFor="email">
                                    Email:
                                </label>
                                <input
                                    type="text"
                                    value={email}
                                    onChange={handleEmailChange}
                                    className="border p-2 rounded"
                                />
                                {emailError && <div className="text-red-500">{emailError}</div>}
                            </div>

                            <div className="flex flex-col mb-4">
                                <label className="mb-2" htmlFor="password">
                                    Password:
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    className="border p-2 rounded"
                                />
                                {passwordError && (
                                    <div className="text-red-500">{passwordError}</div>
                                )}
                            </div>

                            <div className="flex flex-col mb-4">
                                <label className="mb-2" htmlFor="confirmPassword">
                                    Confirm Password:
                                </label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    className="border p-2 rounded"
                                />
                                {confirmPasswordError && (
                                    <div className="text-red-500">{confirmPasswordError}</div>
                                )}
                            </div>

                            <div className="flex items-center mb-4">
                                <input
                                    type="checkbox"
                                    checked={acceptTerms}
                                    onChange={handleAcceptTermsChange}
                                />
                                <label className="ml-2">
                                    I have read and agree to the terms of use.
                                </label>
                            </div>

                            <div className="flex justify-between">
                                <button
                                    onClick={handleRegister}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    disabled={loading}
                                >
                                    {loading ? 'Registering...' : 'Register'}
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                            </div>
                            {registrationError && (
                                <div className="text-red-500 mt-4">{registrationError}</div>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {registrationSuccess && (
                <NotificationModal
                    isOpen={modal}
                    toggle={toggle}
                    handleSignIn={handleSignIn}
                />
            )}
        </>
    );
};

export default RegistrationForm;*/
