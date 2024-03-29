import React, { useState } from "react";
import { HttpService } from "../utils/http.js";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showLoginForm, setShowLoginForm] = useState(true);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignIn = () => {
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

    // Your existing sign-in logic here...
    console.log("Signing in:", email, password);
    const service = new HttpService();
    service
      .post("auth", { email, password })
      .then((result) => {
        console.log("result");
        //redirect to other page
      })
      .catch((error) => {
        // service notification
      });
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
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Login
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>

              <div className="mt-4 text-center">
                <a
                  href="#"
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
    </>
  );
};

export default LoginForm;
