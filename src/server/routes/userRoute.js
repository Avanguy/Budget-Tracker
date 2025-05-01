
import express from "express";
const router = express.Router()
import {getUser,getUsers,addUser, updateUser,delUser,signUpUser,loginUser,demoUser} from "../controllers/userController.js"

router.post('/login',loginUser)
router.post('/signup',signUpUser)
router.post('/',addUser)
router.get('/demo',demoUser)
/* const requireAuth = require('../middleware/requireAuth') */
/* router.use(requireAuth) */
router.get('/:id',getUser)
router.get('/',getUsers)
router.delete('/:id',delUser)
router.put('/:id',updateUser)

export default router