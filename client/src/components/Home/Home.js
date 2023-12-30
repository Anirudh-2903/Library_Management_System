import React , {useEffect,useState} from 'react';
import { useNavigate , useLocation } from 'react-router-dom';
import {useDispatch} from 'react-redux';


import {getBooks, getBooksBySearch} from '../../actions/books';
import Books from '../Books/Books';
import Form from '../Form/Form';
import Pagination from '../Pagination';
import useStyles from './styles';

import { Container,Grow,Grid , Paper,AppBar,TextField,Button} from '@mui/material';
import ChipInput from 'material-ui-chip-input';

function useQuery() {
    return new URLSearchParams(useLocation().search);
};

const Home = () => {
    const classes = useStyles();
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    const [currentId,setcurrentId] = useState(0);
    const dispatch = useDispatch();


    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            searchPost();
        }
    }

    const handleAdd = (tag) => {
        setTags([...tags, tag]);
    };

    const handleDelete = (tagToDelete) => {
        setTags(tags.filter((tag) => tag !== tagToDelete));
    };



    const searchPost = () => {
        if(search.trim() || tags){
            dispatch(getBooksBySearch({search,tags:tags.join(',')}));
            navigate(`/books/search?searchQuery=${search || 'none' }&tags=${tags.join(',')}`);
        } else {
            navigate("/");
        }
    };

  return (
    <Grow in>
        <Container maxWidth="xl" >
            <Grid container sx={{ flexDirection: { xs : 'column-reverse' , sm : 'row'} }} justifyContent="space-between" alignItems="stretch" spacing={3}>
                <Grid item xs={12} sm={6} md={9}>
                    <Books setcurrentId={setcurrentId} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <AppBar  className={classes.appBarSearch} position="static" color="inherit">
                        <TextField sx={{m: '10px'}} name="seach" variant="outlined" label="Search Books"
                        value={search} onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handleKeyPress} />
                        <ChipInput style={{margin: '10px'}} value={tags} onAdd={handleAdd} onDelete={handleDelete} label="Search Tags" variant="outlined" />
                        <Button onClick={searchPost} sx={{m: '10px'}} variant="contained" color="primary">Search</Button>
                    </AppBar>
                    <Form currentId={currentId} setcurrentId={setcurrentId} />
                    <Paper elevation={6} className={classes.pagination}  >
                        <Pagination page={page}   />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    </Grow>
  )
}



export default Home;
