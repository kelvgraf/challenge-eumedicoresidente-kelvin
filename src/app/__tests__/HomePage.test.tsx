import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import HomePage from "@/app/page";
import { getCharacters } from "@/domain/usecases/getCharacters";

jest.mock("@/domain/usecases/getCharacters");
jest.mock("@/hooks/useDebouce", () => ({
  __esModule: true,
  default: (value: string) => value,
}));
jest.mock("@/hooks/useTimeou", () => ({
  useTimeout: () => true,
}));

const mockCharacters = {
  info: { pages: 2 },
  results: [{ id: 1, name: "Rick Sanchez", status: "Alive", species: "Human" }],
};

describe("HomePage", () => {
  beforeEach(() => {
    (getCharacters as jest.Mock).mockResolvedValue(mockCharacters);
  });

  it("deve buscar e renderizar os personagens", async () => {
    await act(async () => {
      render(<HomePage />);
    });

    await waitFor(() => {
      expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
    });
  });

  it("deve limpar o campo de busca", async () => {
    await act(async () => {
      render(<HomePage />);
    });

    const input = screen.getByPlaceholderText(/busque pelo nome/i);
    fireEvent.change(input, { target: { value: "Morty" } });
    expect(input).toHaveValue("Morty");

    const clearButton = screen.getByRole("button", { name: /clear/i });
    fireEvent.click(clearButton);
    expect(input).toHaveValue("");
  });
});
