import { fetchGraphQL } from "../../infra/graphql/rickAndMortyAPI";
import { GET_CHARACTER_BY_NAME } from "../../infra/graphql/queries";

export interface Character {
  id: string;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: { name: string };
  location: { name: string };
  image: string;
}

interface GetCharacterByNameResponse {
  characters: {
    results: Character[];
  };
}

export async function getCharacterByName(name: string): Promise<Character[]> {
  const data = (await fetchGraphQL(GET_CHARACTER_BY_NAME, {
    name,
  })) as GetCharacterByNameResponse;

  return data.characters.results;
}
