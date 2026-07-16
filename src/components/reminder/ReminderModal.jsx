import { FaTimes } from "react-icons/fa";
import ReminderForm from "./ReminderForm";

const ReminderModal = ({
  open,
  closeModal,
  selectedReminder,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

        <div className="flex justify-between items-center p-5 border-b">

          <h2 className="text-xl font-bold">
            {selectedReminder
              ? "Update Reminder"
              : "Add Reminder"}
          </h2>

          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-red-600"
          >
            <FaTimes size={20} />
          </button>

        </div>

        <div className="p-5">

          <ReminderForm
            selectedReminder={selectedReminder}
            closeModal={closeModal}
          />

        </div>

      </div>

    </div>
  );
};

export default ReminderModal;