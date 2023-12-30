import { CREATE ,FETCH_BOOK, FETCH_ALL ,FETCH_BY_SEARCH, UPDATE , DELETE ,START_LOADING,END_LOADING } from '../constants/actionTypes';
import * as api from '../api/index';


//Action Creators
export const getBooks = (page) => async (dispatch) =>{
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchBooks(page);
        dispatch({ type: FETCH_ALL ,payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }

}

export const getBook = (id) => async (dispatch) =>{
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchBook(id);
        dispatch({ type: FETCH_BOOK ,payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }

}

export const getBooksBySearch = (searchQuery) => async (dispatch) =>{
    try {
        dispatch({ type: START_LOADING });
        const { data : { data }} = await api.fetchBooksBySearch(searchQuery);
        dispatch({ type: FETCH_BY_SEARCH ,payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }

}

export const createBook = (book) => async (dispatch) =>{
    try {
        dispatch({ type: START_LOADING });
        const {data} = await api.createBook(book);
        dispatch({ type: CREATE ,payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }

}

export const updateBook = (id,book) => async (dispatch) =>{
    try {
        const {data} = await api.updateBook(id,book);
        dispatch({ type: UPDATE ,payload: data });
    } catch (error) {
        console.log(error);
    }

}

export const deleteBook = (id) => async (dispatch) =>{
    try {
        await api.deleteBook(id);
        dispatch({ type: DELETE ,payload: id });
    } catch (error) {
        console.log(error);
    }

}