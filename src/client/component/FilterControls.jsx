// FilterControls.js
import React from 'react';

const FilterControls = ({ filters, setFilters }) => {
  const handleChartTypeChange = (e) => {
    setFilters(prev => ({ ...prev, chartType: e.target.value }));
  };

  const handleTransactionTypeChange = (e) => {
    setFilters(prev => ({ ...prev, transactionType: e.target.value }));
  };

  const handleStartDateChange = (e) => {
    setFilters(prev => ({ ...prev, startDate: e.target.value }));
  };

  const handleEndDateChange = (e) => {
    setFilters(prev => ({ ...prev, endDate: e.target.value }));
  };

  const handleReset = () => {
    const getDefaultMonth = offset => {
        const now = new Date()
        now.setMonth(now.getMonth() + offset)
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
      }
    setFilters({
      chartType: 'bar',
      transactionType: 'expense',
      startDate: getDefaultMonth(0), // This month
      endDate: getDefaultMonth(1),   // Next month
    });
  };

  return (
    <div className="flex flex-wrap justify-center gap-6 items-start text-left">
      <label className="flex flex-col">
        Chart Type
        <select
          className="border p-1 rounded"
          value={filters.chartType}
          onChange={handleChartTypeChange}
        >
          <option value="bar">Bar</option>
          <option value="line">Line</option>
          <option value="pie">Pie</option>
        </select>
      </label>

      <label className="flex flex-col">
        Transaction Type
        <select
          className="border p-1 rounded"
          value={filters.transactionType}
          onChange={handleTransactionTypeChange}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </label>

      <label className="flex flex-col">
        Start Date
        <input
          type="month"
          className="border p-1 rounded"
          value={filters.startDate}
          onChange={handleStartDateChange}
        />
      </label>

      <label className="flex flex-col">
        End Date
        <input
          type="month"
          className="border p-1 rounded"
          value={filters.endDate}
          onChange={handleEndDateChange}
        />
      </label>

      {/* Reset Button */}
      <div className="flex flex-col items-center justify-end">
          <span className="invisible">Reset</span>
          <button
            className="btn-custom-close"
            onClick={handleReset}
          >
            Reset Dates
          </button>
        </div>
    </div>
  );
};

export default FilterControls;
