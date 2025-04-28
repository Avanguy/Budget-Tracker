import React, { useEffect } from 'react'
import IncomeOverview from './component/IncomeOverview'
import { useState,useContext } from 'react'
import ExpensesOverview from './component/ExpensesOverview'
import AddTransactionModal from './component/AddTransactionModal'
import { UserContext } from './component/UserProvider'
import YearReview from './component/YearReview'
import EditTransaction from './component/EditTransaction'
import { TransactionContext } from './component/TransactionProvider'
import LoadingSpinner from './component/LoadingSpinner'
const TransactionPage = () => {
    const {transactions, setTransactions, loading} = useContext(TransactionContext);
    const {user} = useContext(UserContext);
    const [selectedMonth, setSelectedMonth] = useState(() => {
        // Default to current month in format YYYY-MM
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
      });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeComponent, setActiveComponent] = useState("EditTransaction"); // Default component to show
    const [fetchedTransactions, setFetchedTransactions] = useState([]);
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
            setTransactions((prevTransactions) => [...prevTransactions, data])
            
        } catch (error) {
            console.error("Error adding transaction:", error);
        }
    };
    useEffect(() => {
        if(!user) return; // If user is not logged in, do not fetch transactions
        setFetchedTransactions(transactions); // Set the fetched transactions to the state
    },[transactions,user])
return (
    <>
        <div className="flex flex-wrap justify-center">
            <div className="w-[300px] min-h-[300px] max-h-[400px] overflow-auto bg-gray-50 rounded-lg shadow-md p-4">
                <IncomeOverview selectedMonth={selectedMonth} />
            </div>

            <div className="w-[300px] max-h-[400px] overflow-auto bg-gray-50 rounded-lg shadow-md p-4">
                <ExpensesOverview selectedMonth={selectedMonth} />
            </div>

            <div className="w-[300px] h-[400px] bg-gray-50 rounded-lg shadow-md p-4 flex flex-col justify-start items-center">
                <p className="text-center text-2xl font-semibold underline mb-4">Transaction Menu</p>
                
                <button className="btn-custom w-full h-[40px] mb-2" onClick={() => setIsModalOpen(true)}>
                    Add New Transaction
                </button>
                
                <button className="btn-custom w-full h-[40px] mb-2" onClick={() => setActiveComponent('EditTransaction')}>
                    View / Edit Transaction
                </button>
                
                <button className="btn-custom w-full h-[40px]" onClick={() => setActiveComponent('YearReview')}>
                    Year Review
                </button>
            </div>

        </div>


        {!loading ?( 
            <div className="flex justify-center m-4">
                    {activeComponent === "YearReview" && <YearReview />}
                    {activeComponent === "EditTransaction" && <EditTransaction setPageSelectedMonth = {setSelectedMonth} setTransactions={setTransactions} fetchedTransactions={fetchedTransactions} user={user}/>}
                    {!activeComponent && <p>Select a component to view</p>}
            </div>)
            :
            <>
                <LoadingSpinner/>
                <p className='text-center'>Loading data...</p>
            </>
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
