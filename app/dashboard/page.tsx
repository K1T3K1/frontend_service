"use client";

import React, { useState } from "react";
import ApexCandlestickChart from "@/components/ApexCandlestickChart";
import { useRequireAuth } from "@/utils/useRequireAuth";

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  useRequireAuth();
  const [formData, setFormData] = useState({
    id: 0,
    amount: "",
    price_per_unit: "",
    transaction_date: "",
    transaction_type: "",
    company_id: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Retrieve the access token from local storage
      const accessToken = localStorage.getItem("accessToken");

      // Check if the access token is available
      if (!accessToken) {
        throw new Error("Access token is not available");
      }

      const response = await fetch(
        "https://api.shield-dev51.quest/user/transaction",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // Include the authorization header
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Handle success - update UI or show a message
    } catch (error) {
      // Handle errors here
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <>
      <ApexCandlestickChart />
      <div className="card bg-white shadow-lg rounded border border-gray-200 p-6 mt-6 w-full">
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="flex flex-wrap text-gray-700">
            <div className="w-full px-3 mb-6">
              <label className="block  text-sm font-bold mb-2">Kwota</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="input w-full "
                placeholder="Kwota"
              />
            </div>
            <div className="w-full px-3 mb-6">
              <label className="block text-sm font-bold mb-2">
                Cena za jednostkę
              </label>
              <input
                type="number"
                name="price_per_unit"
                value={formData.price_per_unit}
                onChange={handleChange}
                className="input w-full "
                placeholder="Cena za jednostkę"
              />
            </div>
            <div className="w-full px-3 mb-6">
              <label className="block text-sm font-bold mb-2">
                Data transakcji
              </label>
              <input
                type="date"
                name="transaction_date"
                value={formData.transaction_date}
                onChange={handleChange}
                className="input w-full "
                placeholder="YYYY-MM-DD"
              />
            </div>
            <div className="w-full px-3 mb-6">
              <label className="block text-sm font-bold mb-2">
                Typ transakcji
              </label>
              <select
                name="transaction_type"
                value={formData.transaction_type}
                onChange={handleChange}
                className="block w-full border border-black-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="buy">Kupno</option>
                <option value="" disabled selected hidden>
                  Wybierz typ
                </option>
                <option value="sell">Sprzedaż</option>
              </select>
            </div>
            <div className="w-full px-3 mb-6">
              <label className="block text-sm font-bold mb-2">ID firmy</label>
              <input
                type="number"
                name="company_id"
                value={formData.company_id}
                onChange={handleChange}
                className="input w-full "
                placeholder="ID firmy"
              />
            </div>
          </div>
          <div className="w-full px-3 mt-6">
            <button
              type="submit"
              className="btn text-white bg-purple-600 hover:bg-purple-700 w-full"
            >
              Zatwierdź
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Dashboard;
