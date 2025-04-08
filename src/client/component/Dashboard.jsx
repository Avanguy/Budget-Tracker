import React, { useState } from 'react';
import Overview from './Overview';
import ExpensesOverview from './ExpensesOverview';
import IncomeOverview from './IncomeOverview';
const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState(() => {
    // Default to current month in format YYYY-MM
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });
  
  return (
    <div className="flex justify-center items-center">
      <div className="w-7/10 bg-white shadow-lg rounded-lg p-6 mt-10">
        <div className="grid grid-cols-2 gap-4">
          <Overview
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
          />
          <ExpensesOverview selectedMonth={selectedMonth} />
          <IncomeOverview selectedMonth={selectedMonth} />
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
