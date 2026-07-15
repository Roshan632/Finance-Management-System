import { FaPlus } from "react-icons/fa";

import NoteModal from "./NoteModal";
import NoteForm from "./NoteForm";

const NoteHeader = ({
  open,
  setOpen,
  selectedNote,
  setSelectedNote,
}) => {
  return (
    <>
      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold">
            Notes
          </h1>

          <p className="text-gray-500">
            Manage your personal and office notes
          </p>

        </div>

        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg flex items-center gap-2"
        >
          <FaPlus />

          Add Note
        </button>

      </div>

      <NoteModal
        open={open}
        onClose={() => {
          setOpen(false);
          setSelectedNote(null);
        }}
      >
        <NoteForm
          selectedNote={selectedNote}
          closeModal={() => {
            setOpen(false);
            setSelectedNote(null);
          }}
        />
      </NoteModal>
    </>
  );
};

export default NoteHeader;