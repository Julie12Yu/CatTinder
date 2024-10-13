import './App.css';
import React, { useState } from 'react';
import UserProfile from './components/UserProfile';
import Login from './components/Login';
import CatPreference from './models/CatPreference';
import TinderPage from './components/TinderPage';

const App: React.FC = () => {
    const [page, setPage] = useState<'login' | 'userProfile' | 'main'>('login');
    const [petData, setPetData] = useState({ name: "", img: "", id: "" });

    const handleLogin = () => {
        setPage('userProfile');
    };

    const handleSavePreferences = (preferences: CatPreference) => {
        console.log('Received preferences:', preferences);
        setPage('main');
    };

    return (
        <>
            {page === 'login' && <Login onLogin={handleLogin} />}
            {page === 'userProfile' && <UserProfile onSavePreferences={handleSavePreferences} />}
            {page === 'main' && <TinderPage />}
        </>
    );
};

export default App;