import React, { useContext, useMemo } from "react";
import { TransactionContext } from './TransactionProvider';
import LoadingSpinner from "./LoadingSpinner";

const IncomeOverview = ({ selectedMonth }) => {
  const { transactions, loading } = useContext(TransactionContext);
  const currentMonth = new Date().toISOString().slice(0, 7);
  const monthToUse = selectedMonth || currentMonth;

  const incomeData = useMemo(() => {
    return transactions.filter((tx) =>
      tx.type === "income" &&
      new Date(tx.date).toISOString().slice(0, 7) === monthToUse
    );
  }, [transactions, monthToUse]);

  const totalIncome = useMemo(() => {
    return incomeData.reduce((sum, tx) => sum + tx.amount, 0);
  }, [incomeData]);
    

  return (
    <>
      {loading ? (
        <div className="rounded-2xl shadow bg-white">
          <LoadingSpinner />
          <p className='text-center'>Loading Income Overview...</p>
        </div>
      ) : (
        <div className="p-4 rounded-2xl shadow bg-white">
          <h2 className="text-xl font-semibold mb-2">Income Overview</h2>
          <p className="text-3xl text-green-600 font-bold">£{totalIncome.toFixed(2)}</p>

          <ul className="mt-4 space-y-2">
            {incomeData.map((tx) => (
              <li key={tx._id} className="border-b pb-2">
                <div className="flex justify-between text-sm">
                  <span>{tx.category}</span>
                  <span>£{tx.amount}</span>
                </div>
                <p className="text-xs text-gray-500">{new Date(tx.date).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default IncomeOverview;
