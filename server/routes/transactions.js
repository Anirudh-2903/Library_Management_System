import express from 'express';
import {getAllTransactions,addTransaction} from '../controllers/transactions.js';

const router = express.Router();

router.post('/get-all-transactions', getAllTransactions);
router.post('/add-transaction', addTransaction);


export default router;