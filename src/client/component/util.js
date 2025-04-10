// Filters by type before grouping
export const formatToChartData = (transactions, type) => {
  const filtered = transactions.filter(tx => tx.type === type);
  const grouped = groupByCategory(filtered);
  return accumulateData(grouped);
};

// Groups by category
export const groupByCategory = (transactions) => {
  return transactions.reduce((acc, transaction) => {
    const { category, amount } = transaction;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += amount;
    return acc;
  }, {});
};

// Turns grouped object into an array for recharts
export const accumulateData = (groupedData) => {
  return Object.entries(groupedData).map(([category, amount]) => ({
    category,
    amount
  }));
};
export const formatNetChartData = (transactions) => {
  const grouped = transactions.reduce((acc, tx) => {
    const { category, amount, type } = tx;
    const signedAmount = type === 'expense' ? -amount : amount;
    if (!acc[category]) acc[category] = 0;
    acc[category] += signedAmount;
    return acc;
  }, {});
  
  return accumulateData(grouped);
};
// Helper function to group data by category
export const groupByCategoryCompare = (transactions) => {
  return transactions.reduce((acc, transaction) => {
    const { category, amount, type } = transaction;
    if (!acc[category]) {
      acc[category] = { income: 0, expense: 0 };
    }
    // Separate the income and expense amounts
    if (type === 'income') {
      acc[category].income += amount;
    } else {
      acc[category].expense += amount;
    }
    return acc;
  }, {});
};

// Format the grouped data for the chart
export const formatIncomeVsExpenseData = (transactions) => {
  const groupedData = groupByCategoryCompare(transactions);
  return Object.entries(groupedData).map(([category, values]) => ({
    category,
    income: values.income,
    expense: values.expense
  }));
};
export const formatMonthYear = (monthYear) => {
  // Create a new Date object using the year and month
  const date = new Date(`${monthYear}-01`); // Adding a default day (01) to make it a valid date

  // Options for the format: "Month Year"
  const options = { year: 'numeric', month: 'long' };

  // Format the date and return as text (e.g., "April 2025")
  return date.toLocaleDateString('en-US', options);
};

