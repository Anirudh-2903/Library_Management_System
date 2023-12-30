import express from 'express';
import {getBook,getBooks,getBooksBySearch ,createBook,updateBook,deleteBook} from '../controllers/books.js';
const router = express.Router();

import {auth} from '../middleware/auth.js';


router.get('/', getBooks);
router.get('/:id', getBook);
router.get('/search', getBooksBySearch);
// router.get('/:id', getBook);


router.post('/',auth , createBook);
router.patch('/:id', auth ,updateBook);
router.delete('/:id',auth , deleteBook);

export default router;