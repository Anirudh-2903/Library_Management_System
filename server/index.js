import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bookRoutes from './routes/books.js';
import userRoutes from './routes/users.js';



const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use('/books',bookRoutes);
app.use('/user',userRoutes);

app.get('/' , (req,res) => {
    console.log(req)
    return res.status(234).send('Welcome to the Project')
})

const PORT = process.env.PORT;

mongoose
    .connect(process.env.CONNECTION_URL)
    .then(() => {
        app.listen( PORT , () => {
            console.log(`Server running on port : ${PORT}`)
        });
    })
    .catch((error) => {
        console.log(error);
    });


