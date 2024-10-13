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
        <h2>{cat.name}</h2> 
        <p>Age: {cat.age}</p>
        <p>Sex: {cat.sex}</p>
        <p>Breed: {cat.breedString}</p>
        <p>{cat.summary}</p>
        {cat.org ? (
          <>
            <h2>Organization Info</h2>
            <p>Name: {cat.org.name || 'null'}</p>
            <p>Address: {cat.org.orgAddress || 'null'}</p>
            <p>Phone: {cat.org.orgPhone || 'null'}</p>
            <p>Email: {cat.org.orgEmail || 'null'}</p>
            <p>URL: {cat.org.orgUrl || 'null'}</p>
          </>
        ) : (
          <p>Organization Info: null</p>
        )}
      </div>
    </div>
  );
};

export default CatProfile;