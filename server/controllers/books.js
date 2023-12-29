import Book  from '../models/book.js';
import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();


export const getBooks = async (req,res) => {
    try {
        const books =  await Book.find({});
        return res.status(200).json(books);
    } catch (error) {
        return res.status(500).send({message : error.message});
    }
};

export const createBook = async (req,res) => {

    const { title, description , selectedFile, creator, tags , available } = req.body;
    const newBook = new Book({ title, description, selectedFile, creator, tags ,available})
    try {
        await newBook.save();
        return res.status(201).json(newBook);
    } catch (error) {
        return res.status(409).send({message : error.message});
    }
}

export const updateBook = async (req,res) => {

    const { id: _id } = req.params;
    const book = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Book with that id');

    const updatedBook = await Book.findByIdAndUpdate(_id,{...book,_id},{new : true});
    res.json(updatedBook);

}

export const deleteBook = async (req,res) => {

    const { id  } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Book with that id');

    await Book.findByIdAndDelete(id);
    res.json({message : 'Post deleted successfully!!'});

}