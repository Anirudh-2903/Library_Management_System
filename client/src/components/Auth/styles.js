import { makeStyles } from '@mui/styles';


export default makeStyles(() => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  googleButton: {
    justifyContent: 'center',
  },
}));