//Login.js

import React, {useState} from "react";
import NotificationModal from "../components/Modals/NotificationModal.js";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {
    fetchUserInfo,
    loginUserAsync,
} from "../reducers/users/usersActions.js";
import {loginUser, selectCurrentUser} from "../reducers/users/usersSlice.js";
import Input from "../components/Ui/Input.js";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showLoginForm, setShowLoginForm] = useState(true);

    const [loading, setLoading] = useState(false);
    const [loginError, setLoginError] = useState("");
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const handleLogin = async () => {
        try {
            validateForm();

            setLoading(true);

            // Dispatch the loginUserAsync action
            const response = await dispatch(loginUserAsync({email, password}));

            console.log("Login response:", response);

            // Check if the response contains a token
            const token = localStorage.getItem("token");

            if (token) {
                // If a token is present, set login success and navigate to "/tasks"
                setLoginSuccess(true);
                setShowLoginForm(false);
                toggle(); // Open the modal window
                navigate("/tasks");
            } else {
                // Handle the case when there is no token
                console.error("Token is not present in localStorage.");
                // You may want to show an error message or handle it in some way
            }
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    const validateForm = () => {
        let hasError = false;

        if (!email || !password) {
            setEmailError("Please fill in all the required fields.");
            hasError = true;
        }

        if (!validateEmail(email)) {
            setEmailError("Invalid email format.");
            hasError = true;
        }

        if (hasError) {
            throw new Error("Validation error: Please fill in all required fields.");
        }
    };

    const handleError = (error) => {
        // Customize error messages based on different scenarios
        let errorMessage;
        if (error?.response?.status === 401) {
            errorMessage = "Invalid email or password.";
        } else {
            errorMessage =
                error.message || "An error occurred. Please try again later.";
        }

        setLoginError(errorMessage);
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
        const newPassword = e.target.value;
        setPassword(newPassword);

        // Clear password error when the user enters the password
        if (newPassword.trim()) {
            setPasswordError("");
        }
    };

    const handleCancel = () => {
        // Reset the fields
        setEmail("");
        setPassword("");
        setEmailError("");
        setPasswordError("");

        // Close the login form
        setShowLoginForm(false);
        navigate("/home");
    };

    const handleForgotPassword = () => {
        // Placeholder for forgot password action
        console.log("Forgot Password clicked");
    };

    return (
        <>
            {showLoginForm && (
                <div className="h-screen">
                    <div className="auth-form w-96 mx-auto mt-8">
                        <div className="h-10 bg-green-950 text-yellow-300">
                            <label className="m-2 text-lg">Login-Form</label>
                        </div>
                        <div className="p-8 border border-gray-300 rounded shadow-md">
                            <Input
                                label={"Email:"}
                                type="text"
                                value={email}
                                onChange={handleEmailChange}
                                className="border p-2 rounded"
                                error={emailError}
                            />
                            <Input
                                label={"Password:"}
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                className="border p-2 rounded"
                                error={passwordError}
                            />

                            <div className="flex justify-between">
                                <button
                                    onClick={handleLogin}
                                    className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${loading && "opacity-50 cursor-not-allowed"}`}
                                    disabled={loading}
                                >
                                    {loading ? "Logging In..." : "Login"}
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                            </div>

                            <div className="mt-4 text-center">
                                <a
                                    href="/"
                                    onClick={handleForgotPassword}
                                    className="text-blue-500 hover:underline"
                                >
                                    Forgot Password?
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {loginSuccess && (
                <NotificationModal
                    isOpen={modal}
                    toggle={toggle}
                    handleAction={handleLogin}
                    label="Login"
                    content="Enjoy"
                    buttonText="Ok"
                />
            )}
        </>
    );
};

export default LoginForm;


/*
//Login.js

import React, { useState } from "react";
import NotificationModal from "../components/Modals/NotificationModal.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showLoginForm, setShowLoginForm] = useState(true);

  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignIn = async () => {
    try {
      // Validate form fields
      if (!email || !password) {
        throw new Error("Please fill in all the required fields.");
      }

      // Additional validation logic for email, password if needed
      //if (!validateEmail(email)) {
        throw new Error("Invalid email format.");
      }

      setLoading(true);

      const response = await axios.post(
          "http://localhost:6001/api/auth/login",
          {
            email,
            password,
          },
      );

      if (response?.data) {
        // Example of storing the token in localStorage
        //localStorage.setItem("token", response.data.token);
        console.log("Login success:", response.data.token);
        setLoginSuccess(true);
        setShowLoginForm(false);
        setLoading(false);
        toggle(); // Open the modal
        navigate("/tasks");
      } else {
        console.error("Invalid response:", response);
        throw new Error("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("API error:", error?.response?.data);
      const errorMessage =
          error.message || "An error occurred. Please try again later.";
      setLoginError(errorMessage);
    } finally {
      setLoading(false);
    }
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
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Clear password error when the user enters the password
    if (newPassword.trim()) {
      setPasswordError("");
    }
  };

  const handleCancel = () => {
    // Reset the fields
    setEmail("");
    setPassword("");
    setEmailError("");
    setPasswordError("");

    // Close the login form
    setShowLoginForm(false);
  };

  const handleForgotPassword = () => {
    // Placeholder for forgot password action
    console.log("Forgot Password clicked");
  };

  return (
      <>
        {showLoginForm && (
            <div className="h-screen">
              <div className="auth-form w-96 mx-auto mt-8 ">
                <div className="h-10 bg-green-950 text-yellow-300 ">
                  <label className="m-2 text-lg">Login-Form</label>
                </div>
                <div className=" p-8 border border-gray-300 rounded shadow-md">
                  <div className="flex flex-col mb-4">
                    <label className="mb-2">Email:</label>
                    <input
                        type="text"
                        value={email}
                        onChange={handleEmailChange}
                        className="border p-2 rounded"
                    />
                    {emailError && <div className="text-red-500">{emailError}</div>}
                  </div>

                  <div className="flex flex-col mb-4">
                    <label className="mb-2">Password:</label>
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

                  <div className="flex justify-between">
                    <button
                        onClick={handleSignIn}
                        className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${loading && "opacity-50 cursor-not-allowed"}`}
                        disabled={loading}
                    >
                      {loading ? "Logging In..." : "Login"}
                    </button>
                    <button
                        onClick={handleCancel}
                        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                        disabled={loading}
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="mt-4 text-center">
                    <a
                        href="/"
                        onClick={handleForgotPassword}
                        className="text-blue-500 hover:underline"
                    >
                      Forgot Password?
                    </a>
                  </div>
                </div>
              </div>
            </div>
        )}

        {loginSuccess && (
            <NotificationModal
                isOpen={modal}
                toggle={toggle}
                handleAction={handleSignIn}
                label="Login"
                content="Enjoy"
                buttonText="Ok"
            />
        )}
      </>
  );
};

export default LoginForm;*/
