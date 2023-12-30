import { Card , CardActions , CardMedia , CardContent , Button , Typography, ButtonBase } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import React from 'react';
import moment from 'moment';
import useStyles from './styles';
import {useDispatch} from 'react-redux';
import { getBook,deleteBook } from '../../../actions/books';
import { useNavigate } from 'react-router-dom';


const Book = ({ book , setcurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));
    const isLoggedInAsAdmin = user?.result?.isAdmin;
    const openBook = () => {
        navigate(`/books/${book._id}`);
    };



    return (
        <Card className={classes.card} raised elevation={6} onClick={openBook} >
            <CardMedia className={classes.media} image={book.selectedFile} title={book.title}/>
            <div className={classes.overlay}>
                <Typography variant="h6">{book.author}</Typography>
                <Typography variant="body2">Uploaded {moment(book.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                {isLoggedInAsAdmin && <Button style={{color : 'white'}} size="small" onClick={() => setcurrentId(book._id)}>
                    <MoreHorizIcon fontSize="medium"  />
                </Button>}
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{book.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} gutterBottom variant="h5" component="h2">{book.title}</Typography>
            <CardContent>
             <Typography variant="body2" color="textSecondary" component="p">{book.description}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions} >
            {isLoggedInAsAdmin && <Button color ="primary" size="small" onClick={() => dispatch(deleteBook(book._id))} ><DeleteIcon fontSize="small"  /> Delete</Button>}
            <Typography variant="body2" color="black" component="p" paddingRight={2}>Available : {book.available}</Typography>
            </CardActions>
        </Card>
    );
}

export default Book;
