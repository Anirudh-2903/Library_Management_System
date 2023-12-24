import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import { Book } from './models/book.js';
import { port , mongoDBURL } from './config.js';


const app = express()

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.get('/' , (req,res) => {
    console.log(req)
    return res.status(234).send('Welcome to the Project')
})

// create a new book
app.post('/books', async (req,res) => {
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
        const book =  await Book.create(newBook);
        return res.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({message : error.message});
    }
});
// get all books
app.get('/books', async (req,res) => {
    try {
        const books =  await Book.find({});
        return res.status(200).json({
            count : books.length,
            data : books
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({message : error.message});
    }
});
// get book by ID
app.get('/books/:id', async (req,res) => {
    try {
        const { id } = req.params;
        const book =  await Book.findById({id});
        return res.status(200).json({book});
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({message : error.message});
    }
});
// update book by ID


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