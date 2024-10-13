import CatPreference from "../models/CatPreference";
import CatInfo from "../models/CatInfo";

//const rescueGroups = "https://dev1-api.rescuegroups.org/v5";
const rescueGroupsAPIURL = "https://api.rescuegroups.org/v5";

interface SearchPetsProps {
  preferences: CatPreference;
  page?: number;
  limit?: number;
}

async function searchPets(props: SearchPetsProps) /*: Promise<CatInfo[] | undefined>*/ {
  //console.log('SearchPets:', props);
  const urlParams = new URLSearchParams();
  const preferences = props.preferences;
  const defaultMissingCatPictureURL = "https://cdn.discordapp.com/attachments/786109228267601920/1294837546911535134/a8117bbcdb409915a733bec10b3ad118.png?ex=670c76f0&is=670b2570&hm=da91d1ff4fb5c18909eb5078c9ce34f1ded7f961d344b7c7ab85486e8e7d1d58&";

  urlParams.append('sort', `-animals.updatedDate`);
  /*
  if (preferences.sort && props.sortAscending !== undefined) {
    
    console.log('Sort:', props.sort, props.sortAscending);
    let sort = props.sortAscending ? '+' : '-';
    let sortField 
      = props.sort.split(' ')
        .map((word, index) => 
          index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1)
        ).join('');
    urlParams.append('sort', `${sort}animals.${sortField}`);
  } */

  if (preferences.distance !== undefined /* && props.zipCode */) {
    //console.log('Radius:', preferences.distance);
    urlParams.append('distance', `${preferences.distance}`);
      //|${props.zipCode}`);
  }

  if (preferences.sex !== undefined) {
    //console.log("Gender:" + preferences.sex);
    urlParams.append('gender', preferences.sex);
  }
  /*
  if (preferences.ageLowerBound !== undefined && preferences.ageUpperBound !== undefined) {
    //console.log("Age:" + preferences.ageLowerBound) + "-" + preferences.ageUpperBound;
    urlParams.append('age', preferences.ageLowerBound.toString());
  }*/

  if (props.page !== undefined) {
    urlParams.append('page', props.page.toString());
  }

  if (props.limit !== undefined) {
    urlParams.append('limit', props.limit.toString());
  }

  //let reqUrl = `${rescueGroupsAPIURL}/public/animals/search/available/cats/?${urlParams.toString()}`;
  let reqUrl = `${rescueGroupsAPIURL}/public/animals/breeds&limit=807`;
  console.log('Request URL:', reqUrl);
  try {
    let response = await fetch(
      reqUrl,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/vnd.api+json",
          "Authorization": "" + import.meta.env.VITE_RESCUE_GROUPS_API_KEY
        },
      }
    );
    const data = await response.json();
    let breeds: string[] = []
    data.data.map(
      (
        (entry: any) => {
          if (entry.relationships.species.data[0].id === "3") {
            //cat
            breeds.push(entry.attributes.name)
          }
        }
      )
    )
    console.log(breeds)
    //console.log("Search Response:", JSON.stringify(data, null, 2));
    /*
    if (data.data && data.data.length > 0) {
        return data.data.map((animal: any) => ({
            id: animal.id,
            name: animal.attributes.name,
            breed: animal.attributes.breedString,
            age: animal.attributes.ageString,
            sex: animal.attributes.sex,
            description: animal.attributes.descriptionText,
            imageUrl: animal.attributes.pictureThumbnailUrl || defaultMissingCatPictureURL,
            url: animal.attributes.url
        }));
    }*/
  } catch (error) {
    console.error('Error fetching pet data:', error);
  }
}

export default searchPets;