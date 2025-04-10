import React, { useContext, useState } from 'react';
import { TransactionContext } from './component/TransactionProvider';
import FilterControls from './component/FilterControls';
import ReportChartDisplay from './component/ReportChartDisplay';
import { formatToChartData, formatMonthYear } from './component/util';
import TransactionsInsights from './component/TransactionsInsights';
import IncomeExpenseChart from './component/IncomeExpenseChart';

const ReportsPage = () => {
  const { transactions } = useContext(TransactionContext);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
// Get all unique years from transactions
  const availableYears = Array.from(
    new Set(transactions.map(tx => new Date(tx.date).getFullYear()))
  ).sort((a, b) => b - a); // Sort descending if you want most recent first

  // Get default month based on the current date
  const getDefaultMonth = (offset) => {
    const now = new Date();
    now.setMonth(now.getMonth() + offset);
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  };

  // State to manage filter settings
  const [filters, setFilters] = useState({
    chartType: 'pie',
    transactionType: 'expense',
    startDate: getDefaultMonth(0),
    endDate: getDefaultMonth(1),
  });

  // Filter transactions by date
  const filteredByDate = transactions.filter((t) => {
    const txDate = new Date(t.date);
    const from = filters.startDate ? new Date(filters.startDate) : null;
    const to = filters.endDate ? new Date(filters.endDate) : null;

    if (from && txDate < from) return false;
    if (to && txDate > to) return false;
    return true;
  });

  // Format filtered data for chart display
  const filteredTransactions = formatToChartData(filteredByDate, filters.transactionType);

  // Total income or expense summary
  const totalAmount = filteredTransactions.reduce((total, transaction) => total + transaction.amount, 0);
  const transactionWord = filters.transactionType === 'expense' ? 'spent' : 'earned';

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">
        {`${filters.transactionType === 'expense' ? 'Income vs Expense' : 'Income'} ${selectedYear} Overview`}
      </h1>
      <div className="flex justify-center items-center gap-4">
        <label htmlFor="year" className="font-medium">Select Year:</label>
        <select
          id="year"
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          className="border p-2 rounded"
        >
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

      </div>

      {/* Income vs Expense Comparison Chart */}
      <IncomeExpenseChart transactions={transactions} selectedYear={selectedYear} />


      <h1 className="text-3xl font-bold text-center">
        {`${filters.transactionType === 'expense' ? ' Expense' : 'Income'} Detailed ${formatMonthYear(filters.startDate)} - ${formatMonthYear(filters.endDate)}`}
      </h1>

      <p className="text-center text-lg mb-6">
        {`You’ve ${transactionWord} a total of £${totalAmount.toFixed(2)}.`}
      </p>

      {/* Filter controls */}
      <FilterControls filters={filters} setFilters={setFilters} />

      {/* Chart display */}
      <ReportChartDisplay data={filteredTransactions} filters={filters} />

      {/* Insights section */}
      <TransactionsInsights
        filteredTransactions={filteredTransactions}   // Aggregated (combined) data
        filteredByDate={filteredByDate}               // Unaggregated (uncombined) raw data
        transactionType={filters.transactionType} // 'expense' or 'income'
      />
    </div>
  );
};

export default ReportsPage;
