import axios from 'axios';
import CatInfo from '../models/CatInfo';
import CatPreference from '../models/CatPreference';
import { API_URL } from '../components/Auth/config.ts';

interface SearchPetsProps {
  preferences: CatPreference;
  page?: number;
  limit?: number;
}


export async function searchPets(props: SearchPetsProps) : Promise<CatInfo[] | undefined> {
  try {
    const response = await axios.post(`${API_URL}api/searchPetsWithFilters`, {preferences: props.preferences, page: props.page, limit: props.limit})
    return response.data;
  } catch (error) {
    console.error('Error searching pets with filters:', error);
    throw error;
  }
};
//OdtmJK6pdtOU9sCfgGFs2B2hWcn1

export const getMatches = async (userNum: string, limit:number) => {
  try {
    const response = await axios.get(`${API_URL}api/swipes/?userNum=${userNum}&limit=${limit}`);
    console.log("Data:" + JSON.stringify(response.data))
    return response.data;
  } catch (error) {
    console.error(`Error fetching matches:`, error);
    throw error;
  }
};

export default {searchPets, getMatches}

/*
export default async function searchPets(props: SearchPetsProps) : Promise<CatInfo[] | undefined> {
  try {
    const response = await axios.post(`${API_URL}/searchPetsWithFilters`, {preferences: props.preferences, page: props.page, limit: props.limit})
    return response.data;
  } catch (error) {
    console.error('Error searching pets with filters:', error);
    throw error;
  }
};
*/

/*

async function searchPets(props: SearchPetsProps) : Promise<CatInfo[] | undefined> {

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
    }
  } catch (error) {
    console.error('Error fetching pet data:', error);
  }
}

export default searchPets;*/