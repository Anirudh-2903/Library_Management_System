import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import { port , mongoDBURL } from './config.js';

import bookRoutes from './routes/books.js';



const app = express()

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/books',bookRoutes);

app.get('/' , (req,res) => {
    console.log(req)
    return res.status(234).send('Welcome to the Project')
})

// create a new book

// get all books

// get book by ID

// update book by ID


mongoose
    .connect(mongoDBURL , { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        app.listen( port , () => {
            console.log(`Server running on port : ${port}`)
        });
    })
    .catch((error) => {
        console.log(error);
    });

