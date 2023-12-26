import { makeStyles } from "@mui/styles" ;
import { spacing } from '@mui/system';


export default makeStyles(() => ({
  root: {
    '& .MuiTextField-root': {
      margin: spacing(1),
    },
  },
  paper: {
    padding: spacing(2),
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
  },
}));