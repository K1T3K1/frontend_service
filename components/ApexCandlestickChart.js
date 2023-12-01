'use client'

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import jsonData from "app/dashboard/candlestickdata.json";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

class ApexCandlestickChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
            data: this.parseData(jsonData),
        },
      ],
      options: {
        chart: {
          type: "candlestick",
          height: 350,
          autoWidth: true,
          background: '#fff',
        },
        title: {
          text: "CandleStick Chart",
          align: "left",
        },
        tooltip: {
          enabled: true,
        },
        xaxis: {
          type: "datetime",
        },
        yaxis: {
          // Set precision to two decimal places
          labels: {
            formatter: function (value) {
              return value.toFixed(2);
            },
          },
          tooltip: {
            enabled: true,
          },
        },
      },
    };
  }

  parseData(jsonData) {
    return jsonData.map((entry) => ({
      x: new Date(entry.time).getTime(),
      y: [entry.OpenPrice, entry.HighPrice, entry.LowPrice, entry.ClosePrice],
    }));
  }

  render() {
    return (
        <div id="candlestickChart">
          <ReactApexChart
              options={this.state.options}
              series={this.state.series}
              type="candlestick"
              height={800}
              width={1500}
          />
        </div>
    );
  }
}

export default ApexCandlestickChart;