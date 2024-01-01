"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function SignIn() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const urlEncodedData = new URLSearchParams();
    urlEncodedData.append("grant_type", "password");
    urlEncodedData.append("username", formData.username);
    urlEncodedData.append("password", formData.password);

    try {
      const response = await fetch(
        "https://api.shield-dev51.quest/auth/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: urlEncodedData,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      // Store the token in localStorage
      localStorage.setItem("accessToken", data.access_token);

      setShowSuccessMessage(true);
      // Redirect to dashboard
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      // Optionally update the state to show an error message to the user
    }
  };

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1">Welcome back.</h1>
          </div>

          {/* Form */}
          <div className="max-w-sm mx-auto">
            {showSuccessMessage && (
                <div className="text-green-500 text-center mb-4">
                  Logged in successfully! Redirecting to dashboard...
                </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-300 text-sm font-medium mb-1"
                    htmlFor="username"
                  >
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    className="form-input w-full text-gray-300"
                    placeholder="Your username"
                    required
                    onChange={handleChange}
                    value={formData.username}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-300 text-sm font-medium mb-1"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="form-input w-full text-gray-300"
                    placeholder="Password (at least 10 characters)"
                    required
                    onChange={handleChange}
                    value={formData.password}
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mt-6">
                <button
                  type="submit"
                  className="btn-sm text-white bg-purple-600 hover:bg-purple-700 ml-3"
                >
                  Sign in
                </button>
              </div>
            </form>
            <div className="text-gray-400 text-center mt-6">
              No account?{" "}
              <Link
                href="/signup"
                className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out"
              >
                Sign up
              </Link>{" "}
              <br />
              Forgot your password?{" "}
              <Link
                href="/reset-password"
                className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out"
              >
                Reset it!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
