import React,{useState} from 'react'
import { Typography,Paper,Avatar,Grid,Container,Button } from '@mui/material';
import LockOutlined from '@mui/icons-material/LockOutlined';

import {GoogleLogin} from '@react-oauth/google';
import {useDispatch} from 'react-redux';
import {jwtDecode} from 'jwt-decode';



import useStyles from './styles';
import Input from './Input';
import { AUTH } from '../../constants/actionTypes';
import { useNavigate , useLocation } from 'react-router-dom';
import {signin,signup} from '../../actions/auth';


const Auth = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    var isAdmin= location.state;
    if(isAdmin === null){isAdmin = false;}
    const initState = {firstName : '',lastName : '',email : '',password : '',confirmPassword : '',isAdmin: isAdmin};


    const [ShowPassword, setShowPassword] = useState(false);
    const [isSignUp, setisSignUp] = useState(false);
    const [formData, setFormData] = useState(initState);
    const handleShowPassword = () =>  setShowPassword((prevShowPassword) => !prevShowPassword);
    const switchMode = () =>  {setFormData(initState);setisSignUp((previsSignUp) => !previsSignUp);  setShowPassword(false);};



    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignUp) {
            dispatch(signup(formData,navigate));
        } else {
            dispatch(signin(formData,navigate));
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData , [e.target.name]: e.target.value});
    };


    const googleSuccess = async (res) => {

        const token = res?.credential;
        const result = jwtDecode(token);
        try {
          dispatch({ type: AUTH, data: { result, token } });
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      };




    const googleError = () => {
        alert('Google Sign In was unsuccesful. Try again later.');
    };


  return (
    <Container  sx={{ marginTop: 1}} component="main" maxWidth="xs" >
        <Paper sx={{ marginTop: 6 , padding: 3}} className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar} sx={{ bgcolor: '#5AC8FA' , marginTop: 1}}>
                <LockOutlined />
            </Avatar>
            <Typography sx={{ margin: 1}} variant="h5">{isAdmin ? isSignUp ? 'Admin Sign Up' : 'Admin Sign In' : isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
            <form  className={classes.form} onSubmit={handleSubmit}>
                <Grid sx={{ marginTop: 1 , marginBottom: 2}} container spacing={2}>
                    {
                        isSignUp && (
                            <>
                            <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                            <Input name="lastName" label="Last Name" handleChange={handleChange}  half />
                            </>
                        )
                    }
                            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                            <Input name="password" label="Password" handleChange={handleChange} type={ShowPassword ? "text" : "password" } handleShowPassword={handleShowPassword} />
                    {   isSignUp && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" />}
                </Grid>
                <Button sx={{ marginTop: 1 ,marginBottom: 2}} className={classes.submit} variant="contained" color="primary"  type="submit" fullWidth>{isSignUp ? 'Sign Up' : 'Sign In'}</Button>
                <GoogleLogin
                clientId="473031617486-dqhs62ch8hjdkt9nsg7i34894q439dps.apps.googleusercontent.com"
                render={(renderProps) => (
                <Button className={classes.googleButton}    variant="contained">
                Google Sign In
                </Button>
                )} onSuccess={googleSuccess} onFailure={googleError}/>
                <Grid sx={{ marginTop: 3 ,marginX: -1}} container  justify="flex-end">
                    <Grid  item>
                        <Button onClick={switchMode} fullWidth>{ isSignUp ? 'Already have an account ? Sign In' : "Don't have an account ? Sign Up"}</Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth;


