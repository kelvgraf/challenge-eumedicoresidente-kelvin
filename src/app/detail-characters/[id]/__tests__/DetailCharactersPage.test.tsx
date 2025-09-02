import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import DetailCharactersPage from "@/app/detail-characters/[id]/page";
import { getCharacterById } from "@/domain/usecases/getCharacterById";
import { useRouter, useParams } from "next/navigation";

jest.mock("@/domain/usecases/getCharacterById");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}));

const mockCharacter = {
  id: "1",
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  gender: "Male",
  origin: { name: "Earth" },
  location: { name: "Earth" },
  episode: [
    { id: "1", name: "Pilot", episode: "S01E01" },
    { id: "2", name: "Lawnmower Dog", episode: "S01E02" },
  ],
  image: "/rick.png",
};

describe("DetailCharactersPage", () => {
  const backMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ back: backMock });
    (useParams as jest.Mock).mockReturnValue({ id: "1" });
  });

  it("should render loading state initially", () => {
    (getCharacterById as jest.Mock).mockReturnValue(new Promise(() => {}));
    render(<DetailCharactersPage />);
    expect(
      screen.getByText(/Carregando informações do personagem.../i)
    ).toBeInTheDocument();
  });

  it("should render character details", async () => {
    (getCharacterById as jest.Mock).mockResolvedValue(mockCharacter);
    render(<DetailCharactersPage />);

    await waitFor(() => {
      expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
      expect(
        screen.getByText(/Participou de 2 episódios/i)
      ).toBeInTheDocument();
      expect(screen.getByText("Vivo")).toBeInTheDocument();
      expect(screen.getByText("Human")).toBeInTheDocument();
      expect(screen.getByText("Masculino")).toBeInTheDocument();
    });
  });

  it("should render not found message if character is null", async () => {
    (getCharacterById as jest.Mock).mockResolvedValue(null);
    render(<DetailCharactersPage />);

    await waitFor(() => {
      expect(
        screen.getByText(/Personagem não encontrado./i)
      ).toBeInTheDocument();
    });
  });

  it("should go back when clicking back button", async () => {
    (getCharacterById as jest.Mock).mockResolvedValue(mockCharacter);
    render(<DetailCharactersPage />);

    await waitFor(() => {
      const backButton = screen.getByText(/Voltar/i);
      fireEvent.click(backButton);
      expect(backMock).toHaveBeenCalled();
    });
  });
});
