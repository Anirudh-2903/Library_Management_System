import React , {useEffect} from 'react';
import {Paper,Typography,Divider,CircularProgress} from '@mui/material';
import { useDispatch , useSelector } from 'react-redux';
import { useNavigate,useParams } from 'react-router-dom';
import moment from 'moment';
import { getBook } from '../../actions/books';


import useStyles from './styles';


const BookDetails = () => {

  const {book,books,isLoading} = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getBook(id));
  }, [id]);

  if (!book) return null;

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }
  return (
    <Paper  style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card} sx={{ flexDirection: { sm : 'column'} }}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{book.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{book.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{book.description}</Typography>
          <Typography variant="h6">Author : {book.author}</Typography>
          <Typography variant="body1">Uploaded {moment(book.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} sx={{ marginLeft: { sm : 0} }} src={book.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={book.title} />
        </div>
      </div>
    </Paper>
  );
};

export default BookDetails;
