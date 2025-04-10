import React from 'react';
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#a4de6c', '#d0ed57', '#8dd1e1'];

const ChartDisplay = ({
  data,
  chartComponent: Chart, // BarChart, LineChart, PieChart
  chartProps,
  dataKeyX,
  dataKeyY,
  title,
  chartType,
}) => {
  return (
    <div className="chart-container">
      <h2 className="text-center">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        {chartType === 'pie' ? (
          <PieChart>
            <Tooltip />
            <Legend />
            <Pie
              data={data}
              dataKey={dataKeyY}
              nameKey={dataKeyX}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        ) : (
          <Chart data={data} {...chartProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={dataKeyX} />
            <YAxis label={{ value: 'Amount (£)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            {chartType === 'line' ? (
              <Line type="monotone" dataKey={dataKeyY} stroke="#8884d8" />
            ) : chartType === 'bar' ? (
              <Bar dataKey={dataKeyY}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} 
                  radius={[10, 10, 0, 0]}/>
                ))}
              </Bar>
            ) : null}
          </Chart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default ChartDisplay;
