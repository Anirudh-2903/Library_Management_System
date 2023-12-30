import React from 'react';
import { Container } from '@mui/material';
import {BrowserRouter,Routes, Route ,  Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import BookDetails from './components/BookDetails/BookDetails';

const App = () => {

    const user = JSON.parse(localStorage.getItem('profile'));


    return(
    <GoogleOAuthProvider clientId="473031617486-dqhs62ch8hjdkt9nsg7i34894q439dps.apps.googleusercontent.com">
    <BrowserRouter>
        <Container maxWidth="xl">
            <NavBar />
            <Routes>
                <Route path="/" element={<Navigate to="books" replace />}/>
                <Route path="books" element={<Home />}/>
                <Route path="books/search" element={<Home />}/>
                <Route path="books/:id" element={<BookDetails />}/>
                <Route path="auth" element={!user ? <Auth /> : <Navigate to="/books" replace /> }/>
            </Routes>
        </Container>
    </BrowserRouter>
</GoogleOAuthProvider>
    )
};

export default App;