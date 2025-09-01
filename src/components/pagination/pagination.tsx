import { Icons } from "@/components/icon";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const visiblePages = Array.from(
    { length: totalPages },
    (_, i) => i + 1
  ).slice(Math.max(0, currentPage - 3), Math.min(totalPages, currentPage + 2));

  return (
    <div className="flex items-center justify-center gap-2 ">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded bg-primary-800  text-white disabled:opacity-50"
      >
        <Icons size={28} name="ArrowLeft2" color="var(--neutral-100)" />
      </button>

      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded ${
            page === currentPage
              ? "bg-primary-700 text-white hover:bg-primary-600"
              : "bg-primary-800 text-white hover:bg-primary-700"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded bg-primary-800 text-white disabled:opacity-50"
      >
        <Icons size={28} name="ArrowRight2" color="var(--neutral-100)" />
      </button>
    </div>
  );
}

export { Pagination };
