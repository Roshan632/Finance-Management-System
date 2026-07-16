import {
  FaPlus,
  FaDownload,
  FaSyncAlt,
} from "react-icons/fa";

const ReminderHeader = ({
  setOpen,
  setSelectedReminder,
}) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">

      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Reminder Management
        </h1>

        <p className="text-gray-500 mt-1">
          Create, manage and track your reminders.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">

        {/* Refresh */}
        <button
          className="flex items-center gap-2 border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-lg transition"
        >
          <FaSyncAlt />
          Refresh
        </button>

        {/* Export */}
        <button
          className="flex items-center gap-2 border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-lg transition"
        >
          <FaDownload />
          Export
        </button>

        {/* Add Reminder */}
        <button
          onClick={() => {
            setSelectedReminder(null);
            setOpen(true);
          }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg transition"
        >
          <FaPlus />
          Add Reminder
        </button>

      </div>

    </div>
  );
};

export default ReminderHeader;