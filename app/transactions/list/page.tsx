"use client";
import React, { useState } from "react";
import { useRequireAuth } from "@/utils/useRequireAuth";
import TransactionList from "@/components/TransactionList";

interface TransactionsProps {}

const Transactions: React.FC<TransactionsProps> = () => {
    useRequireAuth();
    return (
        <>
            <TransactionList />
        </>
    );
};

export default Transactions;