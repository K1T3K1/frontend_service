import React, { useState } from "react";

const EditTransactionForm = ({ transaction, onCancelClick, onUpdateTransaction }) => {
    const [formData, setFormData] = useState({
        id: transaction.id,
        amount: transaction.amount,
        price_per_unit: transaction.price_per_unit,
        transaction_date: transaction.transaction_date,
        transaction_type: transaction.transaction_type,
        company_id: transaction.company_id,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Call the onUpdateTransaction callback with the updated data
        onUpdateTransaction(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Amount:</label>
                <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Price Per Unit:</label>
                <input
                    type="number"
                    name="price_per_unit"
                    value={formData.price_per_unit}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Transaction Date:</label>
                <input
                    type="date"
                    name="transaction_date"
                    value={formData.transaction_date}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Transaction Type:</label>
                <select
                    name="transaction_type"
                    value={formData.transaction_type}
                    onChange={handleChange}
                >
                    <option value="buy">Buy</option>
                    <option value="sell">Sell</option>
                </select>
            </div>
            <div>
                <label>Company ID:</label>
                <input
                    type="number"
                    name="company_id"
                    value={formData.company_id}
                    onChange={handleChange}
                />
            </div>
            <div>
                <button type="submit">Update Transaction</button>
                <button type="button" onClick={onCancelClick}>
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default EditTransactionForm;
