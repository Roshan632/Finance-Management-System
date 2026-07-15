import { FaBell, FaSearch } from "react-icons/fa";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-30 h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8">

      <div>

        <h2 className="text-2xl font-bold">
          Finance Dashboard
        </h2>

        <p className="text-sm text-gray-500">
          Track your income & expenses
        </p>

      </div>

      <div className="flex items-center gap-6">

        <div className="relative">

          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search..."
            className="w-72 rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none focus:border-green-600"
          />

        </div>

        <button className="relative">

          <FaBell className="text-xl text-gray-600" />

          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500"></span>

        </button>

      </div>

    </header>
  );
};

export default Navbar;