import React from 'react';

const TransactionsInsights = ({ filteredTransactions, filteredByDate, transactionType }) => {
  // Calculate total amount (combined data)
  const totalAmount = filteredTransactions.reduce((total, transaction) => total + transaction.amount, 0);

  // Find the category with the highest value (combined data)
  const highestCategory = filteredTransactions.reduce((highest, transaction) => {
    if (!highest || transaction.amount > highest.amount) {
      return transaction;
    }
    return highest;
  }, null);

  // Find any significant individual transactions (uncombined data)
  const largeTransactions = filteredByDate.filter(tx => tx.amount > 100); // Transactions over £100

  // Filter recurring transactions
  const recurringTransactions = filteredByDate.filter(tx => tx.recurring);

  // Helper function to display verbage based on the transaction type (expense or income)
  const getTransactionMessage = () => {
    if (transactionType === "income") {
      return {
        total: "You’ve earned a total of",
        highest: "Your highest income was from",
        category: "earned",
      };
    } else {
      return {
        total: "You’ve spent a total of",
        highest: "Your biggest expense was on",
        category: "spent",
      };
    }
  };

  const { total, highest, category } = getTransactionMessage();

  return (
    <div className="insights-container">
      <h3 className="text-lg font-bold text-green-600 mb-2">Insights</h3>

      {/* Total Amount */}
      <p className="insight">
        {total} <strong>£{totalAmount.toFixed(2)}</strong> across all categories.
      </p>

      {/* Highest Category Spending */}
      {highestCategory && (
        <p className="insight">
          {highest} <strong>{highestCategory.category}</strong>, where you {category} <strong>£{highestCategory.amount.toFixed(2)}</strong>.
        </p>
      )}

      {/* Category Breakdown */}
      <div>
        <h4 className='font-bold underline'>Category Breakdown</h4>
        <ul>
          {filteredTransactions.map((categoryData) => (
            <li key={categoryData.category}>
              {categoryData.category}: <strong>£{categoryData.amount.toFixed(2)}</strong>
            </li>
          ))}
        </ul>
      </div>

      {/* Large Transactions */}
      {largeTransactions.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-red-600 mb-2">Large Transactions</h4>
          <ul>
            {largeTransactions.map((tx) => (
              <li key={tx.id}>
                <strong>{tx.category}</strong>: £{tx.amount} on {new Date(tx.date).toLocaleDateString("en-US", {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </li>
            ))}
          </ul>
        </div>
      )}
      {largeTransactions.length === 0 && (
        <p className="insight">No major transactions to highlight this period.</p>
      )}

      {/* Recurring Payments */}
      {recurringTransactions.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-blue-600 mb-2">Recurring Payments</h4>
          <ul>
            {recurringTransactions.map((tx) => (
              <li key={tx.id}>
                <strong>{tx.category}</strong>: £{tx.amount} - Recurs {tx.recurrenceFrequency} 
                on {new Date(tx.date).toLocaleDateString("en-US", {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </li>
            ))}
          </ul>
        </div>
      )}
      {recurringTransactions.length === 0 && (
        <p className="insight">No recurring payments this period.</p>
      )}
    </div>
  );
};

export default TransactionsInsights;
