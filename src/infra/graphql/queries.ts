import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query GetCharacters(
    $page: Int
    $name: String
    $status: String
    $species: String
  ) {
    characters(
      page: $page
      filter: { name: $name, status: $status, species: $species }
    ) {
      info {
        count
        pages
      }
      results {
        id
        name
        status
        species
        image
        origin {
          name
        }
      }
    }
  }
`;

export const GET_CHARACTER_BY_ID = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      gender
      origin {
        name
      }
      location {
        name
      }
      episode {
        id
        name
        episode
      }
      image
    }
  }
`;

export const GET_CHARACTER_BY_NAME = gql`
  query GetCharacterByName($name: String) {
    characters(filter: { name: $name }) {
      results {
        id
        name
        status
        species
        gender
        origin {
          name
        }
        location {
          name
        }
        image
      }
    }
  }
`;
