import React,{useState,useEffect} from 'react';
import { TextField , Paper , Button , Typography , FormControlLabel , Radio , RadioGroup , FormControl , FormLabel } from '@mui/material';
import useStyles from './styles';
import FileBase from 'react-file-base64';
import {useDispatch , useSelector} from 'react-redux';
import { createBook , updateBook} from '../../actions/books';

const Form = ({currentId,setcurrentId}) => {
    const classes = useStyles();
    const [bookData,setbookData] = useState({creator:'' , title :'' , description:'' , tags:'' , selectedFile: '',available: ''});
    const book = useSelector((state) => currentId ? state.books.find((b) => b._id === currentId) : null);
    const dispatch = useDispatch();

    useEffect(() => {
        if(book) setbookData(book);
    }, [book]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(currentId){
            dispatch(updateBook(currentId,bookData));
        }else{
            dispatch(createBook(bookData));
        }
        clear();
    }
    const clear = () => {
        setcurrentId(null);
        setbookData({ creator: '', title: '', description: '', tags: '', selectedFile: '',available: '' });
    }
    return (
        <Paper className={classes.paper}>
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form} `} onSubmit={handleSubmit}>
            <Typography variant="h6">{currentId ? 'Editing the ' : 'Adding a '} Book</Typography>
            <TextField name="creator" variant="outlined" label="Creator" fullWidth value={bookData.creator} onChange={(e) => setbookData({ ...bookData,creator:e.target.value})}/>
            <TextField name="title" variant="outlined" label="Title" fullWidth value={bookData.title} onChange={(e) => setbookData({ ...bookData,title:e.target.value})}/>
            <TextField name="description" variant="outlined" label="Description" fullWidth value={bookData.description} onChange={(e) => setbookData({ ...bookData,description:e.target.value})}/>
            <TextField name="tags" variant="outlined" label="Tags" fullWidth value={bookData.tags} onChange={(e) => setbookData({ ...bookData,tags:e.target.value})}/>
            <FormControl margin='dense'  >
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
            <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({base64}) => setbookData({ ...bookData,selectedFile: base64})}/></div>
            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
            <Button  variant="contained" color="secondary" size="medium" onClick={clear} fullWidth>Clear</Button>
        </form>
        </Paper>
        );
}

export default Form;