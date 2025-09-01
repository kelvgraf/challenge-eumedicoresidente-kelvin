import { fetchGraphQL } from "../../infra/graphql/rickAndMortyAPI";
import { GET_CHARACTER_BY_ID } from "../../infra/graphql/queries";

export interface Character {
  id: string;
  name: string;
  status: string;
  species: string | "unknown" | "Alive" | "Dead";
  gender: string | "unknown" | "Male" | "Female";
  image: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
  episode: { id: string; name: string; episode: string }[];
}

export async function getCharacterById(id: string): Promise<Character | null> {
  const data = (await fetchGraphQL(GET_CHARACTER_BY_ID, { id })) as {
    character?: Character;
  };
  return data?.character ?? null;
}
