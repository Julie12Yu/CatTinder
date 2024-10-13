import React, { useState, useMemo, useRef, useEffect } from "react";
import CatProfile from "../CatProfile";
import TinderCard from "react-tinder-card";
import {searchPets} from "../../api/SearchPets";
import CircularProgress from "@mui/material/CircularProgress";
import searchPetsWithFilters from "../../api/SearchPetsWithFilters";
import { API_URL } from "../Auth/config";
import { auth } from "../Auth/firebase";
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import InfoIcon from '@mui/icons-material/Info';

function TinderDeck({ authUser, setAuthUser, preferences, failedToRetreive, viewMatches }) {
  const [cats, setCats] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [lastDirection, setLastDirection] = useState("none");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedCat, setSelectedCat] = useState(null);
  const currentIndexRef = useRef(currentIndex);
  const [currentCat, setCurrentCat] = useState(null);

  const handleSwipe = async (direction, catInfo) => {
    if (direction !== "right") {
    
      return;
    }
    console.log("SWIPING NOW");
    try {
      if (!authUser || !authUser.uid) {
        throw new Error("authUser or uid is not defined");
      }
      const userNum = authUser.uid;
      const response = await fetch(`${API_URL}api/swipe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include authentication headers if required
        },
        body: JSON.stringify({ userNum, catInfo}),
      });
      if (!response.ok) {
        throw new Error("Failed to record swipe");
      }
      // Handle successful swipe recording
    } catch (error) {
      console.error("Error recording swipe:", error);
      // Handle error
    }
  };
  useEffect(() => {
    const loadCats = async () => {
      setLoading(true);
      try {
        //console.log("SEARCHING NOW")
        //const data = await searchPetsWithFilters({ preferences, page, limit: 50});
        const data = await searchPets({ preferences, page, limit: 50 });
        //console.log(JSON.stringify(data));
        if (data) {
          if (data.length == 0) {
            failedToRetreive();
          }
          //console.log("CATS CATS CATS BEFORE" + cats);
          await setCats(data);

          //console.log("CATS CATS CATS AFTER" + cats);
          console.log(cats.length + ", index bef: " + currentIndex);
          await setCurrentIndex(cats.length - 1);
          console.log(cats.length + ", index aft: " + currentIndex);
        } else {
          throw new Error("No data returned");
        }
      } catch (error) {
        console.error("Error loading cats:", error);
        failedToRetreive();
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
    handleCloseProfile();
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < cats.length - 1;

  const canSwipe = currentIndex >= 0;

  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    handleCloseProfile();
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    handleCloseProfile();
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < cats.length) {
      handleSwipe(dir, cats[currentIndex]);
      handleCloseProfile();
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    handleCloseProfile();
    await childRefs[newIndex].current.restoreCard();
  };

  const handleCatInfoClick = (cat) => {
    if (selectedCat == cat) {
      setSelectedCat(null);
    } else {
      setSelectedCat(cat);
    }
  };

  const handleCloseProfile = () => {
    setSelectedCat(null);
  };

  return (
    <div>
      <h1>Cat Tinder</h1>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <>
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
                <IconButton
                  aria-label="info"
                  onClick={() => handleCatInfoClick(character)}
                  style={{ position: 'absolute', top: 10, right: 10 }}
                >
                  <InfoIcon />
                </IconButton>
              </div>
            </TinderCard>
          ))}
          </div>
          <div className="buttons">
            <IconButton
              style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
              onClick={() => swipe("left")}
            >
              <FavoriteBorderIcon />
            </IconButton>
            <IconButton
              style={{ backgroundColor: !canGoBack && "#c3c4d3" }}
              onClick={() => goBack()}
            >
              Undo
            </IconButton>
            <IconButton
              style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
              onClick={() => swipe("right")}
            >
              <FavoriteIcon />
            </IconButton>
          </div>
          <div className="buttons">
            <IconButton
              onClick={() => viewMatches()}
            >
              View Matches
            </IconButton>
          </div>

          <h2 key={lastDirection} className="infoText">
            {lastDirection === "none"
              ? "Please swipe"
              : "You swiped " + lastDirection}
          </h2>
          <CatProfile
            cat={selectedCat}
            isOpen={!!selectedCat}
            onClose={handleCloseProfile}
          />
        </>
      )}
    </div>
  );
}

export default TinderDeck;
