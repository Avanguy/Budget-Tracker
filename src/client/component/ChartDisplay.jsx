import React from 'react';
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, Bar } from 'recharts';
import { Cell } from 'recharts';
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#a4de6c', '#d0ed57', '#8dd1e1'];

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
            <Bar dataKey={dataKeyY}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          ) : null}
        </Chart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartDisplay;
