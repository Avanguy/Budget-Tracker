import React from 'react'
import IncomeOverview from './component/IncomeOverview'
import { useState,useContext } from 'react'
import ExpensesOverview from './component/ExpensesOverview'
import AddTransactionModal from './component/AddTransactionModal'
import { UserContext } from './component/UserProvider'
const TransactionPage = () => {
    const {user} = useContext(UserContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleAddTransaction = async (transactionData) => {
        console.log("New Transaction:", transactionData);
        console.log(user)
        try{
            const addTransactionResponse = await fetch("http://localhost:5174/api/transaction", { // Ensure the correct API endpoint
                method: "POST",
                headers: {"Content-Type": "application/json",'Authorization': `Bearer ${user.token}`},
                body: JSON.stringify(transactionData)
            });
            const data = await addTransactionResponse.json();
            if (!addTransactionResponse.ok) {
                throw new Error(data.error || "Failed to add transaction");
            }
            console.log("Transaction added successfully:", data);
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error adding transaction:", error);
        }
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
