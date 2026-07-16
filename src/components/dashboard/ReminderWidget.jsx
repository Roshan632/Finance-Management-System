import Card from "../common/Card";
import { useGetRemindersQuery } from "../../api/reminderApi";
import {
  FaBell,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

const ReminderWidget = () => {
  const {
    data = [],
    isLoading,
    error,
  } = useGetRemindersQuery();

  if (isLoading) {
    return (
      <Card>
        <p className="text-gray-500">
          Loading reminders...
        </p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <p className="text-red-500">
          Failed to load reminders.
        </p>
      </Card>
    );
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const next7Days = new Date();
  next7Days.setDate(today.getDate() + 7);
  next7Days.setHours(23, 59, 59, 999);

  const upcomingReminders = data
    .filter((reminder) => {
      if (reminder.status === "COMPLETED") return false;

      const reminderDate = new Date(reminder.reminder_date);

      return (
        reminderDate >= today &&
        reminderDate <= next7Days
      );
    })
    .sort(
      (a, b) =>
        new Date(a.reminder_date) -
        new Date(b.reminder_date)
    );

  return (
    <Card>

      <div className="flex items-center justify-between mb-5">

        <h2 className="text-xl font-bold">
          Upcoming Reminders
        </h2>

        <FaBell className="text-blue-600 text-xl" />

      </div>

      {upcomingReminders.length === 0 ? (

        <div className="py-10 text-center">

          <FaCheckCircle className="mx-auto text-4xl text-green-500 mb-3" />

          <p className="text-gray-500">
            No reminders due within the next 7 days.
          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {upcomingReminders.map((reminder) => (

            <div
              key={reminder.id}
              className="border rounded-xl p-4 hover:bg-gray-50 transition"
            >

              <div className="flex justify-between items-start">

                <div className="flex gap-3">

                  <FaClock className="mt-1 text-orange-500" />

                  <div>

                    <h3 className="font-semibold">
                      {reminder.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {reminder.description || "No description"}
                    </p>

                    <div className="flex gap-4 mt-2 text-sm text-gray-600">

                      <span>
                        📅 {reminder.reminder_date}
                      </span>

                      <span>
                        🕒 {reminder.reminder_time}
                      </span>

                    </div>

                  </div>

                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold
                  ${
                    reminder.priority === "HIGH"
                      ? "bg-red-100 text-red-700"
                      : reminder.priority === "MEDIUM"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {reminder.priority}
                </span>

              </div>

            </div>

          ))}

        </div>

      )}

    </Card>
  );
};

export default ReminderWidget;