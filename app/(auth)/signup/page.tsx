"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";

function isEmailValid(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
}

function getErrors(formData) {
  return {
    short_username: formData.username.length < 4,
    short_password: formData.password.length < 8,
    invalid_email: !isEmailValid(formData.email),
  };
}

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    short_username: false,
    short_password: false,
    invalid_email: false,
  });
  const [isFailedOnFirstSubmit, setIsFailedOnFirstSubmit] = useState(false);
  const isEmptyForm = Object.values(formData).some((field) => field === "");

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    if (isFailedOnFirstSubmit) {
      setErrors((prevState) => ({
        ...prevState,
        ...getErrors(formData),
      }));
    }
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = getErrors(formData);
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);
    if (hasErrors) {
      setIsFailedOnFirstSubmit(true);
      return;
    }

    try {
      let response = await fetch(
        "https://api.shield-dev51.quest/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const urlEncodedData = new URLSearchParams();
      urlEncodedData.append("grant_type", "password");
      urlEncodedData.append("username", formData.username);
      urlEncodedData.append("password", formData.password);

      response = await fetch("https://api.shield-dev51.quest/auth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: urlEncodedData,
      });

      if (!response.ok) {
        throw new Error("Token request failed");
      }

      const data = await response.json();
      localStorage.setItem("accessToken", data.access_token);

      setShowSuccessMessage(true);
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    } catch (error) {
      toast.error("Something went wrong on registration", {
        position: "bottom-right",
        theme: "dark",
      });
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1">Create account</h1>
          </div>

          <div className="max-w-sm mx-auto">
            {showSuccessMessage && (
              <div className="text-green-500 text-center mb-4">
                Account created successfully! Redirecting to dashboard...
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-300 text-sm font-medium mb-1"
                    htmlFor="username"
                  >
                    Username <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="username"
                    type="text"
                    className="form-input w-full text-gray-300"
                    placeholder="Username"
                    required
                    onChange={handleChange}
                    value={formData.username}
                  />
                  {errors.short_username && (
                    <div className="text-red-500 text-center">
                      Username must be at leat 4 characters
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-300 text-sm font-medium mb-1"
                    htmlFor="email"
                  >
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="email"
                    type="text"
                    className="form-input w-full text-gray-300"
                    placeholder="you@example.com"
                    required
                    onChange={handleChange}
                    value={formData.email}
                  />
                  {errors.invalid_email && (
                    <div className="text-red-500 text-center">
                      Email is invalid
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-300 text-sm font-medium mb-1"
                    htmlFor="password"
                  >
                    Password <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="form-input w-full text-gray-300"
                    placeholder="Password (at least 8 characters)"
                    required
                    onChange={handleChange}
                    value={formData.password}
                  />
                  {errors.short_password && (
                    <div className="text-red-500 text-center">
                      Password must be at leat 8 characters
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button
                    className="btn text-white bg-purple-600 hover:bg-purple-700 disabled:bg-gray-500 w-full"
                    type="submit"
                    disabled={
                      isEmptyForm ||
                      (isFailedOnFirstSubmit &&
                        Object.values(errors).some((error) => error))
                    }
                  >
                    Sign up
                  </button>
                </div>
              </div>
            </form>
            <div className="text-gray-400 text-center mt-6">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}
