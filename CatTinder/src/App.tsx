import './App.css';
import React, { useState } from 'react';
import UserProfile from './components/UserProfile';
import Login from './components/Login';
import CatPreference from './models/CatPreference';
import TinderDeck from './components/TinderDeck'; // Assuming you have this component
import searchPetsWithFilters from './api/SearchPetsWithFilters';
import searchPets from './api/SearchPets';

const App: React.FC = () => {
    const [page, setPage] = useState<'login' | 'userProfile' | 'main'>('userProfile');
    const [preferences, setPreferences] = useState<CatPreference>({});

    const handleLogin = () => {
        setPage('userProfile');
    };

    const handleSavePreferences = (preferences: CatPreference) => {
        console.log('Received preferences:', preferences);
        setPreferences(preferences);
        setPage('main');
    };

    return (
      <>
        {page === 'login' && <Login onLogin={handleLogin} />}
        {page === 'userProfile' && <UserProfile onSavePreferences={handleSavePreferences} />}
        {page === 'main' && preferences && <TinderDeck preferences={preferences} />}
      </>
    );
};

export default App;