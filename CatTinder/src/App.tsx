import './App.css';
import React, { useState, useEffect} from 'react';
import UserProfile from './components/UserProfile';
import Login from './components/Auth/Login';
import UserAuth from './components/Auth/UserAuth';
import CatPreference from './models/CatPreference';
import TinderPage from './components/Tinder/TinderPage';
import SignUp from './components/Auth/SignUp';
import searchPetsWithFilters from './api/SearchPetsWithFilters';
import { User } from 'firebase/auth';

const App: React.FC = () => {
    const [authUser, setAuthUser] = useState<User | null>(null);
    const [page, setPage] = useState<'login' | 'userProfile' | 'main' | 'signUp'>(authUser === null ? 'login' : 'userProfile');
    const [preferences, setPreferences] = useState<CatPreference>({});
    const [failedToRetreive, setFailedToRetreive] = useState(false);


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
        if (page === 'main') {
          setFailedToRetreive(false);
        }
        setPage('userProfile');
    }

    const handleFailedToRetrieve = () => {
      setPage('userProfile');
      setFailedToRetreive(true);
    }

    const handleReturnToLogin = () => {
      setPage('login');
    }

    return (
        <>
            <div>
              {page === 'login' && <Login onLogin={handleLogin}  onLoginS={handleMoveSignUp} />}
              {page === 'signUp' && <SignUp onSignUp={handleSignUp} onSignUpL={onSignUpLogin} />}
              {page === 'userProfile' && <UserProfile onSavePreferences={handleSavePreferences} preferences={preferences} failedToRetreive={failedToRetreive}/>}
              {page === 'main' && <TinderPage authUser={authUser} setAuthUser={setAuthUser} preferences={preferences} failedToRetreive={handleFailedToRetrieve}/>}
              <UserAuth  authUser={authUser} setAuthUser={setAuthUser} returnToPreferences={handleReturnToPreferences} displayReturnToPreferences={page === 'main'} returnToLogin={handleReturnToLogin}/>
            </div>
        </>
    );
};

export default App;