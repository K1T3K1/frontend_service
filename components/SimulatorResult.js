import React from "react";

const SimulatorResultTable = ({ result }) => {
    return (
        <div className="simulator-result">
            <h2>Simulation Result</h2>
            <table>
                <thead>
                <tr>
                    <th>ROI</th>
                    <th>Std Dev</th>
                    <th>Interval</th>
                    <th>Sharpe</th>
                    <th>Recommendation</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{result.roi.toFixed(3)}</td>
                    <td>{result.stddev.toFixed(3)}</td>
                    <td>{result.interval.map(value => value.toFixed(3)).join(" - ")}</td>
                    <td>{result.sharpe.toFixed(3)}</td>
                    <td>{result.recommendation}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default SimulatorResultTable;