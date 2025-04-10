import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList
} from 'recharts';

const monthAbbreviations = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const formatDataByMonth = (transactions, selectedYear) => {
    const monthsData = {};
    const monthsOfYear = Array.from({ length: 12 }, (_, index) => {
      const key = `${selectedYear}-${String(index + 1).padStart(2, '0')}`;
      monthsData[key] = { income: 0, expense: 0 };
      return key;
    });
  
    transactions.forEach(tx => {
      const date = new Date(tx.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const key = `${year}-${String(month).padStart(2, '0')}`;
  
      if (year === selectedYear) {
        if (tx.type === 'income') {
          monthsData[key].income += tx.amount;
        } else if (tx.type === 'expense') {
          monthsData[key].expense += tx.amount;
        }
      }
    });
  
    return monthsOfYear.map((key, index) => ({
      month: monthAbbreviations[index],
      income: monthsData[key].income,
      expense: monthsData[key].expense
    }));
  };
  

const IncomeExpenseChart = ({ transactions,selectedYear }) => {
  // Format the data by month
  const formattedData = formatDataByMonth(transactions, selectedYear);


  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis label={{ value: 'Amount (£)', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />

        {/* Income Bars for each month */}
        <Bar 
          dataKey="income" 
          name="Income" 
          fill="#82ca9d" 
          barSize={50}
          radius={[10, 10, 0, 0]}
        >
          {/* Add labels inside the income bars */}
          <LabelList dataKey="income" position="inside" fill="#ffffff" />
        </Bar>

        {/* Expense Bars for each month */}
        <Bar 
          dataKey="expense" 
          name="Expense" 
          fill="#ff7300" 
          barSize={50}
          radius={[10, 10, 0, 0]}
        >
          {/* Add labels inside the expense bars */}
          <LabelList dataKey="expense" position="inside" fill="#ffffff" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default IncomeExpenseChart;
