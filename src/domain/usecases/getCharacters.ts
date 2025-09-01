import { fetchGraphQL } from "../../infra/graphql/rickAndMortyAPI";
import { GET_CHARACTERS } from "../../infra/graphql/queries";

export interface Character {
  id: string;
  name: string;
  status: string;
  species: string;
  image: string;
  origin: {
    name: string;
  };
}

export async function getCharacters(
  page = 1,
  name = "",
  status = "",
  species = ""
): Promise<{
  info: { count: number; pages: number };
  results: Character[];
}> {
  const data = (await fetchGraphQL(GET_CHARACTERS, {
    page,
    name,
    status,
    species,
  })) as
    | {
        characters: {
          info: { count: number; pages: number };
          results: Character[];
        };
      }
    | undefined;
  return (
    data?.characters ?? {
      info: { count: 0, pages: 0 },
      results: [],
    }
  );
}
