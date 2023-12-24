import mongoose from 'mongoose';

const bookSchema = mongoose.Schema(
    {
        title :
        {
            type : String,
            required : true,
        },
        bookID :
        {
            type : String,
            required : true,
        },
        author :
        {
            type : String,
            required : true,
        },
        published :
        {
            type : String,
            required : true,
        },
    },
    {
        timestamps : true,
    }
);

export const Book = mongoose.model('Book1',bookSchema);