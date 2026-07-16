import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Income from "../pages/Income/IncomePage";
import Expense from "../pages/Expense/ExpensePage";
import Reports from "../pages/Reports/ReportsPage";
import Settings from "../pages/Settings/SettingsPage";
import NotesPage from "../pages/Notes/NotesPage";
import ReminderPage from "../pages/Reminder/ReminderPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/income" element={<Income/>} />
        <Route path="/expense" element={<Expense />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/note" element={<NotesPage/>}/>
        <Route path="/reminder" element={<ReminderPage/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;