interface CatInfo {
    id ?: string | undefined;
    name ?: string | undefined;
    age ?: number | undefined;
    sex ?: string | undefined;
    img ?: string | undefined;
    breedString ?: string | undefined;
    color ?: string | undefined;
    summary ?: string | undefined; 
    distance ?: number | undefined;
    isDeclawed ?: boolean | undefined;
    isHouseTrained ?: boolean | undefined;
}
export default CatInfo;

/*
{
  "data": [{
    "type": "animals",
    "id": "8013243",
    "attributes": {
      "name": "Curly",
      "ageGroup": "Young",
      "birthDate": "2016-03-30T00:00:00Z"
    },
    "relationships": {
      "breeds": {
        "data": [{
            "type": "breeds",
            "id": "35"
          },
          {
            "type": "breeds",
            "id": "62"
          }
        ]
      }
    }
  }]
}
*/