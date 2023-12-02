"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Function to update state on input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

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

      // Prepare data for token request
      const urlEncodedData = new URLSearchParams();
      urlEncodedData.append("grant_type", "password");
      urlEncodedData.append("username", formData.username);
      urlEncodedData.append("password", formData.password);

      // Send token request
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

      // Redirect to dashboard
      window.location.href = "/dashboard";

      // Process the response (e.g., extract JSON, handle success scenario)
    } catch (error) {
      // Handle any errors here
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1">Create account</h1>
          </div>

          {/* Form */}
          <div className="max-w-sm mx-auto">
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
                    type="email"
                    className="form-input w-full text-gray-300"
                    placeholder="you@example.com"
                    required
                    onChange={handleChange}
                    value={formData.email}
                  />
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
                    placeholder="Password (at least 10 characters)"
                    required
                    onChange={handleChange}
                    value={formData.password}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button
                    className="btn text-white bg-purple-600 hover:bg-purple-700 w-full"
                    type="submit"
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
    </section>
  );
}
