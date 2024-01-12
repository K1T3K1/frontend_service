import React, { useState } from "react";

const TransactionForm = (props) => {
  const [formData, setFormData] = useState({
    id: 0,
    amount: "",
    price_per_unit: "",
    transaction_date: "",
    transaction_type: "",
    company_id: "",
    ...props?.initialState,
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (props?.handleSubmit) {
      props?.handleSubmit(formData);
      return;
    }

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

      setSuccessMessage("Transaction added successfully!");
      // Redirect to /transactions/list after 1 second
      setTimeout(() => {
        window.location.href = "/transactions/list";
      }, 1000);
    } catch (error) {
      // Handle errors here
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div className="card bg-auto shadow-lg p-6 mt-20 w-full">
      <form onSubmit={handleSubmit} className="mt-6">
        <div className="flex flex-wrap text-gray-500">
          <div className="w-full px-3 mb-6">
            <label className="block text-sm font-bold mb-2">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="input w-full"
              placeholder="Amount"
            />
          </div>
          <div className="w-full px-3 mb-6">
            <label className="block text-sm font-bold mb-2">
              Price per unit
            </label>
            <input
              type="number"
              name="price_per_unit"
              value={formData.price_per_unit}
              onChange={handleChange}
              className="input w-full"
              placeholder="Price per unit"
            />
          </div>
          <div className="w-full px-3 mb-6">
            <label className="block text-sm font-bold mb-2">
              Transaction date
            </label>
            <input
              type="date"
              name="transaction_date"
              value={formData.transaction_date}
              onChange={handleChange}
              className="input w-full"
              placeholder="YYYY-MM-DD"
            />
          </div>
          <div className="w-full px-3 mb-6">
            <label className="block text-sm font-bold mb-2">
              Transaction type
            </label>
            <select
              name="transaction_type"
              value={formData.transaction_type}
              onChange={handleChange}
              className="block w-full border border-black-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="buy">Buy</option>
              <option value="" disabled selected hidden>
                Choose here
              </option>
              <option value="sell">Sell</option>
            </select>
          </div>
          <div className="w-full px-3 mb-6">
            <label className="block text-sm font-bold mb-2">Company ID</label>
            <input
              type="number"
              name="company_id"
              value={formData.company_id}
              onChange={handleChange}
              className="input w-full"
              placeholder="Company ID"
            />
          </div>
        </div>
        <div className="w-full px-3 mt-6">
          <button
            type="submit"
            className="btn text-white bg-purple-600 hover:bg-purple-700 w-full"
          >
            Submit
          </button>
        </div>
      </form>
      {successMessage && (
        <div className="text-green-500 mt-4">{successMessage}</div>
      )}
    </div>
  );
};

export default TransactionForm;
