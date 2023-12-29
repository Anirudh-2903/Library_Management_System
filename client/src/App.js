import React from 'react';
import { Container } from '@mui/material';
import {BrowserRouter,Routes, Route} from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App = () => {
    return(
    <GoogleOAuthProvider clientId="473031617486-dqhs62ch8hjdkt9nsg7i34894q439dps.apps.googleusercontent.com">
    <BrowserRouter>
        <Container maxWidth="lg">
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="auth/*" element={<Auth />}/>
            </Routes>
        </Container>
    </BrowserRouter>
</GoogleOAuthProvider>
    )
};

export default App;