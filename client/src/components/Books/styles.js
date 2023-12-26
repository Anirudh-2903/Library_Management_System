import { makeStyles } from '@mui/styles';
import { spacing } from '@mui/system';


export default makeStyles(() => ({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  smMargin: {
    margin: spacing(1),
  },
  actionDiv: {
    textAlign: 'center',
  },
}));