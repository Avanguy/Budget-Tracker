export const formatToChartData = (transactions) => {
    return accumulateData(groupByCategory(transactions))
}
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
export const accumulateData = (groupedData) => {
    return Object.keys(groupedData).map(category => ({
        category,
        amount: groupedData[category],
    }));
}