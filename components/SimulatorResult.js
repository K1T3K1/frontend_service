import React from "react";

const SimulatorResultTable = ({ result }) => {
  return (
    <div className="mt-6">
      <label className="block text-lg font-semibold text-gray-400 mb-1">
        Simulation Results
      </label>
      <table className="table-auto  border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-gray-600 font-semibold">
              ROI
            </th>
            <th className="border border-gray-300 px-4 py-2 text-gray-600 font-semibold">
              Std Dev
            </th>
            <th className="border border-gray-300 px-4 py-2 text-gray-600 font-semibold">
              Interval
            </th>
            <th className="border border-gray-300 px-4 py-2 text-gray-600 font-semibold">
              Sharpe
            </th>
            <th className="border border-gray-300 px-4 py-2 text-gray-600 font-semibold">
              Recommendation
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">
              {result.roi.toFixed(4)}%
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {result.stddev.toFixed(4)}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {result.interval.map((value) => value.toFixed(4)).join("% - ")}%
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {result.sharpe.toFixed(4)}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {result.recommendation}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SimulatorResultTable;
