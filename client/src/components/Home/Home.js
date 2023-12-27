import React , {useEffect,useState} from 'react';
import { Container,Grow,Grid } from '@mui/material';

import {useDispatch} from 'react-redux';
import {getBooks} from '../../actions/books';
import Books from '../Books/Books';
import Form from '../Form/Form';

const Home = () => {
    const [currentId,setcurrentId] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBooks());
    }, [currentId,dispatch]);
  return (
    <Grow in>
        <Container>
            <Grid container sx={{ flexDirection: { xs : 'column-reverse' , sm : 'row'} }} justifyContent="space-between" alignItems="stretch" spacing={3}>
                <Grid item xs={12} sm={7}>
                    <Books setcurrentId={setcurrentId} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Form currentId={currentId} setcurrentId={setcurrentId} />
                </Grid>
            </Grid>
        </Container>
    </Grow>
  )
}

export default Home;
