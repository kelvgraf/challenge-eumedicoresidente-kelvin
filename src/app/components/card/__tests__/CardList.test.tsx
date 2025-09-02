import { render, screen, fireEvent } from "@testing-library/react";
import { CardList } from "@/app/components/card";
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

describe("CardList", () => {
  it("should render characters", () => {
    (useFavorites as jest.Mock).mockReturnValue({
      favorites: [],
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      isFavorite: jest.fn(() => false),
    });

    render(<CardList characters={mockCharacters} />);
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Morty Smith")).toBeInTheDocument();
  });

  it("should handle favorite button click", () => {
    const addFavoriteMock = jest.fn();
    const removeFavoriteMock = jest.fn();

    (useFavorites as jest.Mock).mockReturnValue({
      favorites: [],
      addFavorite: addFavoriteMock,
      removeFavorite: removeFavoriteMock,
      isFavorite: jest.fn(() => false),
    });

    render(<CardList characters={mockCharacters} />);

    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[0]);
    expect(addFavoriteMock).toHaveBeenCalledWith(mockCharacters[0]);
  });

  it("should remove favorite if already favorited", () => {
    const addFavoriteMock = jest.fn();
    const removeFavoriteMock = jest.fn();

    (useFavorites as jest.Mock).mockReturnValue({
      favorites: mockCharacters,
      addFavorite: addFavoriteMock,
      removeFavorite: removeFavoriteMock,
      isFavorite: jest.fn(() => true),
    });

    render(<CardList characters={mockCharacters} />);

    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[0]);
    expect(removeFavoriteMock).toHaveBeenCalledWith(mockCharacters[0].id);
  });
});
