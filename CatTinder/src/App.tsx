import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [petData, setPetData] = useState({ name: "", img: "", id: "" });
  //const rescueGroups = "https://dev1-api.rescuegroups.org/v5";
  const rescueGroups = "https://api.rescuegroups.org/v5";
  async function searchPets() {
    let filters: String[] = [];
    
    let reqUrl = `${rescueGroups}/public/animals/search/available/cats/?sort=-animals.updatedDate`;
    try {
      let response = await fetch(
        reqUrl,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/vnd.api+json",
            "Authorization": "krkZFvbx"
          },
          /*body: JSON.stringify({
            data: {
              filters: filters,
              fields: [
                "animals.name",
                "animals.species",
                "animals.breedPrimary",
                "animals.ageGroup",
                "animals.sex",
                "animals.sizeGroup",
                "animals.pictures",
                "animals.descriptionText"
              ],
              include: ["pictures", "locations", "orgs"]
            }*/
          
        }
      );
      const data = await response.json();
      console.log("Search Response:", JSON.stringify(data, null, 2));
      
      if (data.data && data.data.length > 0) {
        const animal = data.data[0];
        setPetData({
          name: animal.attributes.name,
          img: animal.attributes.pictures[0]?.large || '',
          id: animal.id
        });
      }
    } catch (error) {
      console.error('Error fetching pet data:', error);
    }
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
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
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  );
}

export default App;