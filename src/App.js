import React from "react";
import ApexCandlestickChart from "./ApexCandlestickChart";
import ApexBarChart from "./ApexBarChart";

class App extends React.Component {
  render() {
    return (
      <div>
        <ApexCandlestickChart />
        <ApexBarChart />
      </div>
    );
  }
}

export default App;
