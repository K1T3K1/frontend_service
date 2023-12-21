import React from "react";
import "./walletView.scss"

/* 
    Trzeba dodać zeby najpierw szedl GET na transakcje i na tej podstawie generujemy liste
    Trzeba dodac tez GET na firmy jakie są dostępne zeby wypełnić drop down
    Trzeba dodać request POST do Add Transaction
    Trzeba tez troche uatrakcyjnic formularz add
*/
const WalletView = () => {
    return (
        <div className="walletView">
            <div className="transactionForm">
                <h2>Add transaction</h2>
                <form>
                    <div className="userBox">
                        <label>Company</label>
                        <select id="company" name="company">
                            <option value="AAPL">Apple Inc.</option>
                            <option value="MSFT">Microsoft</option>
                        </select>
                    </div>
                    <div className="userBox">
                        <label>Buy/Sell</label>
                        <select id="company" name="company">
                            <option value="buy">Buy</option>
                            <option value="sell">Sell</option>
                        </select>
                    </div>
                    <div className="userBox">
                        <label>Amount:</label>
                        <input type="number" required />
                    </div>
                    <div className="userBox">
                        <label>Average Price:</label>
                        <input type="number" required />
                    </div>
                    <button>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Submit
                    </button>
                </form >
            </div>
            <div className="transactionList">
                <h2>Latest transactions</h2>
            </div>
        </div>
    );
};

export default WalletView;
