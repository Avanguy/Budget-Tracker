import React from 'react'
import { useState } from 'react'
const ExpensesOverview = () => {
  const [expensesData, setExpensesData] = useState(null)
  return (
        <div className="border border-gray-300 p-4 rounded-lg">
            <h2 className='text-lg font-semibold'>
              Expenses Overview
            </h2>
            <p className="text-gray-500 text-sm">
              This is a summary of your expenses for the current month.
            </p>
            <div className="mt-4">
              {expensesData ? (
                <>
                  <h3 className="">Total Expenses</h3>
                  <p className="text-xl font-bold">$5,000</p>
                </>
              ) : (
                <p className="text-red-500 text-lg font-bold">No Expenses Data Available</p>
              )}
            </div>
        </div>
    
  )
}

export default ExpensesOverview
