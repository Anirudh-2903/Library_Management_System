import React from 'react'
import { Typography,AppBar , Avatar , Toolbar,Button} from '@mui/material';
import {Link} from 'react-router-dom';
import useStyles from './styles';
import  libralogix  from '../../images/logo.png';



const NavBar = () => {
    const classes = useStyles();
    const user = null;
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
        <div  className={classes.brandContainer}>
            <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">LibraLogix</Typography>
            <img className={classes.image} src={libralogix} alt="libralogix" height="60"  />
        <Toolbar className={classes.toolbar} >
            {user ? (
            <div className={classes.profile}>
                 <Avatar alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                 <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                <Button variant="contained" className={classes.logout} color="secondary">Logout</Button>
            </div>
            ) : (
                <Button component={Link} to="/auth" variant="contained" color="primary" >Sign In</Button>
            )}
        </Toolbar>
        </div>
    </AppBar>
  )
}

export default NavBar;
