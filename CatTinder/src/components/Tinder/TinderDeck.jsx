import React, { useState, useMemo, useRef, useEffect } from "react";
import CatProfile from "../CatProfile";
import TinderCard from "react-tinder-card";
import searchPetsWithFilters from "../../api/SearchPetsWithFilters";

function TinderDeck({ preferences }) {
  const [cats, setCats] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [lastDirection, setLastDirection] = useState("none");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedCat, setSelectedCat] = useState(null);
  const currentIndexRef = useRef(currentIndex);

  useEffect(() => {
    const loadCats = async () => {
      setLoading(true);
      try {
        const data = await searchPetsWithFilters({
          preferences,
          page,
          limit: 10,
        });
        if (data) {
          setCats(data);
          setCurrentIndex(data.length - 1);
        } else {
          throw new Error("No data returned");
        }
      } catch (error) {
        console.error("Error loading cats:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCats();
  }, [page, preferences]);

  const childRefs = useMemo(
    () =>
      Array(cats.length)
        .fill(0)
        .map(() => React.createRef()),
    [cats.length]
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < cats.length - 1;
  const canSwipe = currentIndex >= 0;

  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < cats.length) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  const handleCardClick = (cat) => {
    setSelectedCat(cat);
  };

  const handleCloseProfile = () => {
    setSelectedCat(null);
  };

  return (
    <div>
      <h1>Cat Tinder</h1>
      <div className="cardContainer">
        {cats.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="swipe"
            key={character.id}
            onSwipe={(dir) => swiped(dir, character.name, index)}
            onCardLeftScreen={() => outOfFrame(character.name, index)}
          >
            <div
              style={{ backgroundImage: `url(${character.imageUrl})` }}
              className="card"
              onClick={() => handleCardClick(character)}
            >
              <h3>{character.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
      <div className="buttons">
        <button
          style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
          onClick={() => swipe("left")}
        >
          Swipe left!
        </button>
        <button
          style={{ backgroundColor: !canGoBack && "#c3c4d3" }}
          onClick={() => goBack()}
        >
          Undo swipe!
        </button>
        <button
          style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
          onClick={() => swipe("right")}
        >
          Swipe right!
        </button>
      </div>
      <h2 className="infoText">
        {lastDirection === "none"
          ? "Please swipe"
          : `You swiped ${lastDirection}`}
      </h2>
      <CatProfile
        cat={selectedCat}
        isOpen={!!selectedCat}
        onClose={handleCloseProfile}
      />
    </div>
  );
}

export default TinderDeck;
