import { FaSearch } from "react-icons/fa";

const NoteFilters = ({
  search,
  setSearch,
 filter,
  setFilter,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-5">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="relative">

          <FaSearch className="absolute left-3 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg pl-10 pr-3 py-3"
          />

        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded-lg px-3 py-3"
        >
          <option value="All">All Notes</option>
          <option value="Pinned">Pinned</option>
          <option value="Archived">Archived</option>
          <option value="Active">Active</option>
        </select>

      </div>

    </div>
  );
};

export default NoteFilters;