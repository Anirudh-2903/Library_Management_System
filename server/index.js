import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import { port } from './config.js';

const app = express()

app.get('/' , (req,res) => {
    res.send('Hello World')
})

app.listen( port , () => {
    console.log(`App listening on port ${port}`)
})