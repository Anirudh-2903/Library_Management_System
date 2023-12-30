import React,{useState,useEffect} from 'react';
import { TextField , Paper , Button , Typography , FormControlLabel , Radio , RadioGroup , FormControl , FormLabel } from '@mui/material';
import useStyles from './styles';
import FileBase from 'react-file-base64';
import {useDispatch , useSelector} from 'react-redux';
import { createBook , updateBook} from '../../actions/books';

const Form = ({currentId,setcurrentId}) => {
    const classes = useStyles();
    const [bookData,setbookData] = useState({title :'' ,  author: '',description:'' , tags:'' , selectedFile: '',available: ''});
    const book = useSelector((state) => currentId ? state.books.find((b) => b._id === currentId) : null);
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if(book) setbookData(book);
    }, [book]);

    const clear = () => {
        setcurrentId(0);
        setbookData({ title: '', author: '', description: '', tags: '', selectedFile: '',available: '' });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentId === 0) {
            dispatch(createBook({ ...bookData, addedBy: user?.result?.name }));
          } else {
            dispatch(updateBook(currentId, { ...bookData, addedBy: user?.result?.name }));
          }
          clear();
    }

    if (!user?.result?.isAdmin) {
        return (
          <Paper className={classes.paper}>
            <Typography variant="h6" align="center">
              Please Sign In as Admin to create , edit or delete books
            </Typography>
          </Paper>
        );
      }

    return (
        <Paper sx={{ margin: 1 , padding: 2}} className={classes.paper} elevation={6}>
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form} `} onSubmit={handleSubmit}>
            <Typography sx={{ margin: 0.5 }} variant="h6">For Admin Use Only</Typography>
            <Typography sx={{ margin: 0.5 }} variant="h6">{currentId ? 'Editing the ' : 'Adding a '} Book</Typography>
            <TextField sx={{ margin: 0.5 }} name="title" variant="outlined" label="Title" fullWidth value={bookData.title} onChange={(e) => setbookData({ ...bookData,title:e.target.value})}/>
            <TextField sx={{ margin: 0.5 }}  name="author" variant="outlined" label="Author" fullWidth value={bookData.author} onChange={(e) => setbookData({ ...bookData, author: e.target.value })} />
            <TextField sx={{ margin: 0.5 }} name="description" variant="outlined" label="Description" fullWidth value={bookData.description} onChange={(e) => setbookData({ ...bookData,description:e.target.value})}/>
            <TextField sx={{ margin: 0.5 }} name="tags" variant="outlined" label="Tags" fullWidth value={bookData.tags} onChange={(e) => setbookData({ ...bookData,tags:e.target.value.split(',')})}/>
            <FormControl sx={{ margin: 0.5 }} margin='dense'  >
                <FormLabel id="availability-status" className={`${classes.root} ${classes.form} `}>Available for issue : </FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="availability-status"
                        name="available"
                        value={bookData.available}
                        onChange={(e) => setbookData({ ...bookData,available:e.target.value})}>
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
                </FormControl>
            <div  className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({base64}) => setbookData({ ...bookData,selectedFile: base64})}/></div>
            <Button sx={{ marginBottom: 1}}  variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
            <Button  variant="contained" color="secondary" size="medium" onClick={clear} fullWidth>Clear</Button>
        </form>
        </Paper>
        );
}

export default Form;

