import React, { useState, useEffect } from "react";

const ChartFilter = ({ onFilterChange }) => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedRange, setSelectedRange] = useState("7d");

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
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchCompanies();
  }, []);

  const handleCompanyChange = (e) => {
    setSelectedCompany(e.target.value);
  };

  const handleRangeChange = (e) => {
    setSelectedRange(e.target.value);
  };

  const handleFilterApply = () => {
    onFilterChange(selectedCompany, selectedRange);
  };

  return (
    <div className="flex pl-3 gap-3">
      <select
        value={selectedCompany}
        onChange={handleCompanyChange}
        className="text-gray-500 block border border-black-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      >
        <option value="">Select Company</option>
        {companies.map((company) => (
          <option key={company.symbol} value={company.symbol}>
            {company.name}
          </option>
        ))}
      </select>
      <select
        value={selectedRange}
        onChange={handleRangeChange}
        className="text-gray-500 block border border-black-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      >
        <option value="1d">1 Day</option>
        <option value="7d">7 Days</option>
        <option value="1m">1 Month</option>
        <option value="6m">6 Months</option>
        <option value="1y">1 Year</option>
      </select>
      <button
        className="btn text-white bg-purple-600 hover:bg-purple-700"
        onClick={handleFilterApply}
      >
        Apply
      </button>
    </div>
  );
};

export default ChartFilter;
