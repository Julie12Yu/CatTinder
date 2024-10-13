import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { Button, Container, TextField, Box, Typography } from '@mui/material';

interface LoginProps {
    onLogin: () => void;
    onLoginS: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onLoginS }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        console.log(`Username: ${username}, Password: ${password}`);
        signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
            console.log('User logged in successfully:', userCredential);
            onLogin();
        })
        .catch((error) => {
            console.error('Error logging in:', error);
            const errorMessage = getErrorMessage(error.code);
            setError(errorMessage);
        });
    };

    const getErrorMessage = (errorCode: string) => {
        switch (errorCode) {
            case 'auth/invalid-email':
                return 'The email address is not valid.';
            case 'auth/user-disabled':
                return 'The user account has been disabled by an administrator.';
            case 'auth/user-not-found':
                return 'There is no user record corresponding to this email.';
            case 'auth/wrong-password':
                return 'The password is incorrect.';
            default:
                return 'An unknown error occurred.';
        }
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
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2, backgroundColor: '#726589' }}
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