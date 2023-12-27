import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
  paper: {
    marginTop: spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: spacing(2),
  },
  root: {
    '& .MuiTextField-root': {
      margin: spacing(1),
    },
  },
  avatar: {
    margin: spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: spacing(3),
  },
  submit: {
    margin: spacing(3, 0, 2),
  },
  googleButton: {
    marginBottom: spacing(2),
  },
}));