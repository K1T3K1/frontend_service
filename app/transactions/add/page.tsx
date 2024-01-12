// transactions/page.tsx

"use client";
import React, { useState } from "react";
import TransactionForm from "@/components/TransactionForm";
import { useRequireAuth } from "@/utils/useRequireAuth";

interface TransactionsProps {}

const Transactions: React.FC<TransactionsProps> = () => {
  useRequireAuth();
  return (
    <div className="mt-20">
      <div className="header-with-lines mb-10">
        <h1 className="text-4xl font-bold">Add transaction</h1>
      </div>
      <TransactionForm />
    </div>
  );
};

export default Transactions;
