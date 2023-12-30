import React, { useEffect, useState } from 'react'
import { Typography,AppBar , Avatar , Toolbar,Button} from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import {Link , useNavigate,useLocation} from 'react-router-dom';
import useStyles from './styles';
import  libralogix  from '../../images/logo.png';
import { useDispatch } from 'react-redux';
import {jwtDecode} from 'jwt-decode';




const NavBar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const logout = () => {
        dispatch({type: 'LOGOUT'});
        navigate("/auth");
        setUser(null);
    };


    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
          }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
        <div  className={classes.brandContainer}>
            <Link  to="/books"><img className={classes.image} src={libralogix} alt="libralogix" height="60"  /> </Link>
        <Toolbar className={classes.toolbar} >
            {user?.result ? (
            <div className={classes.profile} >
                 <Avatar alt={user?.result.name} src={user?.result.picture} sx={{ bgcolor: deepPurple[500] }}>{user?.result.name.charAt(0)}</Avatar>
                 <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                <Button variant="contained" className={classes.logout} onClick={logout} color="secondary">Logout</Button>
            </div>
            ) : (
                <div className={classes.profile2} >
                <Button component={Link} to="/auth" state= {true} variant="contained" color="primary" >Admin Sign In</Button>
                <Button component={Link} to="/auth"  variant="contained" color="primary" >Sign In</Button>
                </div>
            )}
        </Toolbar>
        </div>
    </AppBar>
  )
}

export default NavBar;
