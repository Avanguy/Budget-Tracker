
import express from "express";
const router = express.Router()
import {getTransaction,getAllTransactions,addTransaction, updateTransaction,delTransaction} from "../controllers/transactionController.js"
import requireAuth from '../requireAuth.js'

router.use(requireAuth)
router.post('/',addTransaction)
router.get('/:id',getTransaction)
router.get('/',getAllTransactions)
router.delete('/:id',delTransaction)
router.put('/:id',updateTransaction)

export default router