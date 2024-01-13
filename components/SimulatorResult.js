import React, {useEffect, useState} from "react";

const SimulatorResultTable = ({ result, investmentsList }) => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {

    const fetchCompanies = async () => {
        try {
            const response = await fetch(
            "https://api.shield-dev51.quest/companies"
            );
            if (!response.ok) {
            throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setCompanies(data.companies);

        } catch (error) {
            console.error("There was a problem with the fetch operation:", error);
        }
    };

    fetchCompanies();
  }, []);

    const handleUploadTransactions = async (e) => {
        e.preventDefault();

        //print debug info
        console.log(investmentsList);

        // Retrieve the access token from local storage
        const accessToken = localStorage.getItem("accessToken");

        // Check if the access token is available
        if (!accessToken) {
            throw new Error("Access token is not available");
        }

        for (const investment of investmentsList) {
            // Find the corresponding company from the companies array
            const company = companies.find(c => c.symbol === investment.company_symbol);

            if (!company) {
                console.error(`Company with symbol ${investment.company_symbol} not found`);
                continue;
            }

            // Create the transaction object
            const transaction = {
                amount: investment.investment_volume,
                price_per_unit: company.price_per_unit,
                transaction_date: new Date().toISOString().split('T')[0], // current date in YYYY-MM-DD format
                transaction_type: "BUY",
                company_id: company.id,
            };

            try {
                const response = await fetch(
                    "https://api.shield-dev51.quest/user/transaction",
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${accessToken}`,
                        },
                        body: JSON.stringify(transaction),
                    }
                );

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error("There was a problem with the fetch operation:", error);
            }
        }
    }

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
        <button
            onClick={handleUploadTransactions}

            className="mt-6 btn text-white bg-purple-600 hover:bg-purple-700 hover:bg-purple-700 disabled:bg-gray-500"
        >
          Upload transactions
        </button>
      </div>
  );
};

export default SimulatorResultTable;
