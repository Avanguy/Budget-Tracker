
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
    const { userId } = req.body;
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
    const tokenId = req.Transaction.id;
    const delId = req.params.id;
    const isAdmin = req.Transaction.role === 'Admin';
    if (!isAdmin && tokenId !== delId) {
        return res.status(403).json({ error: 'You are not authorized' });
    }
  if (!mongoose.Types.ObjectId.isValid(delId)) {
    return res.status(400).json({error: 'No such Transactions'})
  }
  const Transaction = await transactionModel.findOneAndDelete({_id: delId})
  if(!Transaction) {
    return res.status(400).json({error: 'No such Transactions'})
  }
  res.status(200).json(Transaction)
}
//update Transaction
const updateTransaction = async (req,res) =>{
    const id = req.Transaction.id;
    const isAdmin = req.Transaction.role === 'Admin';
    if (!isAdmin && id !== req.params.id) {
        return res.status(403).json({ error: 'You are not authorized' });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such Transaction'})
    }
    const Transaction = await transactionModel.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    if (!Transaction) {
        return res.status(400).json({error: 'No such Transaction'})
    }
    res.status(200).json(Transaction)
}
  export {
    getAllTransactions,
    getTransaction,
    addTransaction,
    updateTransaction,
    delTransaction,
    getTransactionsForUser
  };
    