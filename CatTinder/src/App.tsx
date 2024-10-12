import { useState } from 'react';
import './App.css';
import TinderDeck from './components/TinderDeck';
import searchPets from './api/SearchPets';
import React from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [petData, setPetData] = useState({ name: "", img: "", id: "" });
  

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

export default App;