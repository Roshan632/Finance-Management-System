import { FaSearch, FaTimes } from "react-icons/fa";

const ReminderFilters = ({
  search,
  setSearch,
  priority,
  setPriority,
  status,
  setStatus,
  date,
  setDate,
}) => {
  const clearFilters = () => {
    setSearch("");
    setPriority("All");
    setStatus("All");
    setDate("");
  };

  return (
    <div className="bg-white rounded-xl shadow p-5">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Search */}

        <div className="relative ">

          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search reminder..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />

        </div>

        {/* Priority */}

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="All">All Priorities</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>

        {/* Status */}

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="All">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="COMPLETED">Completed</option>
        </select>

        {/* Date */}

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* Clear */}

        <button
          onClick={clearFilters}
          className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-lg px-4 py-2 transition"
        >
          <FaTimes />
          Clear Filters
        </button>

      </div>

    </div>
  );
};

export default ReminderFilters;