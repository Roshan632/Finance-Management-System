import { useGetNotesQuery } from "../../api/noteApi";
import NoteCard from "./NoteCard";
import NoteCardSkeleton from "./NoteCardSkeleton";
import Pagination from "../common/Pagination";

const NoteGrid = ({
  search,
  filter,
  page,
  limit,
  setPage,
  onEdit,
  onView,
}) => {

  const { data = [], isLoading } = useGetNotesQuery();

  if (isLoading) {
    return (
     

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {Array.from({ length: 6 }).map((_, index) => (

          <NoteCardSkeleton key={index} />
        ))}
      </div>
      );
    }
        
   

  let notes = data.filter((note) => {

    const matchesSearch =
      note.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      note.description
        .toLowerCase()
        .includes(search.toLowerCase());

    if (filter === "Pinned")
      return matchesSearch && note.is_pinned;

    if (filter === "Archived")
      return matchesSearch && note.is_archived;

    if (filter === "Active")
      return matchesSearch && !note.is_archived;

    return matchesSearch;

  });

  const totalPages = Math.ceil(notes.length / limit);

const startIndex = (page - 1) * limit;

const paginatedNotes = notes.slice(
  startIndex,
  startIndex + limit
);

  

  if (!notes.length) {
    return (
      <div className="bg-white rounded-xl p-16 text-center shadow">

        <h2 className="text-xl font-semibold">
          No Notes Found
        </h2>

        <p className="text-gray-500 mt-2">
          Create your first note.
        </p>

      </div>
    );
  }

  return (
    <>

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

      {paginatedNotes.map((note) => (

        <NoteCard
          key={note.id}
          note={note}
          onEdit={onEdit}
          onView={onView}
        />

      ))}

    </div>

     <Pagination
      currentPage={page}
      totalPages={totalPages}
      onPageChange={setPage}
    />
    </>

  );

};

export default NoteGrid;