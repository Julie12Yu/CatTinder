//import CatPreference from "../models/CatPreference";
import CatInfo from "../models/CatInfo";

const rescueGroupsAPIURL = "https://api.rescuegroups.org/v5";
/*
interface SearchPetsProps {
  preferences: CatPreference;
  page?: number;
  limit?: number;
}*/

async function searchPetsWithFilters(/*props: SearchPetsProps*/): Promise<CatInfo[] | undefined> {
 

  /*const requestBody = {
    data: {
      filters: filters,
      filterProcessing: constructFilterProcessing(filters),
      filterRadius: {
        miles: preferences.distance || 1000,
        postalcode: preferences.zipCode || "98105"
      },
    }
  };*/

  //const reqUrl = `${rescueGroupsAPIURL}/public/animals/search/available/cats/haspic?sort=-animals.updatedDate&limit=${props.limit || 100}&page=${props.page || 1}`;
  const reqUrl = `${rescueGroupsAPIURL}/public/orgs/77`;
  console.log('Request URL:', reqUrl);
  //console.log('Request Body:', JSON.stringify(requestBody));

  try {
    const response = await fetch(reqUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/vnd.api+json",
        "Authorization": "" + import.meta.env.VITE_RESCUE_GROUPS_API_KEY
      },
      //body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Response Data:', data);

    // Assuming the response data structure contains an array of cats
    /*if (!data || !data.data || data.data.length === 0) { 
        return [];
    }

    return data.data.map((cat: any) => ({
      id: cat.id,
      name: cat.attributes.name || "Unknown",
      age: cat.attributes.age || "Unknown",
      sex: cat.attributes.sex || "Unknown",
      imageUrl: cat.attributes.pictureThumbnailUrl || defaultMissingCatPictureURL,
      breedString: cat.attributes.breedPrimary || "Unknown",
      summary: cat.attributes.descriptionText || "No description.",
      distance: cat.attributes.distance || undefined,
      isDeclawed: cat.attributes.isDeclawed || undefined,
      isHouseTrained: cat.attributes.isHouseTrained || undefined
    }));*/
  } catch (error) {
    console.error('Error loading cats:', error);
    return undefined;
  }
}

export default searchPetsWithFilters;