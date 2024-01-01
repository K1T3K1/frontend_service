// transactions/page.tsx

"use client";
import React, { useState } from "react";
import TransactionForm from "@/components/TransactionForm";
import { useRequireAuth } from "@/utils/useRequireAuth";

interface TransactionsProps {}

const Transactions: React.FC<TransactionsProps> = () => {
    useRequireAuth();
    return (
        <>
            <TransactionForm />
        </>
    );
};

export default Transactions;
