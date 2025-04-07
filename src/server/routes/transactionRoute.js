
import express from "express";
const router = express.Router()
import {getTransaction,getAllTransactions,addTransaction, updateTransaction,delTransaction,getTransactionsForUser} from "../controllers/transactionController.js"
import requireAuth from '../requireAuth.js'

router.use(requireAuth)
router.post('/',addTransaction)
router.get('/user',getTransactionsForUser)
router.get('/:id',getTransaction)
router.get('/',getAllTransactions)
router.delete('/:id',delTransaction)
router.put('/',updateTransaction)

export default router