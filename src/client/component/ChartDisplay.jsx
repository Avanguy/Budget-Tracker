import React from 'react';
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, Bar } from 'recharts';

const ChartDisplay = ({
  data,
  chartComponent: Chart, // Pass chart component (BarChart, LineChart, etc.)
  chartProps, // Pass chart-specific props
  dataKeyX,
  dataKeyY,
  title,
  chartType, // new prop to specify whether the chart is a Line or Bar
}) => {
  return (
    <div className="chart-container">
      <h2 className='text-center'>{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <Chart data={data} {...chartProps}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={dataKeyX} />
          <YAxis label={{ value: 'Amount (£)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          {/* Dynamically render the Line or Bar component based on chartType */}
          {chartType === 'line' ? (
            <Line type="monotone" dataKey={dataKeyY} stroke="#8884d8" />
          ) : chartType === 'bar' ? (
            <Bar dataKey={dataKeyY} fill="#82ca9d" />
          ) : null}
        </Chart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartDisplay;
