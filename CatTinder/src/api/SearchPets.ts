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
      }
    );
    const data = await response.json();
    console.log("Search Response:", JSON.stringify(data, null, 2));
    
    if (data.data && data.data.length > 0) {
      const animal = data.data[0];
      return ({
        name: animal.attributes.name,
        img: animal.attributes.pictures[0]?.large || '',
        id: animal.id
      });
    }
  } catch (error) {
    console.error('Error fetching pet data:', error);
  }
}

export default searchPets;