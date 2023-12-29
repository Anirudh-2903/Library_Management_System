import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 50px',
      },
      heading: {
        color: 'rgba(0,183,255, 1)',
        textDecoration: 'none',
      },
      image: {
        marginLeft: '15px',
      },
      toolbar: {
        display: 'flex',
        width: '100%',
        justifyContent: 'flex-end',
      },
      profile: {
        display: 'flex',
        justifyContent: 'space-evenly',
        width: '400px',
      },
      userName: {
        display: 'flex',
        alignItems: 'center',
      },
      brandContainer: {
        display: 'flex',
        alignItems: 'center',
        width:'100%',
      },
}));