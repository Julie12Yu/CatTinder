import './App.css';
import React, { useState } from 'react';
import UserProfile from './components/UserProfile';
import Login from './components/Login';
import CatPreference from './models/CatPreference';
import TinderDeck from './components/TinderDeck'; // Assuming you have this component
import searchPets from './api/SearchPets';

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
            {page === 'main' && (
                <>
                  <div>
                    <div className='app'>
                        <TinderDeck />
                    </div>
                    <button onClick={() => searchPets({ radius: 50, sort: "Updated Date", sortAscending: false })}>
                      Fetch Pet Data
                    </button>
                    {petData.name && (
                      <div id="List">
                        <div>
                          <a href={`https://www.petfinder.com/petdetail/${petData.id}`}>
                            {petData.name}
                          </a>
                        </div>
                        {petData.img && <img src={petData.img} alt={petData.name} />}
                      </div>
                    )}
                  </div>
                </>
            )}
        </>
    );
};

export default App;