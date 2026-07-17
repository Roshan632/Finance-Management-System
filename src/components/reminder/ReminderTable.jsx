import {  useState } from "react";
import { useGetRemindersQuery } from "../../api/reminderApi";
import ReminderRow from "./ReminderRow";

const ReminderTable = ({
  search,
  status,
  priority,
  date,
  
  onEdit,
  onView,
  
}) => {
  const { data = [], isLoading } = useGetRemindersQuery();

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

 

  const changePage = (page) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow border p-10 text-center">
        <p className="text-gray-500">
          Loading reminders...
        </p>
      </div>
    );
  }

  const reminders = data.filter((reminder) => {
  const matchesSearch =
    reminder.title
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||
    reminder.description
      ?.toLowerCase()
      .includes(search.toLowerCase());

  const matchesStatus =
    status === "All" ||
    reminder.status === status;

  const matchesPriority =
    priority === "All" ||
    reminder.priority === priority;

  const matchesDate =
    !date ||
    reminder.reminder_date === date;

  return (
    matchesSearch &&
    matchesStatus &&
    matchesPriority &&
    matchesDate
  );
});

  if (!reminders.length) {
    return (
      <div className="bg-white rounded-xl shadow border p-16 text-center">
        <h2 className="text-xl font-semibold">
          No Reminders Found
        </h2>

        <p className="text-gray-500 mt-2">
          Create your first reminder.
        </p>
      </div>
    );
  }

  const totalPages = Math.ceil(
    reminders.length / recordsPerPage
  );

  const startIndex =
    (currentPage - 1) * recordsPerPage;

  const paginatedReminders = reminders.slice(
    startIndex,
    startIndex + recordsPerPage
  );

  return (
    <>
      <div className="overflow-x-auto rounded-xl border bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200">

          <thead className="bg-gray-50">

            <tr>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Title
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Date
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Time
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Priority
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Repeat
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Status
              </th>

              <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-600">
                Actions
              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-gray-100">

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

        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <p className="text-sm text-gray-500">

            Showing {startIndex + 1} to{" "}
            {Math.min(
              startIndex + recordsPerPage,
              reminders.length
            )}{" "}
            of {reminders.length} reminders

          </p>

          <div className="flex flex-wrap items-center justify-center gap-2">

            <button
              disabled={currentPage === 1}
              onClick={() =>
                changePage(currentPage - 1)
              }
              className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => (

                <button
                  key={index}
                  onClick={() =>
                    changePage(index + 1)
                  }
                  className={`rounded-lg px-4 py-2 text-sm transition ${
                    currentPage === index + 1
                      ? "bg-blue-600 text-white"
                      : "border hover:bg-gray-100"
                  }`}
                >
                  {index + 1}
                </button>

              )
            )}

            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                changePage(currentPage + 1)
              }
              className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
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