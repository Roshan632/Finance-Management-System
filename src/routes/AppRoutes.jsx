import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Income from "../pages/Income/IncomePage";
import Expense from "../pages/Expense/ExpensePage";
import Reports from "../pages/Reports/ReportsPage";
import Settings from "../pages/Settings/SettingsPage";
import NotesPage from "../pages/Notes/NotesPage";

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
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;