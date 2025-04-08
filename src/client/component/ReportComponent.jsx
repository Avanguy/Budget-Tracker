import React, { useContext } from 'react'
import ChartDisplay from './ChartDisplay';
import { LineChart,BarChart } from 'recharts';
import { formatToChartData } from './util';
import { TransactionContext } from './TransactionProvider'
import LoadingSpinner from './LoadingSpinner'

  
const ReportComponent = () => {
  const {transactions} = useContext(TransactionContext);
  const incomeChartFormat = formatToChartData(transactions, 'income')
  const expensesChartFormat = formatToChartData(transactions, 'expense')
  console.log(expensesChartFormat)
  /* const chartData = formatToChartData(transactions) */

  return (
    <div>
      <div>
        <ChartDisplay
                data={incomeChartFormat}
                chartComponent={BarChart}
                dataKeyX="category"
                dataKeyY="amount"
                chartType="bar"
                title="Income Data"
            />
            <ChartDisplay
                data={expensesChartFormat}
                chartComponent={BarChart}
                dataKeyX="category"
                dataKeyY="amount"
                chartType="bar"
                title="Expenses Data"
            />
        </div>
    </div>
  )
}

export default ReportComponent
