import React from 'react'
import { useState } from 'react'
const IncomeOverview = () => {
  const [incomeData, setIncomeData] = useState(null)
  return (
    <div>
        <div className="border border-gray-300 p-4 rounded-lg">
            <h2 className='text-lg font-semibold'>
              Income Overview
            </h2>
            <p className="text-gray-500 text-sm">
              This is a summary of your income for the current month.
            </p>
            <div className="mt-4">
              {incomeData ? (
                <>
                  <h3 className="">Total Income</h3>
                  <p className="text-xl font-bold">$5,000</p>
                </>
              ) : (
                <p className="text-red-500 text-lg font-bold">No Income Data Available</p>
              )}
            </div>
        </div>
    </div>
  )
}

export default IncomeOverview
