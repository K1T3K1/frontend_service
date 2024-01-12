import React, { useState, useEffect } from "react";
import styles from "./Portfolio.module.css";
const Portfolio = () => {
    const [wallet, setWallet] = useState([]);

    useEffect(() => {
        const fetchWallet = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            if (!accessToken) {
            throw new Error("Access token is not available");
            }

            const response = await fetch(
            "https://api.shield-dev51.quest/user/wallet",
            {
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
                },
            }
            );

            if (!response.ok) {
            throw new Error("Network response was not ok");
            }

            const data = await response.json();
            setWallet(data);
        } catch (error) {
            console.error("There was a problem with the fetch operation:", error);
        }
        };

        fetchWallet();
    }, []);

    return (
        <div>
        <h1>Portfolio</h1>
            {wallet.length > 0 ? (
            <table className={styles.transactionTable}>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Average Buy Price</th>
                    <th>Average Sell Price</th>
                </tr>
                </thead>
                <tbody>
                {wallet.map((wallet) => (
                    <tr key={wallet.name}>
                    <td>{wallet.name}</td>
                    <td>{wallet.amount}</td>
                    <td>{wallet.average_buy_price}</td>
                    <td>{wallet.average_sell_price}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            ) : (
            <p>Your wallet is empty.</p>
            )}

        </div>
    );
}

export default Portfolio;
