"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const ApexCandlestickChart = ({ company_symbol, range }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.shield-dev51.quest/company/chart/candlestick?company=${company_symbol}&range=${range}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setChartData(data.candlesticks);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchData();
  }, [company_symbol, range]);

  const seriesData = [
    {
      data: chartData.map((entry) => ({
        x: new Date(entry.time).getTime(),
        y: [entry.OpenPrice, entry.HighPrice, entry.LowPrice, entry.ClosePrice],
      })),
    },
  ];

  const options = {
    chart: {
      type: "candlestick",
      height: 350,
      autoWidth: true,
      background: "dark",
    },
    title: {
      style: {
        color: "#fff",
      },
      text: "CandleStick Chart",
      align: "left",
    },
    tooltip: {
      enabled: true,
    },
    xaxis: {
      labels: {
        style: {
          colors: "#fff",
        },
      },
      type: "datetime",
    },
    yaxis: {
      labels: {
        style: {
          colors: "#fff",
        },
        formatter: function (value) {
          return value.toFixed(2);
        },
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div id="candlestickChart">
      <div className="max-w-screen-2xl mx-auto mt-10">
        <ReactApexChart
          options={options}
          series={seriesData}
          type="candlestick"
          height={800}
          width={1500}
        />
      </div>
    </div>
  );
};

export default ApexCandlestickChart;
