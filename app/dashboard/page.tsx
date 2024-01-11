"use client";

import React, { useState } from "react";
import ApexCandlestickChart from "@/components/ApexCandlestickChart";
import ChartFilter from "@/components/ChartFilter";
import { useRequireAuth } from "@/utils/useRequireAuth";

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
    useRequireAuth();
    const [filter, setFilter] = useState({ company_symbol: "AAPL", range: "7d" });

    const handleFilterChange = (company_symbol, range) => {
        setFilter({ company_symbol, range });
    };

    return (
        <>
            <ChartFilter onFilterChange={handleFilterChange} />
            <ApexCandlestickChart {...filter} />
        </>
    );
};

export default Dashboard;