import React from "react";
import ApexCandlestickChart from "@/components/ApexCandlestickChart";

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  return (
    <>
      <ApexCandlestickChart />
    </>
  );
};

export default Dashboard;
