import React from "react";

const InvestmentsList = ({ investments, onRemoveInvestment }) => {
    return (
        <div className="investments-list">
            <h3>Investments List</h3>
            <ul>
                {investments.map((investment, index) => (
                    <li key={index}>
                        {investment.company_symbol} - {investment.investment_volume}
                        <button onClick={() => onRemoveInvestment(index)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InvestmentsList;
