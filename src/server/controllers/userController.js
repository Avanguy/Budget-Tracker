import userModel from "../models/userModel.js";
import mongoose from "mongoose";
import transactionModel from '../models/transactionModel.js'; // or correct path to your Transaction model
import jwt from "jsonwebtoken";

const createToken = (_id) =>{
    return jwt.sign({_id}, process.env.SECRET,{ expiresIn: '3d' })
}
//get users
const getUsers = async (req,res) =>{
    const users = await userModel.find({})
    res.status(200).json(users)
}
//get user
const getUser = async (req,res) =>{
    const id = req.user.id;
    const isAdmin = req.user.role === 'Admin';
    if (!isAdmin && id !== req.params.id) {
        return res.status(403).json({ error: 'You are not authorized' });
    }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such user'})
  }
  const user = await userModel.findById(id)
  if (!user) {
    return res.status(404).json({error: 'No such user'})
  }
  res.status(200).json(user)
}
const demoUser = async (req, res) => {
  try {
    const user = await userModel.findOne({ username: 'demo' });

    if (!user) {
      return res.status(404).json({ error: 'Demo user not found' });
    }
      const now = new Date();
      const lastReset = user.lastResetAt || new Date(0); // default: long ago
      const hoursSince = (now - lastReset) / (1000 * 60 * 60);
  
      if (hoursSince >= 24) {
        // Reset transactions
        await transactionModel.deleteMany({ userId: user._id });
  
        await transactionModel.insertMany([
          {
            userId: user._id,
            amount: 1200,
            category: 'Salary',
            type: 'income',
            date: new Date(),
            description: 'Monthly salary',
          },
          {
            userId: user._id,
            amount: 150,
            category: 'Groceries',
            type: 'expense',
            date: new Date(),
            description: 'Weekly groceries',
          },
        ]);
  
        user.lastResetAt = now;
        await user.save();
      }
      const token = createToken(user._id)
    res.status(200).json({user,token});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

//add users
const addUser = async (req,res)=>{
    const {username,password} = req.body
    try{
        const user = await userModel.create({username,password})
        res.status(200).json(user)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}
//delete user
const delUser = async (req,res) =>{
    const tokenId = req.user.id;
    const delId = req.params.id;
    const isAdmin = req.user.role === 'Admin';
    if (!isAdmin && tokenId !== delId) {
        return res.status(403).json({ error: 'You are not authorized' });
    }
  if (!mongoose.Types.ObjectId.isValid(delId)) {
    return res.status(400).json({error: 'No such users'})
  }
  const user = await userModel.findOneAndDelete({_id: delId})
  if(!user) {
    return res.status(400).json({error: 'No such users'})
  }
  res.status(200).json(user)
}
//update user
const updateUser = async (req,res) =>{
    const id = req.user.id;
    const isAdmin = req.user.role === 'Admin';
    if (!isAdmin && id !== req.params.id) {
        return res.status(403).json({ error: 'You are not authorized' });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such user'})
    }
    const user = await userModel.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    if (!user) {
        return res.status(400).json({error: 'No such user'})
    }
    res.status(200).json(user)
}
const loginUser = async (req,res) =>{
    const {username,password} = req.body
    try {
        const user = await userModel.login(username,password)
        const token = createToken(user._id)
        res.status(200).json({username,token})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
const signUpUser = async (req,res) =>{
    const {username,password} = req.body
    try {
        const user = await userModel.signup(username,password)
        const token = createToken(user._id)
        res.status(200).json({userId: user._id,token})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}  
  export {
    getUsers,
    getUser,
    addUser,
    updateUser,
    delUser,
    loginUser,
    signUpUser,
    demoUser
  };
    