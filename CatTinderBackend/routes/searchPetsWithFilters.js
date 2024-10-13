

const rescueGroupsAPIURL = "https://api.rescuegroups.org/v5";

export async function searchPetsWithFilters(props) {
  const addFilter = (filters, fieldName, operation, criteria) => {
    filters.push({
      fieldName: "animals." + fieldName,
      operation: operation,
      criteria: criteria
    });
  }

  const constructFilterProcessing = (filters) => {
    if (filters.length <= 1) {
        return "";
    }
    let filterProcessing = "1";
    for (let i = 2; i <= filters.length; i++) {
        filterProcessing += ` and ${i}`;
    }
    return filterProcessing;
  }

  const preferences = props.preferences;
  const defaultMissingCatPictureURL = "https://cdn.discordapp.com/attachments/786109228267601920/1294837546911535134/a8117bbcdb409915a733bec10b3ad118.png?ex=670c76f0&is=670b2570&hm=da91d1ff4fb5c18909eb5078c9ce34f1ded7f961d344b7c7ab85486e8e7d1d58&";

  const filters = []

  if (preferences.sex !== undefined && preferences.sex !== "Any") {
    addFilter(filters, "sex", "equals", preferences.sex)
  } 

  if (preferences.ageGroup !== undefined && preferences.ageGroup !== "Any") {
    addFilter(filters, "ageGroup", "equals", preferences.ageGroup)
  } 

  if (preferences.breed !== undefined && preferences.breed !== "Any") {
    addFilter(filters, "breedPrimary", "equals", preferences.breed)
  } 

  const requestBody = {
    data: {
      filters: filters,
      filterProcessing: constructFilterProcessing(filters),
      filterRadius: {
        miles: preferences.distance || 1000,
        postalcode: preferences.zipCode || "98105"
      },
    }
  };

  const reqUrl = `${rescueGroupsAPIURL}/public/animals/search/available/cats/haspic?sort=-animals.updatedDate&limit=${props.limit || 100}&page=${props.page || 1}`;
  console.log('Request URL:', reqUrl);
  console.log('Request Body:', JSON.stringify(requestBody));

  try {
    const response = await fetch(reqUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/vnd.api+json",
        "Authorization": "" + process.env.RESCUE_GROUPS_API_KEY
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Response Data:', data);

    if (!data || !data.data || data.data.length === 0) { 
        return [];
    }

    return data.data.map((cat) => ({
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
    }));
  } catch (error) {
    console.error('Error loading cats:', error);
    return undefined;
  }
}

export default searchPetsWithFilters;