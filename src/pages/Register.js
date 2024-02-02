import React, { useState } from "react";

const RegistrationForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [showRegistrationForm, setShowRegistrationForm] = useState(true);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleRegister = () => {
        // Validate email
        if (!email.trim() || !validateEmail(email)) {
            setEmailError("Enter a valid email address.");
            return;
        } else {
            setEmailError("");
        }

        // Validate password
        if (!password.trim()) {
            setPasswordError("Password is required.");
            return;
        } else {
            setPasswordError("");
        }

        // Validate confirmPassword
        if (!confirmPassword.trim()) {
            setConfirmPasswordError("Confirm Password is required.");
            return;
        } else {
            setConfirmPasswordError("");
        }

        // Validate password match
        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match.");
            setConfirmPasswordError("Passwords do not match.");
            return;
        } else {
            setPasswordError("");
            setConfirmPasswordError("");
        }

        // Validate acceptance of terms
        if (!acceptTerms) {
            alert("Please accept the terms of use.");
            return;
        }

        // Your existing registration logic here...
        console.log("Registering:", username, email, password);

        // Close the registration form
        setShowRegistrationForm(false);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);

        // Clear email error when the user corrects the email
        if (validateEmail(newEmail)) {
            setEmailError("");
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
    };

    const handleCancel = () => {
        // Reset the fields
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setEmailError("");
        setPasswordError("");
        setConfirmPasswordError("");
        setAcceptTerms(false);

        // Close the registration form
        setShowRegistrationForm(false);
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
                                {passwordError && <div className="text-red-500">{passwordError}</div>}
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
                                >
                                    Register
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default RegistrationForm;
