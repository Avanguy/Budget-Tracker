import React, { useState } from 'react';

const AddTransactionModal = ({ onSubmit, onClose }) => {
    const [transactionData, setTransactionData] = useState({
        amount: '12',
        category: 'Salary',
        type: 'income',
        date: new Date().toISOString().split('T')[0], // Default to today's date
        description: '',
        recurring: false,
        recurrenceFrequency: '' // New field for recurrence
    });

    const commonCategories = ["Salary", "Food", "Transport", "Entertainment", "Shopping", "Health", "Rent", "Utilities"];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTransactionData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(transactionData);
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black/80 z-50">
            <div className="bg-white p-6 rounded-md shadow-md w-96">
                <h2 className="text-lg font-bold mb-4 text-center">Add Transaction</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    
                    {/* Amount Input */}
                    <input type="number" name="amount" placeholder="Amount (£)" value={transactionData.amount} onChange={handleChange} required className="border p-2 rounded" />

                    {/* Category Dropdown with Custom Option */}
                    <select name="category" value={transactionData.category} onChange={handleChange} required className="border p-2 rounded">
                        <option value="" disabled>Select Category</option>
                        {commonCategories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                        <option value="custom">Other (Enter Manually)</option>
                    </select>

                    {/* Custom Category Input (only shown if "Other" is selected) */}
                    {transactionData.category === "custom" && (
                        <input type="text" name="category" placeholder="Enter Category" onChange={handleChange} required className="border p-2 rounded" />
                    )}

                    {/* Type Selector */}
                    <select name="type" value={transactionData.type} onChange={handleChange} className="border p-2 rounded">
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>

                    {/* Date Input with Default Value */}
                    <input type="date" name="date" value={transactionData.date} onChange={handleChange} className="border p-2 rounded" />

                    {/* Description Input */}
                    <input type="text" name="description" placeholder="Description" value={transactionData.description} onChange={handleChange} className="border p-2 rounded" />

                    {/* Recurring Transaction Checkbox */}
                    <label className="flex items-center gap-2">
                        <input type="checkbox" name="recurring" checked={transactionData.recurring} onChange={handleChange} />
                        Recurring Transaction
                    </label>

                    {/* Recurrence Frequency Dropdown (only shown if Recurring is checked) */}
                    {transactionData.recurring && (
                        <select name="recurrenceFrequency" value={transactionData.recurrenceFrequency} onChange={handleChange} required className="border p-2 rounded">
                            <option value="" disabled>Select Frequency</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                        </select>
                    )}

                    {/* Buttons */}
                    <div className="flex justify-between mt-4">
                        <button type="button" onClick={onClose} className="btn-custom-close">Cancel</button>
                        <button type="submit" className="btn-custom">Add</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTransactionModal;
