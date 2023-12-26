import React from 'react';
import Book from './Book/Book';
import { useSelector } from 'react-redux';
import {Grid , CircularProgress} from '@mui/material';
import useStyles from './styles';

const Books = ({setcurrentId}) => {
    const books = useSelector((state) => state.books);
    const classes = useStyles();

    return (
        !books.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                { books.map((book) => (
                    <Grid key={book._id} item xs={12} sm={6}>
                        <Book book ={book} setcurrentId={setcurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    );
}

export default Books;
