import React, { useState, useMemo, useRef, useEffect } from "react";
import TinderCard from "react-tinder-card";
import searchPets from "../../api/SearchPets";
import searchPetsWithFilters from "../../api/SearchPetsWithFilters";

function TinderDeck({ preferences }) {
  const [cats, setCats] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [lastDirection, setLastDirection] = useState("none");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  useEffect(() => {
    const loadCats = async () => {
      setLoading(true);
      try {
        //console.log("SEARCHING NOW")
        //const data = await searchPetsWithFilters({ preferences, page, limit: 50});
        const data = await searchPets({ preferences, page, limit: 50});
        //console.log(JSON.stringify(data));
        if (data) {
          //console.log("CATS CATS CATS BEFORE" + cats);
          await setCats(data);
          
          //console.log("CATS CATS CATS AFTER" + cats);
          console.log(cats.length + ", index bef: " + currentIndex);
          await setCurrentIndex(cats.length - 1);
          console.log(cats.length + ", index aft: " + currentIndex);
          
        } else {
          throw new Error('No data returned');
        }
      } catch (error) {
        console.error('Error loading cats:', error);
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

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
    /*if (index - 1 < 0 && !loading) {
      setPage((prevPage) => prevPage + 1);
    }*/
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < cats.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css?family=Damion&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Alatsi&display=swap"
        rel="stylesheet"
      />
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
              style={{ backgroundImage: "url(" + character.imageUrl + ")" }}
              className="card"
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
      <h2 key={lastDirection} className="infoText">
        {lastDirection === "none"
          ? "Please swipe"
          : "You swiped " + lastDirection}
      </h2>
    </div>
  );
}

export default TinderDeck;
