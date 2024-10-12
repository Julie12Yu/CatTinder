//const rescueGroups = "https://dev1-api.rescuegroups.org/v5";
const rescueGroupsAPIURL = "https://api.rescuegroups.org/v5";

interface SearchPetsProps {
  radius ?: number;
  zipCode ?: string;
  gender ?: string;
  age ?: number;
  sort ?: string;
  sortAscending ?: boolean;
}

const defaultSearchProps: SearchPetsProps = {
  radius: 50,
  zipCode: '98105',
  gender: undefined,
  age: undefined,
  sort: 'Updated Date',
  sortAscending: false
};

async function searchPets(props: SearchPetsProps) {
  console.log('SearchPets:', props);
  const urlParams = new URLSearchParams();

  if (props.sort && props.sortAscending !== undefined) {
    console.log('Sort:', props.sort, props.sortAscending);
    let sort = props.sortAscending ? '+' : '-';
    let sortField 
      = props.sort.split(' ')
        .map((word, index) => 
          index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1)
        ).join('');
    urlParams.append('sort', `${sort}animals.${sortField}`);
  } 

  if (props.radius !== undefined /* && props.zipCode */) {
    console.log('Radius:', props.radius, 'Zip:', props.zipCode);
    urlParams.append('distance', `${props.radius}`);
      //|${props.zipCode}`);
  }

  if (props.gender !== undefined) {
    console.log("Gender:" + props.gender);
    urlParams.append('gender', props.gender);
  }
  if (props.age !== undefined) {
    console.log("Age:" + props.age);
    urlParams.append('age', props.age.toString());
  }

  let reqUrl = `${rescueGroupsAPIURL}/public/animals/search/available/cats/?${urlParams.toString()}`;
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
    console.log("Search Response:", JSON.stringify(data, null, 2));

    if (data.data && data.data.length > 0) {
      const animal = data.data[0];
      return {
        name: animal.attributes.name,
        img: animal.attributes.pictures[0]?.large || '',
        id: animal.id
      };
    }
  } catch (error) {
    console.error('Error fetching pet data:', error);
  }
}

export default searchPets;