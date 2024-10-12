<<<<<<< Updated upstream
import { useState } from 'react';
import './App.css';
import TinderDeck from './components/TinderDeck';
=======
import React, { useState } from 'react';
import UserProfile from './components/UserProfile';
import Login from './components/Login';
import CatPreference from './models/CatPreference';
import TinderDeck from './components/TinderDeck'; // Assuming you have this component
>>>>>>> Stashed changes
import searchPets from './api/SearchPets';
import React from 'react';

const App: React.FC = () => {
    const [page, setPage] = useState<'login' | 'userProfile' | 'main'>('login');
    const [count, setCount] = useState(0);
    const [petData, setPetData] = useState({ name: "", img: "", id: "" });

<<<<<<< Updated upstream
  return (
    <>
      <div>
        <div className='app'>
            <TinderDeck />
        </div>
        <button onClick={searchPets}>
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
  );
}
=======
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
                    <TinderDeck />
                    <h1>Vite + React</h1>
                    <div className="card">
                        <button onClick={() => setCount((count) => count + 1)}>
                            count is {count}
                        </button>
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
                        <p>
                            Edit <code>src/App.tsx</code> and save to test HMR
                        </p>
                    </div>
                </>
            )}
        </>
    );
};
>>>>>>> Stashed changes

export default App;