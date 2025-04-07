import React, { useContext, useMemo } from 'react';
import { TransactionContext } from './TransactionProvider';
import LoadingSpinner from './LoadingSpinner';

const Overview = ({ selectedMonth, setSelectedMonth }) => {
  const { transactions, loading } = useContext(TransactionContext);
  const monthlyTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const txMonth = new Date(tx.date).toISOString().slice(0, 7);
      return txMonth === selectedMonth;
    });
  }, [transactions, selectedMonth]);

  const incomeTotal = useMemo(() =>
    monthlyTransactions
      .filter((tx) => tx.type === "income")
      .reduce((sum, tx) => sum + tx.amount, 0),
    [monthlyTransactions]
  );

  const expenseTotal = useMemo(() =>
    monthlyTransactions
      .filter((tx) => tx.type === "expense")
      .reduce((sum, tx) => sum + tx.amount, 0),
    [monthlyTransactions]
  );

  const netTotal = incomeTotal - expenseTotal;

  return (
    <div className="border border-gray-300 p-6 rounded-2xl bg-white shadow-md col-span-2">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Month Overview - {new Date(`${selectedMonth}-01`).toLocaleString('default', {month: 'long',year: 'numeric'})}</h2>
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="border p-2 rounded"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="border border-gray-300 rounded-lg shadow-md p-4 m-2">
              <p className="text-sm text-gray-600">Net Total</p>
              <p className={`text-xl font-bold ${netTotal >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                £{netTotal.toFixed(2)}
              </p>
            </div>
            <div className="border border-gray-300 rounded-lg shadow-md p-4 m-2">
              <p className="text-sm text-gray-600">Total Transactions</p>
              <p className="text-xl font-bold">{monthlyTransactions.length}</p>
            </div>
            <div className="border border-gray-300 rounded-lg shadow-md p-4 m-2">
              <p className="text-sm text-gray-600">Income</p>
              <p className="text-xl font-bold text-green-600">£{incomeTotal.toFixed(2)}</p>
            </div>
            <div className="border border-gray-300 rounded-lg shadow-md p-4 m-2">
              <p className="text-sm text-gray-600">Expenses</p>
              <p className="text-xl font-bold text-red-500">£{expenseTotal.toFixed(2)}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Overview;
