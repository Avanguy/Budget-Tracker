import React, { useState, useEffect } from 'react';

const testData = [
    { id: "1", amount: 1500, category: "Salary", type: "income", date: "2024-03-20", description: "March paycheck", recurring: true, recurrenceFrequency: "Monthly" },
    { id: "2", amount: 200, category: "Groceries", type: "expense", date: "2024-03-22", description: "Supermarket shopping", recurring: false },
    { id: "3", amount: 50, category: "Transport", type: "expense", date: "2024-03-23", description: "Train ticket", recurring: false },
    { id: "4", amount: 100, category: "Entertainment", type: "expense", date: "2024-03-25", description: "Concert ticket", recurring: false },
    { id: "5", amount: 60, category: "Subscription", type: "expense", date: "2024-03-01", description: "Netflix & Spotify", recurring: true, recurrenceFrequency: "Monthly" },
    { id: "6", amount: 200, category: "Freelance", type: "income", date: "2024-03-15", description: "Freelance project payment", recurring: false },
    { id: "7", amount: 500, category: "Investment", type: "income", date: "2024-03-10", description: "Stock dividends", recurring: false },
    { id: "8", amount: 75, category: "Health", type: "expense", date: "2024-03-18", description: "Doctor appointment", recurring: false }
];

const EditTransaction = () => {
    const [transactions, setTransactions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const transactionsPerPage = 5;
    const [showRecurringOnly, setShowRecurringOnly] = useState(false);
    const filteredTransactions = showRecurringOnly 
    ? transactions.filter((t) => t.recurring) 
    : transactions;
    
    const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);
    const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" });

    // Sort transactions by default on mount
    useEffect(() => {
        const sortedData = [...testData].sort((a, b) => new Date(b.date) - new Date(a.date));
        setTransactions(sortedData);
    }, []);

    const sortTransactions = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        } else if (sortConfig.key === key && sortConfig.direction === "desc") {
            direction = "asc";
        }

        const sortedData = [...transactions].sort((a, b) => {
            const valueA = key === "date" ? new Date(a[key]) : key === "amount" ? Number(a[key]) : a[key];
            const valueB = key === "date" ? new Date(b[key]) : key === "amount" ? Number(b[key]) : b[key];

            if (valueA < valueB) return direction === "asc" ? -1 : 1;
            if (valueA > valueB) return direction === "asc" ? 1 : -1;
            return 0;
        });

        setSortConfig({ key, direction });
        setTransactions(sortedData);
    };

    const displayedTransactions = filteredTransactions.slice(
        (currentPage - 1) * transactionsPerPage,
        currentPage * transactionsPerPage
    );

    return (
        <div>
            <div className='mb-4 flex justify-center items-center'>
                <label className="inline-flex items-center cursor-pointer">
                    <span className="ms-3 ">All Transactions</span>
                    <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={showRecurringOnly} 
                        onChange={() => setShowRecurringOnly(!showRecurringOnly)}
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 
                                    dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full 
                                    rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
                                    after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white 
                                    after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all 
                                    dark:border-gray-600 peer-checked:bg-green-600 dark:peer-checked:bg-green-600 mr-2 ml-2">
                    </div>
                    <span className="ms-3">Recurring</span>
                </label>
            </div>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2 cursor-pointer" onClick={() => sortTransactions("amount")}>
                            Amount {sortConfig.key === "amount" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                        </th>
                        <th className="border p-2 cursor-pointer" onClick={() => sortTransactions("category")}>
                            Category {sortConfig.key === "category" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                        </th>
                        <th className="border p-2 cursor-pointer" onClick={() => sortTransactions("type")}>
                            Type {sortConfig.key === "type" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                        </th>
                        <th className="border p-2 cursor-pointer" onClick={() => sortTransactions("date")}>
                            Date {sortConfig.key === "date" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                        </th>
                        <th className="border p-2">Description</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedTransactions.map((transaction) => (
                        <tr key={transaction.id} className="text-center">
                            <td className="border p-2">£{transaction.amount}</td>
                            <td className="border p-2">{transaction.category}</td>
                            <td className={`border p-2 ${transaction.type === "income" ? "bg-green-400" : "bg-red-400"}`}>
                                {transaction.type}
                            </td>
                            <td className="border p-2">{new Date(transaction.date).toLocaleDateString()}</td>
                            <td className="border p-2">{transaction.description || "N/A"}</td>
                            <td className="border p-2">
                                <button className="btn-custom">Edit</button>
                                <button className="btn-custom-close">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <div className="flex flex-col items-center mt-4">
            <span className="text-sm text-green-700">
                Showing {Math.min((currentPage - 1) * transactionsPerPage + 1, filteredTransactions.length)} &nbsp;
                to {Math.min(currentPage * transactionsPerPage, filteredTransactions.length)} &nbsp;
                of {filteredTransactions.length} Entries
            </span>


                <div className="inline-flex mt-2">
                    <button 
                        disabled={currentPage === 1} 
                        onClick={() => setCurrentPage(prev => prev - 1)}
                        className={`btn-custom ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        Prev
                    </button>
                    <button 
                        disabled={currentPage === totalPages} 
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        className={`btn-custom ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditTransaction;
