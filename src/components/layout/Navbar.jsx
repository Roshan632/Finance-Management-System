import { FaBell, FaSearch } from "react-icons/fa";
import { useState } from "react";
import NotificationDropdown from "../dashboard/NotificationDropdown";

const Navbar = () => {
  const [showNotification, setShowNotification] = useState(false);
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Finance Dashboard</h2>

          <p className="text-sm text-gray-500">Track your income & expenses</p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3 w-full lg:w-auto">
          {/* Search */}
          <div className="relative flex-1 lg:flex-none">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search..."
              className="w-full lg:w-72 rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none focus:border-green-600"
            />
          </div>

          {/* Notification */}
          <div className="relative">
            <button
              onClick={() => setShowNotification(!showNotification)}
              className="relative flex h-11 w-11 items-center justify-center rounded-xl border hover:bg-gray-100"
            >
              <FaBell />

              <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            {showNotification && <NotificationDropdown />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
