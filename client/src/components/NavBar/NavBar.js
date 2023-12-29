import React, { useEffect, useState } from 'react'
import { Typography,AppBar , Avatar , Toolbar,Button} from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import {Link , useNavigate,useLocation} from 'react-router-dom';
import useStyles from './styles';
import  libralogix  from '../../images/logo.png';
import { useDispatch } from 'react-redux';



const NavBar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    console.log(user);

    const logout = () => {
        dispatch({type: 'LOGOUT'});
        navigate("/");
        setUser(null);
    };


    useEffect(() => {
        const token = user?.token;
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
        <div  className={classes.brandContainer}>
            <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">LibraLogix</Typography>
            <img className={classes.image} src={libralogix} alt="libralogix" height="60"  />
        <Toolbar className={classes.toolbar} >
            {user?.result ? (
            <div className={classes.profile} >
                 <Avatar alt={user?.result.name} src={user?.result.picture} sx={{ bgcolor: deepPurple[500] }}>{user?.result.name.charAt(0)}</Avatar>
                 <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                <Button variant="contained" className={classes.logout} onClick={logout} color="secondary">Logout</Button>
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
