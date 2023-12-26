import mongoose from 'mongoose';

const bookSchema = mongoose.Schema(
    {
        title :
        {
            type : String,
            required : true,
        },
        description :
        {
            type: String,
            required: true
        },
        creator :
        {
            type : String,
            required : true,
        },
        tags :
        {
            type : [String],
            required : true,
        },
        selectedFile :
        {
            type : String,
            required : true,
        },
        createdAt :
        {
            type : Date,
            default : new Date()
        },
        available :
        {
            type : String,
            required : true,
        },
    }
);

const Book = mongoose.model('Book',bookSchema);

export default Book;
