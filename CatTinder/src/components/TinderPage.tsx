import './TinderPage.css';
import React, { useState } from 'react';
import TinderDeck from './TinderDeck'; // Assuming you have this component
import searchPets from '../api/SearchPets';

const TinderPage: React.FC = () => {
  const [petData, setPetData] = useState({ name: "", img: "", id: "" });

  return (
    <div>
      <div className="app">
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
  );
};
export default TinderPage;