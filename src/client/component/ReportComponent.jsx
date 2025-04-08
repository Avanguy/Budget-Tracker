import React from 'react'
import ChartDisplay from './ChartDisplay';
import { LineChart,BarChart } from 'recharts';
import { formatToChartData } from './util';

const data = [
    { name: 'January', uv: 4000, pv: 2400 },
    { name: 'February', uv: 3000, pv: 1398 },
    { name: 'March', uv: 2000, pv: 9800 },
    { name: 'April', uv: 2780, pv: 3908 },
  ];
  const transactions = [
    { category: 'Food', amount: 50 },
    { category: 'Food', amount: 30 },
    { category: 'Entertainment', amount: 100 },
    { category: 'Transport', amount: 40 },
    { category: 'Entertainment', amount: 70 },
    { category: 'Transport', amount: 20 },
  ];
  
const ReportComponent = () => {
  const chartData = formatToChartData(transactions)
  return (
    <div>
      <div>
        <ChartDisplay
                data={chartData}
                chartComponent={BarChart}
                dataKeyX="category"
                dataKeyY="amount"
                chartType="bar"
                title="Monthly Data"
            />
            <ChartDisplay
                data={data}
                chartComponent={LineChart}
                dataKeyX="name"
                dataKeyY="pv"
                chartType="line"
                title="Monthly Data"
            />
        </div>
    </div>
  )
}

export default ReportComponent
