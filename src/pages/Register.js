import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserAsync } from "../reducers/users/usersActions.js";
import NotificationModal from "../components/Modals/NotificationModal.js";
import { useNavigate } from "react-router-dom";
import { Container } from "reactstrap";

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [isBlocked, setIsBlocked] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(true);
  const [loading, setLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const navigate = useNavigate();
  const [registrationError, setRegistrationError] = useState("");
  const toggleModal = () => setModal(!modal);
  const handleRegister = async () => {
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setRegistrationError("");

    // Validate form fields
    if (!username || !email || !password || !confirmPassword || !acceptTerms) {
      setRegistrationError("Please fill in all the required fields.");
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      return;
    }
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const role = "user";
      // Dispatch the addUserAsync action with the user data
      await dispatch(
        addUserAsync({ username, email, password, role, isBlocked }),
      );
      // Handle registration success
      setRegistrationSuccess(true);
      toggleModal();
    } catch (error) {
      // Handle registration error
      console.error("API error:", error?.response?.data);
      if (error?.response?.data?.message === "Email already exists") {
        // Handle specific error case
      } else {
        setRegistrationError("An error occurred. Please try again later.");
      }
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

    if (!validateEmail(newEmail)) {
      // L'email n'est pas au bon format, afficher une erreur
      setEmailError("Invalid email format.");
    } else {
      // L'email est valide, effacer l'erreur
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setConfirmPasswordError(""); // Reset password confirmation error message
  };

  const handleConfirmPasswordChange = (e) => {
    const newPassword = e.target.value;
    setConfirmPassword(newPassword);
    if (password && newPassword !== password) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleAcceptTermsChange = () => {
    setAcceptTerms(!acceptTerms);
    setRegistrationError("");
  };

  const handleCancel = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setAcceptTerms(false);

    setShowRegistrationForm(false);
  };

  const handleSignIn = () => {
    setModal(false);
    navigate("/login");
  };

  return (
    <>
      <Container>
        {showRegistrationForm && (
          <div className="h-screen m-10">
            <div className="auth-form w-96 mx-auto mt-8">
              <div className="h-10 bg-green-950 text-yellow-300">
                <label className="m-2 text-lg">Registration Form</label>
              </div>
              <div className=" p-8 border border-gray-300 rounded shadow-md">
                <div className="flex flex-col mb-4">
                  <label className="mb-2" htmlFor="username">
                    Username:
                  </label>
                  <input
                    type="text"
                    id="username"
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
                  {emailError && (
                    <div className="text-red-500">{emailError}</div>
                  )}
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
                    {loading ? "Registering..." : "Register"}
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
        {registrationError && (
          <div className="text-red-500 mt-4">{registrationError}</div>
        )}
        :
        {registrationSuccess && (
          <NotificationModal
            isOpen={modal}
            toggle={toggleModal}
            handleAction={handleSignIn}
            label="Registration"
            content="You are successfully registered."
            buttonText="Login"
          />
        )}
      </Container>
    </>
  );
};

export default RegistrationForm;
/*
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NotificationModal from "../components/Modals/NotificationModal.js";
import { useDispatch, useSelector } from "react-redux";

const dispatch = useDispatch();
const users = useSelector((state) => state.users);

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(true);
  const [loading, setLoading] = useState(false);
  const [registrationError, setRegistrationError] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [modal, setModal] = useState(false);
  const [forceModal, setForceModal] = useState(true); // Added state to force the modal

  const toggle = () => setModal(!modal);

  const handleRegister = async () => {
    // Validate form fields
    if (!username || !email || !password || !confirmPassword || !acceptTerms) {
      setRegistrationError("Please fill in all the required fields.");
      return;
    }

    // Additional validation logic for email, password, confirmPassword if needed
    if (!validateEmail(email)) {
      setEmailError("Invalid email format.");
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:6001/api/users/register",
        {
          username,
          email,
          password,
          role,
        },
      );

      if (response?.data) {
        console.log("Registration success:", response.data);
        setRegistrationSuccess(true);
        toggle(); // Open the modal
        // Additional actions or state updates on success
      } else {
        console.error("Invalid response:", response);
        setRegistrationError("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("API error:", error?.response?.data);
      setRegistrationError("An error occurred. Please try again later.");
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
    setRegistrationError("");
  };

  const handleCancel = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setAcceptTerms(false);

    setShowRegistrationForm(false);
  };

  const navigate = useNavigate();

  const handleSignIn = () => {
    // Handle the logic for signing in
    setForceModal(false); // Disable forcing the modal
    navigate("/login");
  };
  const handleModalClosed = (reason) => {
    if (reason === "backdrop" || reason === "escape") {
      // The modal was closed by clicking outside or pressing escape
      navigate("/login");
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
                  {loading ? "Registering..." : "Register"}
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
          handleAction={handleSignIn}
          label="Registration"
          content="you are successfully registred"
          buttonText="Login"
        />
      )}
    </>
  );
};

export default RegistrationForm;
*/


/*import React, { useState} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import NotificationModal from "../Modals/NotificationModal.js";


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
