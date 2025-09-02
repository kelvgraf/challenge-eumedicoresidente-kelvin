import { render, screen } from "@testing-library/react";
import FavoritesPage from "@/app/favorites/page";
import { useFavorites } from "@/hooks/useFavorites";

jest.mock("@/hooks/useFavorites");

const mockCharacters = [
  {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    origin: { name: "Earth" },
    image: "/rick.png",
  },
  {
    id: 2,
    name: "Morty Smith",
    status: "Alive",
    species: "Human",
    origin: { name: "Earth" },
    image: "/morty.png",
  },
];

describe("FavoritesPage", () => {
  it("should render empty message when no favorites", () => {
    (useFavorites as jest.Mock).mockReturnValue({
      favorites: [],
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      isFavorite: jest.fn(() => false),
    });

    render(<FavoritesPage />);
    expect(screen.getByText(/Nenhum favorito salvo 💔/i)).toBeInTheDocument();
  });

  it("should render favorites cards when there are favorites", () => {
    (useFavorites as jest.Mock).mockReturnValue({
      favorites: mockCharacters,
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      isFavorite: jest.fn(() => true),
    });

    render(<FavoritesPage />);
    expect(screen.getByText("Meus Favoritos ❤️")).toBeInTheDocument();
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Morty Smith")).toBeInTheDocument();
  });
});
