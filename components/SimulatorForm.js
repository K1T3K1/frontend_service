// components/SimulatorForm.js
import React, { useState, useEffect } from "react";

const SimulatorForm = ({ onSimulate }) => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [investmentVolume, setInvestmentVolume] = useState("");
  const [investmentsList, setInvestmentsList] = useState([]);

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

  const handleInvestmentChange = (e) => {
    setInvestmentVolume(e.target.value);
  };

  const handleAddInvestment = () => {
    if (selectedCompany && investmentVolume) {
      setInvestmentsList([
        ...investmentsList,
        {
          company_symbol: selectedCompany,
          investment_volume: parseFloat(investmentVolume),
        },
      ]);

      // Clear the selected company and investment volume
      setSelectedCompany("");
      setInvestmentVolume("");
    }
  };

  const handleRemoveInvestment = (index) => {
    const updatedList = [...investmentsList];
    updatedList.splice(index, 1);
    setInvestmentsList(updatedList);
  };

  const handleSimulate = () => {
    onSimulate({ companies: investmentsList });
  };

  return (
    <div>
      <div className="flex flex-wrap">
        <div className="mr-6 mb-6 ">
          <label className="block text-sm font-bold mb-2">Company</label>
          <select
            value={selectedCompany}
            onChange={handleCompanyChange}
            name="company"
            className="text-gray-500 block border border-black-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            {companies.map((company) => (
              <option key={company.symbol} value={company.symbol}>
                {company.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mr-6 mb-6">
          <label className="block text-sm font-bold mb-2">
            Investment Volume
          </label>
          <input
            type="number"
            value={investmentVolume}
            onChange={handleInvestmentChange}
            name="amount"
            className="input text-gray-500"
            placeholder="Investment Volume"
          />
        </div>

        <div className="mr-6 mt-6">
          <button
            onClick={handleAddInvestment}
            className="btn text-white bg-purple-600 hover:bg-purple-700 "
          >
            Add Investment
          </button>
        </div>
      </div>

      {investmentsList.length > 0 && (
        <div class="mt-6">
          <label className="block text-lg font-semibold text-gray-400 mb-1">
            Simulation Results
          </label>
          <table class="table-auto  border-collapse border border-gray-300">
            <thead class="bg-gray-200">
              <tr>
                <th class="border border-gray-300 px-4 py-2 text-gray-600 font-semibold">
                  Company
                </th>
                <th class="border border-gray-300 px-4 py-2 text-gray-600 font-semibold">
                  Value
                </th>
                <th class="border border-gray-300 px-4 py-2 text-gray-600 font-semibold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {investmentsList.map((investment, index) => (
                <tr key={index}>
                  <td class="border border-gray-300 px-4 py-2">
                    {investment.company_symbol}
                  </td>
                  <td class="border border-gray-300 px-4 py-2">
                    {investment.investment_volume}
                  </td>
                  <td class="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleRemoveInvestment(index)}
                      class="text-red-500 hover:text-red-600 font-bold py-2 px-4 rounded"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button
        onClick={handleSimulate}
        disabled={investmentsList.length === 0}
        className="mt-6 btn text-white bg-purple-600 hover:bg-purple-700 hover:bg-purple-700 disabled:bg-gray-500"
      >
        Simulate
      </button>
    </div>
  );
};

export default SimulatorForm;
