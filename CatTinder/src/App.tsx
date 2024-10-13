import './App.css';
import React, { useState } from 'react';
import UserProfile from './components/UserProfile';
import Login from './components/Auth/Login';
import UserAuth from './components/Auth/UserAuth';
import CatPreference from './models/CatPreference';
import TinderPage from './components/Tinder/TinderPage';
import SignUp from './components/Auth/SignUp';
import { User } from 'firebase/auth';

const App: React.FC = () => {
    const [page, setPage] = useState<'login' | 'userProfile' | 'main' | 'signUp'>('login');
    const [preferences, setPreferences] = useState<CatPreference>({});
    const [failed, setFailed] = useState<boolean>(false);
    const [authUser, setAuthUser] = useState<User | null>(null);

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
        setPreferences(preferences);
        setPage('main');
    };

    const handleReturnToPreferences = () => {
        setPage('userProfile');
    }

    const handleFailedToRetrieve = () => {
      setPage('userProfile');
      setFailed(true)
    }

    return (
        <>
            <div>
              {page === 'login' && <Login onLogin={handleLogin}  onLoginS={handleMoveSignUp} />}
              {page === 'signUp' && <SignUp onSignUp={handleSignUp} onSignUpL={onSignUpLogin} />}
              {page === 'userProfile' && <UserProfile onSavePreferences={handleSavePreferences} preferences={preferences}/>}
              {page === 'main' && <TinderPage authUser={authUser} setAuthUser={setAuthUser} preferences={preferences} failedToRetreive={handleFailedToRetrieve}/>}
              <UserAuth  authUser={authUser} setAuthUser={setAuthUser} returnToPreferences={handleReturnToPreferences} displayReturnToPreferences={page === 'main'}/>
            </div>
        </>
    );
};

export default App;