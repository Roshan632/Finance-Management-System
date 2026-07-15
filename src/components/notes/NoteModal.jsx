import { FaTimes } from "react-icons/fa";

const NoteModal = ({
  open,
  onClose,
  children,
}) => {

  if (!open) return null;

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

        <div className="flex justify-between items-center border-b p-5">

          <h2 className="text-xl font-semibold">
            Note
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600 text-xl"
          >
            <FaTimes />
          </button>

        </div>

        <div className="p-5">

          {children}

        </div>

      </div>

    </div>

  );
};

export default NoteModal;