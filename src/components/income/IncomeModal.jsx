
import { FaTimes } from "react-icons/fa";

const IncomeModal = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="
          bg-white
          rounded-xl
          shadow-2xl
          w-full
          max-w-3xl
          max-h-[90vh]
          overflow-y-auto
          relative
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}

        <div className="sticky top-0 bg-white border-b flex items-center justify-between px-6 py-4 rounded-t-xl">

          <h2 className="text-xl font-bold">
            Income Form
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600 text-xl"
          >
            <FaTimes />
          </button>

        </div>

        {/* Body */}

        <div className="p-6">
          {children}
        </div>

      </div>
    </div>
  );
};

export default IncomeModal;


//This file for creating a modal component that can be reused for adding or editing income entries. The modal is displayed when the `open` prop is true, and it can be closed by clicking the close button or by calling the `onClose` function passed as a prop. The content of the modal is passed as children to the component.