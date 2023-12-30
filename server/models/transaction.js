import mongoose from "mongoose"

const BookTransactionSchema = new mongoose.Schema({

    bookName: {
        type: String,
        require: true
    },
    borrowerName: {
        type: String,
        require: true
    },
    transactionType: { //Issue or Reservation
        type: String,
        require: true,
    },
    returnDate: {
        type: String
    },
    transactionStatus: {
        type: String,
        default: "Active"
    }
},
    {
        timestamps: true
    }
);

export default mongoose.model("BookTransaction", BookTransactionSchema)