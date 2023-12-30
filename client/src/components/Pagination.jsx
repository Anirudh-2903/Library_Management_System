import React,{useEffect} from 'react';
import {Pagination,PaginationItem} from '@mui/material';
import useStyles from './styles';
import { Link } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import { getBooks } from '../actions/books';



const Paginate = ({page}) => {

    const {numberOfPages} = useSelector((state) => state.books);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        if(page) dispatch(getBooks(page));
    }, [page]);

    return (
        <Pagination
            classes={{ ul: classes.ul }}
            count={numberOfPages}
            page={Number(page) || 1}
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                <PaginationItem  { ...item} component={Link} to={`/books?page=${item.page}`} />
            )}
        />
    );
};


export default Paginate;