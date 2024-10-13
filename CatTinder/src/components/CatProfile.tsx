import React from 'react';
import CatInfo  from "../models/CatInfo";

interface CatProfileProps {
  cat: CatInfo;
  isOpen: boolean;
  onClose: () => void;
}

const CatProfile: React.FC<CatProfileProps> = ({ cat, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="popup">
      <div className="popup_inner">
        <button className="close-btn" onClick={onClose}>close</button>
        <h1>{cat.name}</h1> 
        <p>Age: {cat.age}</p>
        <p>Sex: {cat.sex}</p>
        <p>Breed: {cat.breedString}</p>
        <p>{cat.summary}</p>
      </div>
    </div>
  );
};

export default CatProfile;