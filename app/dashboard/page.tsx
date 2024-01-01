// dashboard/page.tsx

"use client";
import React from "react";
import ApexCandlestickChart from "@/components/ApexCandlestickChart";
import { useRequireAuth } from "@/utils/useRequireAuth";

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  useRequireAuth();

  return (
      <>
        <ApexCandlestickChart />
      </>
  );
};

export default Dashboard;