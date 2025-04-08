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
