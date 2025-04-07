// TransactionContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { UserContext } from './UserProvider'; // Import UserContext to access user data
export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext); // Access user data from UserContext
  useEffect(() => {
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
            setTransactions(data)
            setLoading(false); // Set loading to false after fetching transactions
        } catch (error) {
            setLoading(false)
            console.error("Error fetching transactions:", error);
        }
    }

    getTransactions();
  }, [user]);

  return (
    <TransactionContext.Provider value={{ transactions, setTransactions, loading }}>
      {children}
    </TransactionContext.Provider>
  );
};
