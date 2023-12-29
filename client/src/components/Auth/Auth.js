import React,{useState} from 'react'
import { Typography,Paper,Avatar,Grid,Container,Button } from '@mui/material';
import LockOutlined from '@mui/icons-material/LockOutlined';

import {useGoogleLogin} from '@react-oauth/google';
import {useDispatch} from 'react-redux';



import useStyles from './styles';
import Input from './Input';
import Icon from './icon';
import axios from 'axios';
import { AUTH } from '../../constants/actionTypes';
import { useNavigate } from 'react-router-dom';
import {signin,signup} from '../../actions/auth';

const initState = {firstName : '',lastName : '',email : '',password : '',confirmPassword : ''};

const Auth = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [ShowPassword, setShowPassword] = useState(false);
    const [isSignUp, setisSignUp] = useState(false);
    const [formData, setFormData] = useState(initState);
    const handleShowPassword = () =>  setShowPassword((prevShowPassword) => !prevShowPassword);
    const switchMode = () =>  {setisSignUp((previsSignUp) => !previsSignUp);  handleShowPassword();};



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


    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            const token = tokenResponse?.access_token;
          // fetching userinfo can be done on the client or the server
          const userInfo = await axios
            .get('https://www.googleapis.com/oauth2/v3/userinfo',
              { headers: { Authorization: `Bearer ${tokenResponse.access_token}` }});
          const result = userInfo?.data;
         // contains name, email & googleId(sub)
         try {
            dispatch({ type: AUTH ,data: { result, token }});
            navigate("/");
        } catch (error) {
            console.log(error);
        }
        },
        });




    const googleError = () => {
        console.log(console.error);
        console.log('Google Sign In was unsuccesful. Try again later.');
    };


  return (
    <Container  sx={{ marginTop: 1}} component="main" maxWidth="xs" >
        <Paper sx={{ marginTop: 6 , padding: 3}} className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar} sx={{ bgcolor: '#5AC8FA' , marginTop: 1}}>
                <LockOutlined />
            </Avatar>
            <Typography sx={{ margin: 1}} variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
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
                <Button  color="primary" variant="contained" fullWidth onClick={login} startIcon={<Icon  />} >Google Sign In</Button>
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
