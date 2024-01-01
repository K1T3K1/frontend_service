import React, { useEffect, useState } from "react";
import styles from "./TransactionList.module.css";

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                // Retrieve the access token from local storage
                const accessToken = localStorage.getItem("accessToken");

                // Check if the access token is available
                if (!accessToken) {
                    throw new Error("Access token is not available");
                }

                // Fetch user transactions
                const response = await fetch(
                    "https://api.shield-dev51.quest/user/transactions",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            // Include the authorization header
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();
                setTransactions(data.transactions);
            } catch (error) {
                // Handle errors here
                console.error("There was a problem with the fetch operation:", error);
            }
        };

        fetchTransactions();
    }, []); // Empty dependency array to ensure the effect runs only once

    const handleDelete = async (id) => {
        try {
            // Retrieve the access token from local storage
            const accessToken = localStorage.getItem("accessToken");

            // Check if the access token is available
            if (!accessToken) {
                throw new Error("Access token is not available");
            }

            // Delete user transaction
            const response = await fetch(
                "https://api.shield-dev51.quest/user/transactions",
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        // Include the authorization header
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({ id }),
                }
            );

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            // Update UI after successful deletion
            setTransactions(transactions.filter(transaction => transaction.id !== id));
        } catch (error) {
            // Handle errors here
            console.error("There was a problem with the fetch operation:", error);
        }
    };

    return (
        <div className={styles.transactionList}>
            <h2>User Transactions</h2>
            {transactions.length > 0 ? (
                <table className={styles.transactionTable}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Amount</th>
                        <th>Price Per Unit</th>
                        <th>Transaction Date</th>
                        <th>Transaction Type</th>
                        <th>Company ID</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td>{transaction.id}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.price_per_unit}</td>
                            <td>{transaction.transaction_date}</td>
                            <td>{transaction.transaction_type.toUpperCase()}</td>
                            <td>{transaction.company_id}</td>
                            <td>
                                <button onClick={() => handleDelete(transaction.id)} className="btn-sm text-white bg-red-500 hover:bg-red-600">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>No transactions available.</p>
            )}
        </div>
    );
};

export default TransactionList;
