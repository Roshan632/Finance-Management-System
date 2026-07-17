import { Link } from "react-router-dom";
import { useGetRemindersQuery } from "../../api/reminderApi";

const NotificationDropdown = () => {
  const { data = [] } = useGetRemindersQuery();

  const today = new Date();

  const upcoming = data
    .filter((item) => {
      if (item.status === "COMPLETED") return false;

      const reminderDate = new Date(item.reminder_date);

      const diff =
        (reminderDate - today) /
        (1000 * 60 * 60 * 24);

      return diff >= 0 && diff <= 7;
    })
    .sort(
      (a, b) =>
        new Date(a.reminder_date) -
        new Date(b.reminder_date)
    );

  return (
    <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-xl border z-50">

      <div className="p-4 border-b">

        <h3 className="font-bold">
          Notifications
        </h3>

      </div>

      {upcoming.length === 0 ? (
        <div className="p-5 text-center text-gray-500">
          No upcoming reminders
        </div>
      ) : (
        upcoming.map((item) => (
          <div
            key={item.id}
            className="px-4 py-3 border-b hover:bg-gray-50"
          >
            <h4 className="font-semibold">
              {item.title}
            </h4>

            <p className="text-sm text-gray-500">
              {item.reminder_date}
            </p>
          </div>
        ))
      )}

      <Link
        to="/reminder"
        className="block p-4 text-center text-blue-600 font-semibold hover:bg-gray-50"
      >
        View All Reminders
      </Link>

    </div>
  );
};

export default NotificationDropdown;