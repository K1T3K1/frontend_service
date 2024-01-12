"use client";

import React, { useState } from "react";
import ApexCandlestickChart from "@/components/ApexCandlestickChart";
import ChartFilter from "@/components/ChartFilter";
import Portfolio from "@/components/Portfolio";
import { useRequireAuth } from "@/utils/useRequireAuth";

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  useRequireAuth();
  const [filter, setFilter] = useState({ company_symbol: "AAPL", range: "7d" });

  const handleFilterChange = (company_symbol, range) => {
    setFilter({ company_symbol, range });
  };

  return (
    <div className="mt-20">
      <div className="header-with-lines mb-10">
        <h1 className="text-4xl font-bold">Dashboard</h1>
      </div>
        <Portfolio />
      <ChartFilter onFilterChange={handleFilterChange} />
      <ApexCandlestickChart {...filter} />
    </div>
  );
};

export default Dashboard;
