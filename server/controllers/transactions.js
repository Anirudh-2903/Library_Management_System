import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();
import BookTransaction from '../models/transaction.js';

export const getAllTransactions = async (req,res) => {
    const {email,password} = req.body;
    try {
        const existingUser =  await User.findOne({email});
        if(!existingUser) return res.status(404).json({message : "User doesn't exist."});
        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password);
        if(!isPasswordCorrect) return res.status(400).json({message : "Invalid Credentials."});

        const token = jwt.sign({email : existingUser.email , id : existingUser._id} , 'test' , {expiresIn: "1h"});
        res.status(200).json({result: existingUser, token});
    } catch (error) {
        return res.status(500).send({message : "Something went wrong."});
    }
}

export const addTransaction = async (req,res) => {
    const {email,password,confirmPassword,firstName,lastName,isAdmin} = req.body;

    try {
        const existingUser =  await User.findOne({email});
        if(existingUser) return res.status(400).json({message : "User already exists."});
        if(password !== confirmPassword) return res.status(400).json({message : "Passwords don't match."});

        const hashedPassword = await bcrypt.hash(password,12);
        const result = await User.create({ email , password: hashedPassword , name: `${firstName} ${lastName}` ,isAdmin});
        const token = jwt.sign({email : result.email , id : result._id} , 'test' , {expiresIn: "1h"});
        res.status(200).json({result, token});
    } catch (error) {
         return res.status(500).send(error.message);
    }
}