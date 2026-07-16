import { useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import ReminderHeader from "../../components/reminder/ReminderHeader";
import ReminderFilters from "../../components/reminder/ReminderFilters";

import ReminderModal from "../../components/reminder/ReminderModal";
import ReminderViewModal from "../../components/reminder/ReminderViewModal";
import ReminderTable from "../../components/reminder/ReminderTable";

const ReminderPage = () => {
  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("All");

  const [priority, setPriority] = useState("All");

  const [date, setDate] = useState("");

  const [open, setOpen] = useState(false);

  const [selectedReminder, setSelectedReminder] = useState(null);

  const [viewOpen, setViewOpen] = useState(false);

  const [viewReminderId, setViewReminderId] = useState(null);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <ReminderHeader
         
          setOpen={setOpen} 
          setSelectedReminder={setSelectedReminder}
        />

        <ReminderFilters
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          priority={priority}
          setPriority={setPriority}
          date={date}
          setDate={setDate}
        />

        
      
        <ReminderTable
  search={search}
  status={status}
  priority={priority}
  date={date}
  onEdit={(reminder) => {
    setSelectedReminder(reminder);
    setOpen(true);
  }}
  onView={(id) => {
    setViewReminderId(id);
    setViewOpen(true);
  }}
/>

        <ReminderModal
          open={open}
          closeModal={() => {
            setOpen(false);
            setSelectedReminder(null);
          }}
          selectedReminder={selectedReminder}
        />

        <ReminderViewModal
          open={viewOpen}
          closeModal={() => {
            setViewOpen(false);
            setViewReminderId(null);
          }}
          reminderId={viewReminderId}
        />
      </div>
    </DashboardLayout>
  );
};

export default ReminderPage;