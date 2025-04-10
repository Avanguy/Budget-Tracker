import React, { useContext, useState } from 'react';
import { TransactionContext } from './component/TransactionProvider';
import FilterControls from './component/FilterControls';
import ReportChartDisplay from './component/ReportChartDisplay';
import {formatToChartData} from './component/util';
import TransactionsInsights from './component/TransactionsInsights';
const ReportsPage = () => {
  const { transactions } = useContext(TransactionContext);
  const getDefaultMonth = offset => {
    const now = new Date()
    now.setMonth(now.getMonth() + offset)
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  }
  // State to manage filter settings
  const [filters, setFilters] = useState({
    chartType: 'bar',
    transactionType: 'expense',
    startDate: getDefaultMonth(0),
    endDate: getDefaultMonth(1),
  });
  

  const filteredByDate = transactions.filter(t => {
    const txDate = new Date(t.date)
    const from = filters.startDate ? new Date(filters.startDate) : null
    const to = filters.endDate ? new Date(filters.endDate) : null

    if (from && txDate < from) return false
    if (to && txDate > to) return false
    return true
  })
  const filteredTransactions = formatToChartData(filteredByDate, filters.transactionType)
  console.log(filteredTransactions)
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Transaction Report</h1>
      
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
}

export default ReportsPage;
