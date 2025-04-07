
import mongoose from "mongoose";
import transactionModel from "../models/transactionModel.js";
//get Transactions
const getAllTransactions = async (req,res) =>{
    const Transactions = await transactionModel.find({})
    res.status(200).json(Transactions)
}
//get Transaction
const getTransaction = async (req,res) =>{
    const { transactionId } = req.body;
    /* const isAdmin = req.Transaction.role === 'Admin';
    if (!isAdmin && id !== req.params.id) {
        return res.status(403).json({ error: 'You are not authorized' });
    } */

  if (!mongoose.Types.ObjectId.isValid(transactionId)) {
    return res.status(404).json({error: 'No such Transaction'})
  }

  const Transaction = await transactionModel.findById(transactionId)
  if (!Transaction) {
    return res.status(404).json({error: 'No such Transaction'})
  }
  res.status(200).json(Transaction)
}
const getTransactionsForUser = async (req,res) =>{
    const userId = req.user.id;
    /* const isAdmin = req.Transaction.role === 'Admin';
    if (!isAdmin && id !== req.params.id) {
        return res.status(403).json({ error: 'You are not authorized' });
    } */

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({error: 'No such user'})
  }
  
  const userTransactions = await transactionModel.find({userId})
  if (userTransactions.length === 0) {
    return res.status(404).json({ error: "No transactions found for this user" });
  }
  res.status(200).json(userTransactions)
}
//add Transactions
const addTransaction = async (req,res)=>{
    const {amount,category,type,date,description,recurring} = req.body
    const userId = req.user;
    try{
        const Transaction = await transactionModel.create({userId,amount,category,type,date,description,recurring})
        res.status(200).json(Transaction)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}
//delete Transaction
const delTransaction = async (req,res) =>{
  try {
    const delId = req.params.id;
    const Transaction = await transactionModel.findOneAndDelete({_id: delId})
    if(!Transaction) {
      return res.status(400).json({error: 'No such Transactions'})
    }
    res.status(200).json(Transaction)
  } catch (error) {
    res.status(500).json({error})
  }
}
//update Transaction
const updateTransaction = async (req,res) =>{
  try {
    const { _id,amount, category, type, date, description, recurring, recurrenceFrequency } = req.body; // Get the updated transaction data from the request body
    console.log(_id)
    // Find the transaction by its _id and update it with the new data
    const transaction = await transactionModel.findByIdAndUpdate(
      _id,
      {
        amount,
        category,
        type,
        date,
        description,
        recurring,
        recurrenceFrequency,
      },
      { new: true } // This option returns the updated document
    );

    // If the transaction is not found, return a 404 error
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    // Return the updated transaction
    res.status(200).json(transaction);
  } catch (error) {
    console.error("Error updating transaction:", error);
    res.status(500).json({ error: 'Failed to update transaction' });
  }
};
  export {
    getAllTransactions,
    getTransaction,
    addTransaction,
    updateTransaction,
    delTransaction,
    getTransactionsForUser
  };
    