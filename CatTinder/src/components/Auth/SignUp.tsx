import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { Button, Container, TextField, Box, Typography } from '@mui/material';

interface SignUpProps {
    onSignUp: () => void;
    onSignUpL: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSignUp, onSignUpL}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignUp = () => {
        console.log(`Username: ${username}, Password: ${password}`);
        createUserWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
            console.log('User signed up successfully:', userCredential);
            onSignUp();
        })
        .catch((error) => {
            console.error('Error signing up:', error);
            const errorMessage = getErrorMessage(error.code);
            setError(errorMessage);
        });
    };

    const getErrorMessage = (errorCode: string) => {
        switch (errorCode) {
            case 'auth/email-already-in-use':
                return 'The email address is already in use by another account.';
            case 'auth/invalid-email':
                return 'The email address is not valid.';
            case 'auth/operation-not-allowed':
                return 'Email/password accounts are not enabled.';
            case 'auth/weak-password':
                return 'The password is not strong enough.';
            default:
                return 'An unknown error occurred.';
        }
    };

    return (
        <div>
            <button onClick={onSignUpL}> Log in if you have an account! </button>
        <Container maxWidth="sm">
            <Box sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Sign Up
                </Typography>
                <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    sx={{ input: { color: 'white' } }}
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
                <p>
                    Password must be at least 6 characters long.
                </p>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={handleSignUp}
                >
                    SignUp
                </Button>
            </Box>
        </Container>
        </div>
    );
};

export default SignUp;