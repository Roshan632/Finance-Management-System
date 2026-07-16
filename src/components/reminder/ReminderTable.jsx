import { useState } from "react";
import { useGetRemindersQuery } from "../../api/reminderApi";
import ReminderRow from "./ReminderRow";


const ReminderTable = ({
  search,
  filter,
  onEdit,
  onView,
}) => {
  const { data = [], isLoading } = useGetRemindersQuery();

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  if (isLoading) {
    return <p> Loading...</p>
  }

  let reminders = data.filter((reminder) => {
    const matchesSearch =
      reminder.title
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      reminder.description
        ?.toLowerCase()
        .includes(search.toLowerCase());

    if (filter === "Pending")
      return (
        matchesSearch &&
        reminder.status === "PENDING"
      );

    if (filter === "Completed")
      return (
        matchesSearch &&
        reminder.status === "COMPLETED"
      );

    if (filter === "High")
      return (
        matchesSearch &&
        reminder.priority === "HIGH"
      );

    if (filter === "Medium")
      return (
        matchesSearch &&
        reminder.priority === "MEDIUM"
      );

    if (filter === "Low")
      return (
        matchesSearch &&
        reminder.priority === "LOW"
      );

    return matchesSearch;
  });

  const totalPages = Math.ceil(
    reminders.length / recordsPerPage
  );

  const startIndex =
    (currentPage - 1) * recordsPerPage;

  const paginatedReminders = reminders.slice(
    startIndex,
    startIndex + recordsPerPage
  );

  if (!reminders.length) {
    return (
      <div className="bg-white rounded-xl shadow p-12 text-center">
        <h2 className="text-xl font-semibold">
          No Reminders Found
        </h2>

        <p className="text-gray-500 mt-2">
          Create your first reminder.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">Title</th>
              <th className="text-left p-4">Date</th>
              <th className="text-left p-4">Time</th>
              <th className="text-left p-4">Priority</th>
              <th className="text-left p-4">Repeat</th>
              <th className="text-left p-4">Status</th>
              <th className="text-center p-4">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {paginatedReminders.map((reminder) => (
              <ReminderRow
                key={reminder.id}
                reminder={reminder}
                onEdit={onEdit}
                onView={onView}
              />
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6">
          <p className="text-sm text-gray-500">
            Showing {startIndex + 1}–
            {Math.min(
              startIndex + recordsPerPage,
              reminders.length
            )}{" "}
            of {reminders.length}
          </p>

          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((p) => p - 1)
              }
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Previous
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => (
                <button
                  key={index}
                  onClick={() =>
                    setCurrentPage(index + 1)
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
                setCurrentPage((p) => p + 1)
              }
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ReminderTable;