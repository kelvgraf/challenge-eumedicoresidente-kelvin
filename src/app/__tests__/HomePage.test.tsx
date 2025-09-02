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

describe("HomePage - Filtro", () => {
  beforeEach(() => {
    (getCharacters as jest.Mock).mockResolvedValue(mockCharacters);
  });

  it("should display filter selects when clicking the Filter button", async () => {
    await act(async () => {
      render(<HomePage />);
    });

    const filterButton = screen.getByRole("button", { name: /Filtrar/i });
    fireEvent.click(filterButton);

    expect(
      screen.getByRole("combobox", { name: /status/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: /species/i })
    ).toBeInTheDocument();
  });

  it("should apply status and species filters", async () => {
    await act(async () => {
      render(<HomePage />);
    });

    const filterButton = screen.getByRole("button", { name: /Filtrar/i });
    fireEvent.click(filterButton);

    const statusSelect = screen.getByRole("combobox", { name: /status/i });
    const speciesSelect = screen.getByRole("combobox", { name: /species/i });

    fireEvent.change(statusSelect, { target: { value: "alive" } });
    fireEvent.change(speciesSelect, { target: { value: "Human" } });

    await waitFor(() => {
      expect(getCharacters).toHaveBeenLastCalledWith(1, "", "alive", "Human");
    });
  });

  it("should clear filters when clicking on the tag buttons", async () => {
    await act(async () => {
      render(<HomePage />);
    });

    await screen.findByText(/Rick Sanchez/i);

    const filterButton = screen.getByRole("button", { name: /Filtrar/i });
    fireEvent.click(filterButton);

    const statusSelect = screen.getByRole("combobox", { name: /status/i });
    fireEvent.change(statusSelect, { target: { value: "dead" } });

    const speciesSelect = screen.getByRole("combobox", { name: /species/i });
    fireEvent.change(speciesSelect, { target: { value: "Human" } });

    fireEvent.click(filterButton);

    const statusTagButton = await screen.findByRole("button", {
      name: /Status: morto/i,
    });
    const speciesTagButton = await screen.findByRole("button", {
      name: /Espécie: Human/i,
    });

    fireEvent.click(statusTagButton);
    fireEvent.click(speciesTagButton);

    await waitFor(() => {
      expect(statusSelect).toHaveValue("");
      expect(speciesSelect).toHaveValue("");
    });
  });
});
