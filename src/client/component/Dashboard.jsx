import React from 'react'
import Overview from './Overview'
import Expenses from './Expenses'
import Income from './Income'

const Dashboard = () => {
return (
    <div className="flex justify-center items-center">
        <div className="w-7/10 bg-white shadow-lg rounded-lg p-6 mt-10">
            <div className="grid grid-cols-2 gap-4">
                <Overview />
                <Expenses />
                <Income />
            </div>
        </div>
    </div>
)
}

export default Dashboard
