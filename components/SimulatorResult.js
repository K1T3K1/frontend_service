import React from "react";

const SimulatorResultTable = ({ result }) => {
  return (
    <div class="mt-6">
      <label className="block text-lg font-semibold text-gray-400 mb-1">
        Simulation Results
      </label>
      <table class="table-auto  border-collapse border border-gray-300">
        <thead class="bg-gray-200">
          <tr>
            <th class="border border-gray-300 px-4 py-2 text-gray-600 font-semibold">
              ROI
            </th>
            <th class="border border-gray-300 px-4 py-2 text-gray-600 font-semibold">
              Std Dev
            </th>
            <th class="border border-gray-300 px-4 py-2 text-gray-600 font-semibold">
              Interval
            </th>
            <th class="border border-gray-300 px-4 py-2 text-gray-600 font-semibold">
              Sharpe
            </th>
            <th class="border border-gray-300 px-4 py-2 text-gray-600 font-semibold">
              Recommendation
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-gray-300 px-4 py-2">
              {result.roi.toFixed(3)}
            </td>
            <td class="border border-gray-300 px-4 py-2">
              {result.stddev.toFixed(3)}
            </td>
            <td class="border border-gray-300 px-4 py-2">
              {result.interval.map((value) => value.toFixed(3)).join(" - ")}
            </td>
            <td class="border border-gray-300 px-4 py-2">
              {result.sharpe.toFixed(3)}
            </td>
            <td class="border border-gray-300 px-4 py-2">
              {result.recommendation}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SimulatorResultTable;
