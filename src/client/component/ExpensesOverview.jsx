import React, { useContext, useMemo } from "react";
import { TransactionContext } from './TransactionProvider';
import LoadingSpinner from "./LoadingSpinner";

const ExpensesOverview = ({ selectedMonth }) => {
  const { transactions, loading } = useContext(TransactionContext);
  const currentMonth = new Date().toISOString().slice(0, 7);
  const monthToUse = selectedMonth || currentMonth;
  const expensesData = useMemo(() => {
    return transactions.filter((tx) =>
      tx.type === "expense" &&
      new Date(tx.date).toISOString().slice(0, 7) === monthToUse
    );
  }, [transactions, monthToUse]);

  const totalExpenses = useMemo(() => {
    return expensesData.reduce((sum, tx) => sum + tx.amount, 0);
  }, [expensesData]);


  return (
    <>
      {loading ? (
        <div className="rounded-2xl shadow bg-white">
          <LoadingSpinner />
          <p className='text-center'>Loading Expenses Overview...</p>
        </div>
      ) : (
        <div className="p-4 rounded-2xl shadow bg-white">
          <h2 className="text-xl font-semibold mb-2">Expenses Overview</h2>
          <p className="text-3xl text-red-600 font-bold">£{totalExpenses.toFixed(2)}</p>

          <ul className="mt-4 space-y-2">
            {expensesData.map((tx) => (
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

export default ExpensesOverview;
