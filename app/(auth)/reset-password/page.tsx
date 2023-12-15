"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function ResetPassword() {
  const [formData, setFormData] = useState({
    email: "",
    code: "",
    newPassword: "",
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const requestResetPassword = async () => {
    try {
      const response = await fetch("https://api.shield-dev51.quest/auth/forgot_password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || "Network response was not ok");
      }

      // Update state to indicate that the request has been sent
      setRequestSent(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const resetPassword = async () => {
    try {
      const urlEncodedData = new URLSearchParams();
      urlEncodedData.append("code", formData.code);
      urlEncodedData.append("new_password", formData.newPassword);

      const response = await fetch("https://api.shield-dev51.quest/auth/reset_password", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: urlEncodedData.toString(),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || "Network response was not ok");
      }

      const data = await response.json();
      console.log(data);  // Handle response

      // Show success message and redirect after a delay
      setShowSuccessMessage(true);
      setTimeout(() => {
        window.location.href = "/signin";
      }, 1000);
    } catch (error) {
      setError(error.message);
    }
  };

  // Define metadata directly in the component
  const metadata = {
    title: "Reset Password - Open PRO",
    description: "Page description",
  };

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1 mb-4">
              {requestSent ? "Reset Code Sent" : "Forgot your password?"}
            </h1>
            <p className="text-xl text-gray-400">
              {requestSent
                ? "Check your email for instructions on how to reset your password."
                : "We'll email you instructions on how to reset it."}
            </p>
          </div>

          <div className="max-w-sm mx-auto">
            {error && (
              <div className="text-red-500 text-center mb-4">
                {error}
              </div>
            )}
            {showSuccessMessage && (
              <div className="text-green-500 text-center mb-4">
                Password has been reset successfully!.
              </div>
            )}
            <form>
              {!requestSent && (
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-300 text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="form-input w-full text-gray-300"
                      placeholder="you@yourcompany.com"
                      required
                      onChange={handleChange}
                      value={formData.email}
                    />
                  </div>
                </div>
              )}
              {requestSent && (
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-300 text-sm font-medium mb-1"
                      htmlFor="code"
                    >
                      Verification Code
                    </label>
                    <input
                      id="code"
                      type="text"
                      className="form-input w-full text-gray-300"
                      placeholder="Enter the verification code"
                      required
                      onChange={handleChange}
                      value={formData.code}
                    />
                  </div>
                </div>
              )}
              {requestSent && (
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-300 text-sm font-medium mb-1"
                      htmlFor="newPassword"
                    >
                      New Password
                    </label>
                    <input
                      id="newPassword"
                      type="password"
                      className="form-input w-full text-gray-300"
                      placeholder="Password (at least 10 characters)"
                      required
                      onChange={handleChange}
                      value={formData.newPassword}
                    />
                  </div>
                </div>
              )}
              <div className="flex flex-wrap -mx-3 mt-6">
                <button
                  type="button"
                  className="btn text-white bg-purple-600 hover:bg-purple-700 w-full"
                  onClick={requestSent ? resetPassword : requestResetPassword}
                >
                  {requestSent ? "Reset Password" : "Request Reset Code"}
                </button>
              </div>
            </form>
            <div className="text-gray-400 text-center mt-6">
              <Link
                href="/signin"
                className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
