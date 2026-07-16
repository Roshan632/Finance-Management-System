import {
  FaEye,
  FaEdit,
  FaTrash,
  FaCheck,
} from "react-icons/fa";

import toast from "react-hot-toast";

import {
  useDeleteReminderMutation,
  useCompleteReminderMutation,
} from "../../api/reminderApi";

const ReminderRow = ({
  reminder,
  onEdit,
  onView,
}) => {
  const [deleteReminder] =
    useDeleteReminderMutation();

  const [completeReminder] =
    useCompleteReminderMutation();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this reminder?"
    );

    if (!confirmed) return;

    try {
      await deleteReminder(reminder.id).unwrap();

      toast.success("Reminder deleted successfully");
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete reminder");
    }
  };

  const handleComplete = async () => {
    try {
      await completeReminder(reminder.id).unwrap();

      toast.success("Reminder marked as completed");
    } catch (err) {
      console.log(err);
      toast.error("Failed to complete reminder");
    }
  };

  return (
    <tr className="border-b hover:bg-gray-50">

      {/* Title */}
      <td className="p-4">
        <div>
          <h3 className="font-semibold">
            {reminder.title}
          </h3>

          <p className="text-sm text-gray-500">
            {reminder.description || "-"}
          </p>
        </div>
      </td>

      {/* Date */}
      <td className="p-4">
        {reminder.reminder_date}
      </td>

      {/* Time */}
      <td className="p-4">
        {reminder.reminder_time}
      </td>

      {/* Priority */}
      <td className="p-4">
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
      </td>

      {/* Repeat */}
      <td className="p-4">
        {reminder.repeat}
      </td>

      {/* Status */}
      <td className="p-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold
          ${
            reminder.status === "COMPLETED"
              ? "bg-green-100 text-green-700"
              : "bg-orange-100 text-orange-700"
          }`}
        >
          {reminder.status}
        </span>
      </td>

      {/* Actions */}
      <td className="p-4">
        <div className="flex items-center justify-center gap-3">

          <button
            onClick={() => onView(reminder.id)}
            className="text-blue-600 hover:text-blue-800"
            title="View"
          >
            <FaEye />
          </button>

          <button
            onClick={() => onEdit(reminder)}
            className="text-green-600 hover:text-green-800"
            title="Edit"
          >
            <FaEdit />
          </button>

          {reminder.status !== "COMPLETED" && (
            <button
              onClick={handleComplete}
              className="text-purple-500 hover:text-purple-800"
              title="Complete"
            >
              <FaCheck />
            </button>
          )}

          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800"
            title="Delete"
          >
            <FaTrash />
          </button>

        </div>
      </td>

    </tr>
  );
};

export default ReminderRow;