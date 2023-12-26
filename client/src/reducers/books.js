
const action = (books=[],action) => {
    switch(action.type)
    {
        case "FETCH_ALL":
            return action.payload;
        case "POST":
            return [...books , action.payload];
        case "UPDATE":
            return books.map((book) => book._id === action.payload._id ? action.payload : book);
        case "DELETE":
            return books.filter((book) => book._id !== action.payload);
        default:
            return books;
    }
}

export default action;