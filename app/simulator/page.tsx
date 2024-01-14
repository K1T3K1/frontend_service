"use client";

import React, { useState } from "react";
import SimulatorForm from "@/components/SimulatorForm";
import SimulatorResultTable from "@/components/SimulatorResult";

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

  return (
    <div className="simulator-page mt-20">
      <div className="header-with-lines mb-10">
        <h1 className="text-4xl font-bold">Stock Simulator</h1>
      </div>
      <div className="px-5">
        <SimulatorForm
          onSimulate={simulate}
          investmentsList={investmentsList}
          setInvestmentsList={setInvestmentsList}
        />
        {simulationResult && (
          <SimulatorResultTable
            result={simulationResult}
            investmentsList={investmentsList}
          />
        )}
      </div>
    </div>
  );
};

export default SimulatorPage;
