import React, { useState } from 'react';
import CatPreference from '../models/CatPreference';
import catOptions from '../data/catOptions.json';
import { Container, TextField, MenuItem, Button, Typography, Box, InputAdornment, ThemeProvider, createTheme, FormControl, FormHelperText } from '@mui/material';
import { Pets, ColorLens, Wc, Straighten, PinDrop } from '@mui/icons-material';

const theme = createTheme({
    palette: {
        mode: 'light',
    },
});

interface UserProfileProps {
    onSavePreferences: (preferences: CatPreference) => void;
    currentPreferences?: CatPreference;
}

const UserProfile: React.FC<UserProfileProps> = (props: UserProfileProps) => {
    const [preferences, setPreferences] = useState<CatPreference>(
        props.currentPreferences || {
            sex: '',
            breed: '',
            color: '',
            distance: 50,
            zipCode: undefined,
            ageGroup: ''
        }
    );

    const [errors, setErrors] = useState<Partial<Record<keyof CatPreference, string>>>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPreferences({
            ...preferences,
            [name]: value,
        });
    };

    const handleSelectChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const { name, value } = e.target;
        setPreferences({
            ...preferences,
            [name as string]: value as string,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newErrors: Partial<Record<keyof CatPreference, string>> = {};

        if (!preferences.ageGroup) newErrors.ageGroup = 'Age group is required';
        if (!preferences.breed) newErrors.breed = 'Preferred breed is required';
        //if (!preferences.color) newErrors.color = 'Preferred color is required';
        if (!preferences.sex) newErrors.sex = 'Preferred gender is required';
        if (!preferences.distance) newErrors.distance = 'Preferred distance is required';
        if (!preferences.zipCode) newErrors.zipCode = 'Zip code is required';

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log('Preferences saved:', preferences);
            props.onSavePreferences(preferences);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="sm">
                <Box sx={{ mt: 4, mb: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        User Profile
                    </Typography>
                    <form onSubmit={handleSubmit}>
                    <Box sx={{ mb: 2 }}>
                            <FormControl fullWidth error={!!errors.ageGroup}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Age Group"
                                    id="ageGroup"
                                    name="ageGroup"
                                    value={preferences.ageGroup || ''}
                                    onChange={handleSelectChange}
                                    variant="outlined"
                                    margin="normal"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Pets />
                                            </InputAdornment>
                                        ),
                                    }}
                                >
                                    <MenuItem value="Any">Any</MenuItem>
                                    {catOptions.ageGroup.map((ageGroup) => (
                                        <MenuItem key={ageGroup} value={ageGroup}>
                                            {ageGroup}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                {errors.ageGroup && <FormHelperText>{errors.ageGroup}</FormHelperText>}
                            </FormControl>
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <FormControl fullWidth error={!!errors.breed}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Preferred Breed"
                                    id="breed"
                                    name="breed"
                                    value={preferences.breed || ''}
                                    onChange={handleSelectChange}
                                    variant="outlined"
                                    margin="normal"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Pets />
                                            </InputAdornment>
                                        ),
                                    }}
                                >
                                    <MenuItem value="Any">Any</MenuItem>
                                    {catOptions.breeds.map((breed) => (
                                        <MenuItem key={breed} value={breed}>
                                            {breed}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                {errors.breed && <FormHelperText>{errors.breed}</FormHelperText>}
                            </FormControl>
                        </Box>
                        {/*
                        <Box sx={{ mb: 2 }}>
                            <FormControl fullWidth error={!!errors.color}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Preferred Color"
                                    id="color"
                                    name="color"
                                    value={preferences.color || ''}
                                    onChange={handleSelectChange}
                                    variant="outlined"
                                    margin="normal"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <ColorLens />
                                            </InputAdornment>
                                        ),
                                    }}
                                >
                                    <MenuItem value="Any">Any</MenuItem>
                                    {catOptions.colors.map((color) => (
                                        <MenuItem key={color} value={color}>
                                            {color}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                {errors.color && <FormHelperText>{errors.color}</FormHelperText>}
                            </FormControl>
                        </Box>
                        */}
                        <Box sx={{ mb: 2 }}>
                            <FormControl fullWidth error={!!errors.sex}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Preferred Gender"
                                    id="sex"
                                    name="sex"
                                    value={preferences.sex || ''}
                                    onChange={handleSelectChange}
                                    variant="outlined"
                                    margin="normal"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Wc />
                                            </InputAdornment>
                                        ),
                                    }}
                                >
                                    <MenuItem value="Any">Any</MenuItem>
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                </TextField>
                                {errors.sex && <FormHelperText>{errors.sex}</FormHelperText>}
                            </FormControl>
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <FormControl fullWidth error={!!errors.distance}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Preferred Distance"
                                    id="distance"
                                    name="distance"
                                    value={preferences.distance || ''}
                                    onChange={handleSelectChange}
                                    variant="outlined"
                                    margin="normal"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Straighten />
                                            </InputAdornment>
                                        ),
                                    }}
                                >
                                    {catOptions.distances.map((distance) => (
                                        <MenuItem key={distance} value={distance}>
                                            {distance} miles
                                        </MenuItem>
                                    ))}
                                </TextField>
                                {errors.distance && <FormHelperText>{errors.distance}</FormHelperText>}
                            </FormControl>
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <FormControl fullWidth error={!!errors.zipCode}>
                                <TextField
                                    fullWidth
                                    label="Zip Code"
                                    type="number"
                                    id="zipCode"
                                    name="zipCode"
                                    value={preferences.zipCode || ''}
                                    onChange={handleInputChange}
                                    placeholder="Enter your zip code"
                                    variant="outlined"
                                    margin="normal"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PinDrop />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                {errors.zipCode && <FormHelperText>{errors.zipCode}</FormHelperText>}
                            </FormControl>
                        </Box>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ borderRadius: '20px' }}
                        >
                            Save Preferences
                        </Button>
                    </form>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default UserProfile;