import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import { Book } from './models/book.js';
import { port , mongoDBURL } from './config.js';


const app = express()

app.get('/' , (req,res) => {
    console.log(req)
    return res.status(234).send('Welcome to the Project')
})

// create a new book
app.post('/books',(req,res) => {
    try {
        if (
            !req.body.title ||
            !req.body.bookID ||
            !req.body.author ||
            !req.body.published  ) {

                return res.status(400).send({
                    message : 'Send all required fields : title , bookID , author , published',
                });
        }
        const newBook = {
            title : req.body.title,
            bookID : req.body.bookID,
            author : req.body.author,
            published : req.body.published,
        };
        const book =  Book.create(newBook);
        return res.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        return res.status(500).senc({message : error.message});
    }
});

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen( port , () => {
            console.log(`App listening on port : ${port}`)
        });
    })
    .catch((error) => {
        console.log(error);
    });