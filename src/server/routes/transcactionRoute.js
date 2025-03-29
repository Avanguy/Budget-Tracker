
import express from "express";
const router = express.Router()
import {getTransaction,getTransactions,addTransaction, updateTransaction,delTransaction} from "../controllers/transactionController.js"

router.post('/',addTransaction)
/* const requireAuth = require('../middleware/requireAuth') */
/* router.use(requireAuth) */
router.get('/:id',getTransaction)
router.get('/',getTransactions)
router.delete('/:id',delTransaction)
router.put('/:id',updateTransaction)

export default router