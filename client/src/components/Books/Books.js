import React from 'react';
import Book from './Book/Book';
import { useSelector } from 'react-redux';
import {Grid , CircularProgress} from '@mui/material';
import useStyles from './styles';

const Books = ({setcurrentId}) => {
    const {books , isLoading } = useSelector((state) => state.books);
    const classes = useStyles();
    if(!books?.length && !isLoading) return 'No Books Found.';

    return (
        isLoading ? <CircularProgress  /> : (
            <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
                { books?.map((book) => (
                    <Grid key={book._id} item xs={12} sm={12} md={6} lg={3}>
                        <Book book ={book} setcurrentId={setcurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    );
}

export default Books;
