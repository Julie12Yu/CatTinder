const rescueGroupsAPIURL = "https://api.rescuegroups.org/v5";

async function getCatInfo(catId) {
  try {
    const reqURL = `${rescueGroupsAPIURL}/public/animals/${catId}`;

    const response = await fetch(reqURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/vnd.api+json",
          "Authorization": "" + process.env.RESCUE_GROUPS_API_KEY
        },
      });
    const data = response.data;
    console.log(JSON.stringify(response.json()));

    if (!data || !data.data || data.data.length === 0) {
        console.log("No data found for cat ID for the data", catId);
      return null;
    }
    // should hopefully only run once but oh well :sob:
    const cats = await Promise.all(data.data.map(async (cat) => {
        const org = await getOrganizationData(cat.relationships.orgs.data[0].id);
        return {
          id: cat.id,
          name: cat.attributes.name || "Unknown",
          age: cat.attributes.age || "Unknown",
          sex: cat.attributes.sex || "Unknown",
          imageUrl: cat.attributes.pictureThumbnailUrl || defaultMissingCatPictureURL,
          breedString: cat.attributes.breedPrimary || "Unknown",
          summary: cat.attributes.descriptionText || "No description.",
          distance: cat.attributes.distance || undefined,
          isDeclawed: cat.attributes.isDeclawed || undefined,
          isHouseTrained: cat.attributes.isHouseTrained || undefined,
          org: org,
          //location : await getLocationData(cat.relationships.locations.data[0].id)
        };
      }));
      console.log("Cats:" + JSON.stringify(cats));
    return cats;

  } catch (error) {
    console.error(`Error fetching details for animal ID ${catId}:`, error);
    throw error;
  }
};

export default getCatInfo;