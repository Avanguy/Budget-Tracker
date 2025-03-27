
import express from "express";
const router = express.Router()
import {getUser,getUsers,addUser, updateUser,delUser,signUpUser,loginUser,changePassword} from "../controllers/userController.js"

router.post('/login',loginUser)
router.post('/signup',signUpUser)
router.post('/',addUser)
/* const requireAuth = require('../middleware/requireAuth') */
/* router.use(requireAuth) */
router.post("/changePassword/:id",changePassword)
router.get('/:id',getUser)
router.get('/',getUsers)
router.delete('/:id',delUser)
router.put('/:id',updateUser)

export default router