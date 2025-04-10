// ReportChartDisplay.js
import React from 'react';
import { LineChart, BarChart, PieChart } from 'recharts';
import ChartDisplay from './ChartDisplay'; // Assuming you have this component

const ReportChartDisplay = ({ data, filters }) => {
  const { chartType } = filters;

  // Select the correct chart component based on the chartType
  let ChartComponent;
  switch (chartType) {
    case 'line':
      ChartComponent = LineChart;
      break;
    case 'bar':
      ChartComponent = BarChart;
      break;
    case 'pie':
      ChartComponent = PieChart;
      break;
    default:
      ChartComponent = BarChart;
  }

  return (
    <ChartDisplay
      data={data}
      chartComponent={ChartComponent}
      dataKeyX="category"
      dataKeyY="amount"
      chartType={chartType}
      title="Transaction Data"
    />
  );
};

export default ReportChartDisplay;
