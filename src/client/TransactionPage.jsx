import React from 'react'
import IncomeOverview from './component/IncomeOverview'
import { useState } from 'react'
import ExpensesOverview from './component/ExpensesOverview'
import AddTransactionModal from './component/AddTransactionModal'
const TransactionPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    console.log(isModalOpen)
    const handleAddTransaction = (transactionData) => {
        console.log("New Transaction:", transactionData);
        setIsModalOpen(false);
    };
  return (
    <>
        <h2>Transcations</h2>
        <div className="flex justify-center items-center">
            <IncomeOverview/>
            <ExpensesOverview/>
            <div className='flex flex-col justify-center '>
                <p>Income & Expenses Menu</p>
                <button className='btn-custom' onClick={()=>setIsModalOpen(true)}>Add</button>
                <button className='btn-custom'>Edit</button>
                <button className='btn-custom'>Delete</button>
            </div>
        </div>
        {isModalOpen && (
                <AddTransactionModal 
                    onSubmit={handleAddTransaction} 
                    onClose={() => setIsModalOpen(false)} 
                />
            )}
    </>
  )
}

export default TransactionPage
