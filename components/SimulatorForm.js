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
                const response = await fetch("https://api.shield-dev51.quest/companies");
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
        <div className="simulator-form">
            <label>Select Company:</label>
            <select value={selectedCompany} onChange={handleCompanyChange}>
                <option value="">Select Company</option>
                {companies.map((company) => (
                    <option key={company.symbol} value={company.symbol}>
                        {company.name}
                    </option>
                ))}
            </select>
            <label>Investment Volume:</label>
            <input
                type="number"
                value={investmentVolume}
                onChange={handleInvestmentChange}
            />
            <button onClick={handleAddInvestment}>Add Investment</button>
            <div className="investments-list">
                <h3>Investments List</h3>
                <ul>
                    {investmentsList.map((investment, index) => (
                        <li key={index}>
                            {investment.company_symbol} - {investment.investment_volume}
                            <button onClick={() => handleRemoveInvestment(index)}>
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <button onClick={handleSimulate}>Simulate</button>
        </div>
    );
};

export default SimulatorForm;
