import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

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

  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch(
          "https://api.shield-dev51.quest/companies"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCompanies(data.companies);

        setFormData({ ...formData, company_id: data.companies[0].id });
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };
    fetchCompanies();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCompanyChange = (e) => {
    setFormData({ ...formData, company_id: e.target.value });
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

      toast.success("Transaction added successfully!");
      setTimeout(() => {
        window.location.href = "/transactions/list";
      }, 1000);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      toast.error("Failed to add an transaction");
    }
  };

  return (
    <div className="card bg-auto shadow-lg p-6 w-full">
      <form onSubmit={handleSubmit}>
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
            <label className="block text-sm font-bold mb-2">Company</label>
            <select
              onChange={handleCompanyChange}
              name="company"
              className="w-full text-gray-500 block border border-black-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              {companies.map((company) => (
                <option key={company.symbol} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
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
    </div>
  );
};

export default TransactionForm;
