"use client";
import React from "react";
import ApexCandlestickChart from "@/components/ApexCandlestickChart";
import { useRequireAuth } from "@/utils/useRequireAuth";

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  useRequireAuth();


    {/*
    Waiting for backend to finish the get all companies endpoint
    */}

  return (
      <>
        <ApexCandlestickChart
            company_symbol={"AAPL"}
            range={"1y"}
        />
      </>
  );
};

export default Dashboard;