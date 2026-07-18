import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Income from "../pages/Income/IncomePage";
import Expense from "../pages/Expense/ExpensePage";
import Reports from "../pages/Reports/ReportsPage";
import Settings from "../pages/Settings/SettingsPage";
import NotesPage from "../pages/Notes/NotesPage";
import ReminderPage from "../pages/Reminder/ReminderPage";
import LoginPage from "../pages/auth/LoginPage";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>

        <Route path="/" element={<Navigate to="/dashboard" replace />} />
         {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/income" element={<ProtectedRoute><Income/></ProtectedRoute>} />
        <Route path="/expense" element={<ProtectedRoute><Expense /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/note" element={<ProtectedRoute><NotesPage/></ProtectedRoute>}/>
        <Route path="/reminder" element={<ProtectedRoute><ReminderPage/></ProtectedRoute>}/>
          {/* 404 */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;