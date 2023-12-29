import {combineReducers} from 'redux';
import books from './books';
import authReducer from './auth';


export const reducers = combineReducers({ books , authReducer });