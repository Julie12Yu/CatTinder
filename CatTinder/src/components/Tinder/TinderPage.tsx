import './TinderPage.css';
import React, { useState } from 'react';
import TinderDeck from './TinderDeck'; // Assuming you have this component
import searchPetsWithFilters from '../../api/SearchPetsWithFilters';
import CatPreference from '../../models/CatPreference';


interface TinderProfileProps {
  preferences: CatPreference;
}
const TinderPage: React.FC<TinderProfileProps> = (props: TinderProfileProps) => {
  const [petData, setPetData] = useState({ name: "", img: "", id: "" });

  return (
    <div>
      <div className="app">
        <TinderDeck preferences={props.preferences}/>
      </div>
    </div>
  );
};
export default TinderPage;