interface CatInfo {
    id ?: string | undefined;
    name ?: string | undefined;
    age ?: number | undefined;
    sex ?: string | undefined;
    imageUrl ?: string | undefined;
    breedString ?: string | undefined;
    summary ?: string | undefined; 
    distance ?: number | undefined;
    isDeclawed ?: boolean | undefined;
    isHouseTrained ?: boolean | undefined;
}
export default CatInfo;