import React, { useState } from 'react';
import {signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../../firebase';
import { Button, Container, TextField, Box, Typography } from '@mui/material';

interface LoginProps {
    onLogin: () => void;
    onLoginS: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onLoginS}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Perform login logic here
        console.log(`Username: ${username}, Password: ${password}`);
        signInWithEmailAndPassword(auth, username, password)
        .then((useCredential) => {
            console.log('User logged in successfully:', useCredential);
        }).catch((error) => {
            console.error('Error logging in:', error);
        });
        onLogin();
    };

    return (
        <div>        
            <button onClick={onLoginS}> Sign up if you don't have an account! </button>
            <Container maxWidth="sm">
                <Box sx={{ mt: 4, mb: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Login
                    </Typography>
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                </Box>
            </Container>
        </div>
    );
};

export default Login;