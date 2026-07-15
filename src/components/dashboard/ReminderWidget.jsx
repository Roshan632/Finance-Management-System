import Card from "../common/Card";
import { useGetRemindersQuery } from "../../api/reminderApi";
import {
  FaBell,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

const ReminderWidget = () => {
  const { data = [], isLoading, error } = useGetRemindersQuery();

  if (isLoading) {
    return (
      <Card>
        <p className="text-gray-500">Loading reminders...</p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <p className="text-red-500">Failed to load reminders.</p>
      </Card>
    );
  }

  return (
    <Card>

      <div className="flex items-center justify-between mb-5">

        <h2 className="text-xl font-bold">
          Upcoming Reminders
        </h2>

        <FaBell className="text-blue-600 text-xl" />

      </div>

      <div className="space-y-4">

        {data.map((reminder) => (

          <div
            key={reminder.id}
            className="flex items-start justify-between border-b pb-3 last:border-none"
          >

            <div className="flex gap-3">

              <div className="mt-1">

                {reminder.completed ? (
                  <FaCheckCircle className="text-green-600" />
                ) : (
                  <FaClock className="text-orange-500" />
                )}

              </div>

              <div>

                <h3 className="font-semibold">
                  {reminder.title}
                </h3>

                <p className="text-sm text-gray-500">
                  Due: {reminder.dueDate}
                </p>

                <p className="text-sm text-gray-500">
                  Rs. {reminder.amount.toLocaleString()}
                </p>

              </div>

            </div>

            <span
              className={`text-xs px-3 py-1 rounded-full font-medium ${
                reminder.priority === "High"
                  ? "bg-red-100 text-red-600"
                  : reminder.priority === "Medium"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {reminder.priority}
            </span>

          </div>

        ))}

      </div>

    </Card>
  );
};

export default ReminderWidget;