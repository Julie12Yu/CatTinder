const rescueGroupsAPIURL = "https://api.rescuegroups.org/v5";
const orgDataCache = {}; // Hashmap fpr memo

async function getOrganizationData(orgId) {
  if (orgDataCache[orgId]) {
    console.log('Returning cached data for orgId:', orgId);
    console.log(JSON.stringify(orgDataCache[orgId]));
    return orgDataCache[orgId];
  }

  const reqUrl = `${rescueGroupsAPIURL}/public/orgs/${orgId}`;
  console.log('Request URL:', reqUrl);

  const constructAddress = (street, city, state, postalcode) => {
    const streetStr = street ? `${street} \n ` : "";
    return `${streetStr}${city}, ${state} ${postalcode}`;
  }

  const getOrgObject = (org) => {
    console.log(getOrgObject);
    return {
      id: org.id,
      name: org.attributes.name || "Unknown",
      orgAddress: constructAddress(org.attributes.street, org.attributes.city, org.attributes.state, org.attributes.postalcode),
      orgPhone: org.attributes.phone || "Unknown",
      orgEmail: org.attributes.email || "Unknown",
      orgUrl: org.attributes.url || "Unknown",
    };
  }

  try {
    const response = await fetch(reqUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/vnd.api+json",
        "Authorization": "" + process.env.RESCUE_GROUPS_API_KEY
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log("Response:" + response.status);

    const data = await response.json();
    console.log('Response Data for Org:', JSON.stringify(data));
    //console.log('Response Data for Org:', data);

    if (!data || !data.data || data.data.length === 0) { 
        console.log("hellO");
      return null;
    }

    const orgObject = getOrgObject(data.data[0]);
    orgDataCache[orgId] = orgObject;
    return orgObject;
  } catch (error) {
    console.error('Error loading organization data:', error);
    return null;
  }
}

export default getOrganizationData;