import userModel from "../models/userModel.js";
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
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
    const changePassword = async (req, res) => {
        const { _id, currentPassword, newPassword } = req.body;
      
        try {
          // Find the user by ID
          let user = await userModel.findOne({ _id });
      
          // Check if user exists
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
      
          // Validate the current password
          const isMatch =  bcrypt.compare(currentPassword, user.password);
          if (!isMatch) {
            return res.status(400).json({ error: 'Current password is incorrect' });
          }
      
          // Validate the new password
          if (!validator.isStrongPassword(newPassword)) {
            return res.status(400).json({ error: 'New password is not strong enough' });
          }
      
          // Hash the new password
          const salt = await bcrypt.genSalt(10);
          const hash = await bcrypt.hash(newPassword, salt);
      
          // Update the user's password
          user.password = hash;
          await user.save();
      
          // Send success response
          res.status(200).json({ message: 'Password changed successfully' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'An error occurred while changing the password' });
        }
      };
  
  export {
    getUsers,
    getUser,
    addUser,
    updateUser,
    delUser,
    loginUser,
    changePassword,
    signUpUser
  };
    