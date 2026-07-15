import {FaEye,FaEdit,FaTrash,FaThumbtack, FaArchive, FaClock,} from "react-icons/fa";
import toast from "react-hot-toast";

import {useDeleteNoteMutation,useToggleArchiveMutation, useTogglePinMutation,} from "../../api/noteApi";

const colorClasses = {
  blue: "border-blue-500 bg-blue-50",
  green: "border-green-500 bg-green-50",
  yellow: "border-yellow-500 bg-yellow-50",
  red: "border-red-500 bg-red-50",
  purple: "border-purple-500 bg-purple-50",
};

const badgeClasses = {
  blue: "bg-blue-100 text-blue-700",
  green: "bg-green-100 text-green-700",
  yellow: "bg-yellow-100 text-yellow-700",
  red: "bg-red-100 text-red-700",
  purple: "bg-purple-100 text-purple-700",
};

const NoteCard = ({
  note,
  onEdit,
  onView,
}) => {

  const [deleteNote] = useDeleteNoteMutation();
  const [togglePin] = useTogglePinMutation();
  const [toggleArchive] = useToggleArchiveMutation();

  const handleDelete = async () => {

    if (!window.confirm("Delete this note?")) return;

    try {
      await deleteNote(note.id).unwrap();
      toast.success("Note deleted");
    } catch {
      toast.error("Delete failed");
    }

  };

  const handlePin = async () => {

    try {

      await togglePin(note.id).unwrap();

      toast.success(
        note.is_pinned
          ? "Note unpinned"
          : "Note pinned"
      );

    } catch {

      toast.error("Operation failed");

    }

  };

  const handleArchive = async () => {

    try {

      await toggleArchive(note.id).unwrap();

      toast.success(
        note.is_archived
          ? "Note restored"
          : "Note archived"
      );

    } catch {

      toast.error("Operation failed");

    }

  };

  return (

    <div
      className={`border-t-4 rounded-xl shadow bg-white hover:shadow-lg transition duration-300 flex flex-col ${
        colorClasses[note.color_label] || colorClasses.blue
      }`}
    >

      {/* Header */}

      <div className="p-5 flex justify-between items-start">

        <div>

          <h3 className="font-bold text-lg">

            {note.title}

          </h3>

          <span
            className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
              badgeClasses[note.color_label] || badgeClasses.blue
            }`}
          >
            {note.color_label}
          </span>

        </div>

        <div className="flex gap-2">

          {note.is_pinned && (
            <FaThumbtack
              className="text-yellow-500"
              title="Pinned"
            />
          )}

          {note.is_archived && (
            <FaArchive
              className="text-orange-500"
              title="Archived"
            />
          )}

        </div>

      </div>

      {/* Description */}

      <div className="px-5 grow">

        <p className="text-gray-600 text-sm line-clamp-4">

          {note.description || "No description"}

        </p>

      </div>

      {/* Footer */}

      <div className="px-5 py-4 border-t mt-4">

        <div className="flex items-center text-xs text-gray-500 mb-4">

          <FaClock className="mr-2"/>

          {new Date(
            note.updated_at || note.created_at
          ).toLocaleDateString()}

        </div>

        <div className="flex justify-between">

          <button
            onClick={() => onView(note.id)}
            className="text-blue-600 hover:text-blue-800"
            title="View"
          >
            <FaEye size={18}/>
          </button>

          <button
            onClick={() => onEdit(note)}
            className="text-green-600 hover:text-green-800"
            title="Edit"
          >
            <FaEdit size={18}/>
          </button>

          <button
            onClick={handlePin}
            className={
              note.is_pinned
                ? "text-yellow-600"
                : "text-gray-500"
            }
            title="Pin"
          >
            <FaThumbtack size={18}/>
          </button>

          <button
            onClick={handleArchive}
            className={
              note.is_archived
                ? "text-orange-600"
                : "text-gray-500"
            }
            title="Archive"
          >
            <FaArchive size={18}/>
          </button>

          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800"
            title="Delete"
          >
            <FaTrash size={18}/>
          </button>

        </div>

      </div>

    </div>

  );

};

export default NoteCard;