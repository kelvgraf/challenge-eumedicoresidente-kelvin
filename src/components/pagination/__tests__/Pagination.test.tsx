import { render, screen, fireEvent } from "@testing-library/react";
import { Pagination } from "@/components/pagination";

describe("Pagination", () => {
  it("calls onPageChange with the correct page number", () => {
    const handlePageChange = jest.fn();
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={handlePageChange}
      />
    );

    fireEvent.click(screen.getByText("2"));

    expect(handlePageChange).toHaveBeenCalledWith(2);
  });
});
