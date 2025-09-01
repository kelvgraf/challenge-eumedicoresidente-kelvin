// src/app/components/card/__tests__/CardList.test.tsx
import { render, screen } from "@testing-library/react";
import { CardList } from "@/app/components/card";

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
    render(<CardList characters={mockCharacters} />);
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Morty Smith")).toBeInTheDocument();
  });
});
