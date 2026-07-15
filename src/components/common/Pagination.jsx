const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {

  if (totalPages <= 1) return null;

  return (

    <div className="flex justify-center items-center gap-2 mt-8">

      <button
        disabled={currentPage === 1}
        onClick={() =>
          onPageChange(currentPage - 1)
        }
        className="px-4 py-2 border rounded disabled:opacity-40"
      >
        Previous
      </button>

      {Array.from(
        { length: totalPages },
        (_, index) => (

          <button
            key={index}
            onClick={() =>
              onPageChange(index + 1)
            }
            className={`px-4 py-2 rounded ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "border"
            }`}
          >
            {index + 1}
          </button>

        )
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() =>
          onPageChange(currentPage + 1)
        }
        className="px-4 py-2 border rounded disabled:opacity-40"
      >
        Next
      </button>

    </div>

  );
};

export default Pagination;