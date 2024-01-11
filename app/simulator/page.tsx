"use client";

import React, { useState } from "react";
import SimulatorForm from "@/components/SimulatorForm";
import SimulatorResultTable from "@/components/SimulatorResult";
import InvestmentsList from "@/components/InvestmentsList";

interface SimulatorPageProps {}

const SimulatorPage: React.FC<SimulatorPageProps> = () => {
    const [simulationResult, setSimulationResult] = useState(null);
    const [investmentsList, setInvestmentsList] = useState([]);

    const simulate = async (requestData) => {
        try {
            const response = await fetch("https://api.shield-dev51.quest/simulator", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const result = await response.json();
            setSimulationResult(result);
        } catch (error) {
            console.error("There was a problem with the fetch operation:", error);
        }
    };

    const handleRemoveInvestment = (index) => {
        const updatedList = [...investmentsList];
        updatedList.splice(index, 1);
        setInvestmentsList(updatedList);
    };

    return (
        <div className="simulator-page mt-20">
            <h1>Stock Simulator</h1>
            <SimulatorForm
                onSimulate={simulate}
                investmentsList={investmentsList}
                setInvestmentsList={setInvestmentsList}
            />
            {investmentsList.length > 0 && (
                <InvestmentsList
                    investments={investmentsList}
                    onRemoveInvestment={handleRemoveInvestment}
                />
            )}
            {simulationResult && <SimulatorResultTable result={simulationResult} />}
        </div>
    );
};

export default SimulatorPage;
