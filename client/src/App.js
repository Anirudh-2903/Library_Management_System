import {useEffect,useState} from 'react';
import { Container,AppBar,Grow,Grid } from '@mui/material';
import  libralogix  from './images/logo.png';
import {useDispatch} from 'react-redux';
import {getBooks} from './actions/books';
import Books from './components/Books/Books';
import Form from './components/Form/Form';
import useStyles from './styles';

const App = () => {
    const [currentId,setcurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBooks());
    }, [currentId,dispatch]);

    return (
        <Container maxWidth="lg">
            <AppBar className={classes.appBar} position="static" color="inherit">
                <img className={classes.image} src={libralogix} alt="libralogix" height="60" />
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Books setcurrentId={setcurrentId} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setcurrentId={setcurrentId} />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    );
};

export default App;