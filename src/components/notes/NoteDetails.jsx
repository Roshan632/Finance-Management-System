import { FaTimes } from "react-icons/fa";
import { useGetNoteByIdQuery } from "../../api/noteApi";

const NoteDetails = ({
  open,
  onClose,
  noteId,
}) => {

  const {
    data: note,
    isLoading,
  } = useGetNoteByIdQuery(noteId, {
    skip: !noteId,
  });

  if (!open) return null;

  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

        <div className="flex justify-between items-center border-b p-5">

          <h2 className="text-xl font-semibold">
            Note Details
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600"
          >
            <FaTimes size={20}/>
          </button>

        </div>

        {isLoading ? (

          <div className="p-6">
            Loading...
          </div>

        ) : (

          <div className="p-6 space-y-5">

            <div>

              <h3 className="text-sm text-gray-500">
                Title
              </h3>

              <p className="font-semibold text-lg">
                {note?.title}
              </p>

            </div>

            <div>

              <h3 className="text-sm text-gray-500">
                Description
              </h3>

              <p className="whitespace-pre-wrap">
                {note?.description || "-"}
              </p>

            </div>

            <div className="grid md:grid-cols-2 gap-4">

              <div>

                <h3 className="text-sm text-gray-500">
                  Color Label
                </h3>

                <span className="font-medium capitalize">
                  {note?.color_label}
                </span>

              </div>

              <div>

                <h3 className="text-sm text-gray-500">
                  Pinned
                </h3>

                <span>
                  {note?.is_pinned ? "Yes 📌" : "No"}
                </span>

              </div>

              <div>

                <h3 className="text-sm text-gray-500">
                  Archived
                </h3>

                <span>
                  {note?.is_archived ? "Yes 📦" : "No"}
                </span>

              </div>

              <div>

                <h3 className="text-sm text-gray-500">
                  Created At
                </h3>

                <span>
                  {note?.created_at
                    ? new Date(note.created_at).toLocaleString()
                    : "-"}
                </span>

              </div>

              <div>

                <h3 className="text-sm text-gray-500">
                  Updated At
                </h3>

                <span>
                  {note?.updated_at
                    ? new Date(note.updated_at).toLocaleString()
                    : "-"}
                </span>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>

  );

};

export default NoteDetails;