import React from 'react';
import { Button, Container, TextField, Box, Typography } from '@mui/material';

interface LoginProps {
    onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const handleLogin = () => {
        // Perform login logic here
        onLogin();
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Login
                </Typography>
                <TextField
                    fullWidth
                    label="Username"
                    variant="outlined"
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
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
    );
};

export default Login;