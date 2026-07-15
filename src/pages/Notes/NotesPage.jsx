import { useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import NoteHeader from "../../components/notes/NoteHeader";
import NoteFilters from "../../components/notes/NoteFilter";
import NoteGrid from "../../components/notes/NoteGrid";
import NoteDetails from "../../components/notes/NoteDetails";

const NotesPage = () => {

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");

  const [selectedNote, setSelectedNote] = useState(null);

  const [open, setOpen] = useState(false);

  const [viewId, setViewId] = useState(null);

  const [viewOpen, setViewOpen] = useState(false);

  const [page,setPage]=useState(1);
  const limit=6;

  return (
    <DashboardLayout>

      <div className="space-y-6">

        <NoteHeader
          open={open}
          setOpen={setOpen}
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
        />

        <NoteFilters
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
        />

        <NoteGrid
          search={search}
          filter={filter}
          page={page}
          limit={limit}
          setPage={setPage}
          onEdit={(note) => {
            setSelectedNote(note);
            setOpen(true);
          }}
          onView={(id) => {
            setViewId(id);
            setViewOpen(true);
          }}
        />

        <NoteDetails
          open={viewOpen}
          onClose={() => setViewOpen(false)}
          noteId={viewId}
          
        />

      </div>

    </DashboardLayout>
  );
};

export default NotesPage;