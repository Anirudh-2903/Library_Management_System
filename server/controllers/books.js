import Book  from '../models/book.js';
import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();


export const getBooks = async (req,res) => {
    const { page } = req.query;
    try {
        const LIMIT = 8;
        const startIndex = (Number(page)-1)* LIMIT;
        const total = await Book.countDocuments({});
        const books =  await Book.find().sort({ _id: -1}).limit(LIMIT).skip(startIndex);
        return res.status(200).json({data : books , currentPage: Number(page) , numberOfPages: Math.ceil(total/LIMIT)});
    } catch (error) {
        return res.status(500).send({message : error.message});
    }
};

export const getBook = async (req,res) => {
    const { id } = req.params;
    try{
        const book = await Book.findById(id);
        return res.status(200).json(book);
    } catch(error){
        return res.status(404).send({message : error.message});
    }
};


export const getBooksBySearch = async (req, res) => {
    const { searchQuery , tags } = req.query;

    try {
        const title = new RegExp(searchQuery , "i");
        const books = await Book.find({ $or : [{title},{tags: { $in: tags.split(',')}}]})
        res.status(200).json({data : books});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createBook = async (req,res) => {

    const post = req.body;
    const newBook = new Book({ ...post , creator : req.userId , createdAt : new Date().toISOString()})
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