import './App.css';
import React, { useState } from 'react';
import UserProfile from './components/UserProfile';
import Login from './components/Auth/Login';
import UserAuth from './components/Auth/UserAuth';
import CatPreference from './models/CatPreference';
import TinderPage from './components/Tinder/TinderPage';
import SignUp from './components/Auth/SignUp';

const App: React.FC = () => {
    const [page, setPage] = useState<'login' | 'userProfile' | 'main' | 'signUp'>('login');
    const [petData, setPetData] = useState({ name: "", img: "", id: "" });

    const handleLogin = () => {
        setPage('userProfile');
    };

    const handleMoveSignUp = () => {
        setPage('signUp');
    }

    const onSignUpLogin = () => {
        setPage('login');
    }

    const handleSignUp = () => {
        setPage('userProfile');
    };

    const handleSavePreferences = (preferences: CatPreference) => {
        console.log('Received preferences:', preferences);
        setPage('main');
    };

    return (
        <>
            <div>
            {page === 'login' && <Login onLogin={handleLogin}  onLoginS={handleMoveSignUp} />}
            {page === 'signUp' && <SignUp onSignUp={handleSignUp} onSignUpL={onSignUpLogin} />}
            {page === 'userProfile' && <UserProfile onSavePreferences={handleSavePreferences} />}
            {page === 'main' && <TinderPage />}
            <UserAuth/>
            </div>
        </>
    );
};

export default App;