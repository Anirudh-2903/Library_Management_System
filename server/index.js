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

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.CONNECTION_URL);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

  connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
})


