import React from 'react'
import { useState } from 'react'
const testData = [
    {
        id: "1",
        amount: 1500,
        category: "Salary",
        type: "income",
        date: "2024-03-20",
        description: "March paycheck",
        recurring: true,
        recurrenceFrequency: "Monthly"
    },
    {
        id: "2",
        amount: 200,
        category: "Groceries",
        type: "expense",
        date: "2024-03-22",
        description: "Supermarket shopping",
        recurring: false
    },
    {
        id: "3",
        amount: 50,
        category: "Transport",
        type: "expense",
        date: "2024-03-23",
        description: "Train ticket",
        recurring: false
    },
    {
        id: "4",
        amount: 100,
        category: "Entertainment",
        type: "expense",
        date: "2024-03-25",
        description: "Concert ticket",
        recurring: false
    },
    {
        id: "5",
        amount: 60,
        category: "Subscription",
        type: "expense",
        date: "2024-03-01",
        description: "Netflix & Spotify",
        recurring: true,
        recurrenceFrequency: "Monthly"
    },
    {
        id: "6",
        amount: 200,
        category: "Freelance",
        type: "income",
        date: "2024-03-15",
        description: "Freelance project payment",
        recurring: false
    },
    {
        id: "7",
        amount: 500,
        category: "Investment",
        type: "income",
        date: "2024-03-10",
        description: "Stock dividends",
        recurring: false
    },
    {
        id: "8",
        amount: 75,
        category: "Health",
        type: "expense",
        date: "2024-03-18",
        description: "Doctor appointment",
        recurring: false
    }
];

const EditTransaction = () => {
    const [transactions, setTransactions] = useState(testData);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const sortTransactions = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
    
        const sortedData = [...transactions].sort((a, b) => {
            const valueA = key === "date" ? new Date(a[key]) 
                          : key === "amount" ? Number(a[key]) 
                          : a[key];
            const valueB = key === "date" ? new Date(b[key]) 
                          : key === "amount" ? Number(b[key]) 
                          : b[key];
    
            if (valueA < valueB) return direction === "asc" ? -1 : 1;
            if (valueA > valueB) return direction === "asc" ? 1 : -1;
            return 0;
        });
    
        setSortConfig({ key, direction });
        setTransactions(sortedData);
    };
    
return (
    <div>
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
            {transactions.map((transaction) => (
                <tr key={transaction.id} className="text-center">
                    <td className="border p-2">£{transaction.amount}</td>
                    <td className="border p-2">{transaction.category}</td>
                    <td
                        className={`border p-2 ${
                            transaction.type === "income" ? "bg-green-400" : "bg-red-400"
                        }`}
                    >
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
</div>
)
}

export default EditTransaction
