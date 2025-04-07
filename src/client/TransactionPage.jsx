import React, { useEffect } from 'react'
import IncomeOverview from './component/IncomeOverview'
import { useState,useContext } from 'react'
import ExpensesOverview from './component/ExpensesOverview'
import AddTransactionModal from './component/AddTransactionModal'
import { UserContext } from './component/UserProvider'
import YearReview from './component/YearReview'
import EditTransaction from './component/EditTransaction'
import LoadingSpinner from './component/LoadingSpinner'
const TransactionPage = () => {
    const {user} = useContext(UserContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeComponent, setActiveComponent] = useState("EditTransaction"); // Default component to show
    const [fetchedTransactions, setFetchedTransactions] = useState([]);
    const [loading, setLoading] = useState(false); // Loading state
    const handleAddTransaction = async (transactionData) => {
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
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error adding transaction:", error);
        }
    };
    const getTransactions = async () => {
        setLoading(true); // Set loading to true when fetching transactions
        try {
            const response = await fetch("http://localhost:5174/api/transaction/user", { // Ensure the correct API endpoint
                method: "GET",
                headers: {"Content-Type": "application/json",'Authorization': `Bearer ${user.token}`}
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || "Failed to fetch transactions");
            }
            setFetchedTransactions(data)
            setLoading(false); // Set loading to false after fetching transactions
        } catch (error) {
            setLoading(false)
            console.error("Error fetching transactions:", error);
        }
    }
    useEffect(() => {
        if(!user) return; // If user is not logged in, do not fetch transactions
        getTransactions();
    },[user])
return (
    <>
        <h2 className='text-center'>Transactions</h2>
        <div className="flex justify-center items-center">
                <IncomeOverview />
                <ExpensesOverview />
                <div className='flex flex-col justify-center '>
                        <p className='text-center text-3xl underline m-2'>Transaction Menu</p>
                        <button className='btn-custom' onClick={() => setIsModalOpen(true)}>Add New Transaction</button>
                        <button className='btn-custom' onClick={() => setActiveComponent("EditTransaction")}>View / Edit Transaction</button>
                        <button className='btn-custom' onClick={() => setActiveComponent("YearReview")}>Year Review</button>
                </div>
        </div>
        {!loading ?( 
            <div className="flex justify-center m-4">
                    {activeComponent === "YearReview" && <YearReview />}
                    {activeComponent === "EditTransaction" && <EditTransaction fetchedTransactions={fetchedTransactions} />}
                    {!activeComponent && <p>Select a component to view</p>}
            </div>)
            :
            <LoadingSpinner/>
        }
            {isModalOpen && (
                    <AddTransactionModal 
                            onSubmit={handleAddTransaction} 
                            onClose={() => setIsModalOpen(false)} 
                    />
            )}
    </>
);
}

export default TransactionPage
