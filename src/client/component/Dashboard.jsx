import React from 'react'
import Overview from './Overview'
import ExpensesOverview from './ExpensesOverview'
import IncomeOverview from './IncomeOverview'

const Dashboard = () => {
return (
    <div className="flex justify-center items-center">
        <div className="w-7/10 bg-white shadow-lg rounded-lg p-6 mt-10">
            <div className="grid grid-cols-2 gap-4">
                <Overview />
                <ExpensesOverview />
                <IncomeOverview />
            </div>
        </div>
    </div>
)
}

export default Dashboard
