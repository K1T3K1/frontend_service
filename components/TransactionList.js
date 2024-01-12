import React, { Fragment, useEffect, useRef, useState } from "react";
import styles from "./TransactionList.module.css";
import { Dialog, Transition } from "@headlessui/react";
import TransactionForm from "./TransactionForm";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);

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
        "https://api.shield-dev51.quest/user/transaction",
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
      setTransactions(
        transactions.filter((transaction) => transaction.id !== id)
      );
    } catch (error) {
      // Handle errors here
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const handleEditClick = (id) => {
    setEditingTransaction(
      transactions.find((transaction) => transaction.id === id)
    );
    setOpen(true);
  };

  const handleCancelClick = () => {
    setEditingTransaction(null);
  };

  const handleUpdateTransaction = async (updatedTransaction) => {
    try {
      // Retrieve the access token from local storage
      const accessToken = localStorage.getItem("accessToken");

      // Check if the access token is available
      if (!accessToken) {
        throw new Error("Access token is not available");
      }

      // Update user transaction
      const response = await fetch(
        "https://api.shield-dev51.quest/user/transaction",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Include the authorization header
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(updatedTransaction),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Update UI after successful update
      setTransactions(
        transactions.map((transaction) => {
          if (transaction.id === updatedTransaction.id) {
            return updatedTransaction;
          }
          return transaction;
        })
      );
      setEditingTransaction(null);
      setOpen(false);
    } catch (error) {
      // Handle errors here
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div className="mb-10 mt-20">
      <div className="header-with-lines">
        <h1 className="text-4xl font-bold">Transactions</h1>
      </div>
      <div className={styles.transactionList}>
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
                <th>Actions</th>
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
                    <button
                      onClick={() => handleDelete(transaction.id)}
                      className="text-red-500 hover:text-red-600 font-bold py-2 px-4 border rounded mr-3"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleEditClick(transaction.id)}
                      className="text-blue-500 hover:text-blue-600 font-bold py-2 px-4 border rounded"
                    >
                      Edit
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
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <header className="bg-gray-200 px-6 py-4 rounded-t-lg flex justify-center items-center">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Edit Transaction
                    </Dialog.Title>
                  </header>

                  <TransactionForm
                    initialState={editingTransaction}
                    handleSubmit={handleUpdateTransaction}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default TransactionList;
