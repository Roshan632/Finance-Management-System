import {
  FaChartPie,
  FaWallet,
  FaMoneyBillWave,
  FaChartBar,
  FaCog,
} from "react-icons/fa";
import { FaNotesMedical } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    path: "/",
    icon: <FaChartPie />,
  },
  {
    title: "Income",
    path: "/income",
    icon: <FaWallet />,
  },
  {
    title: "Expense",
    path: "/expense",
    icon: <FaMoneyBillWave />,
  },
  {
    title: "Notes",
    path: "/note",
    icon: <FaNotesMedical />,
  },
  {
    title: "Reports",
    path: "/reports",
    icon: <FaChartBar />,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <FaCog />,
  },
];

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 shadow-sm flex flex-col">

      {/* Logo */}
      <div className="h-20 flex items-center justify-center border-b">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-green-600 text-white flex items-center justify-center font-bold">
            F
          </div>

          <div>
            <h2 className="font-bold text-lg">
              FinanceMS
            </h2>

            <p className="text-xs text-gray-500">
              Management
            </p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6">

        {menuItems.map((item) => (

          <NavLink
            key={item.title}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 rounded-xl px-4 py-3 mb-2 transition-all duration-200 ${
                isActive
                  ? "bg-green-600 text-white shadow"
                  : "text-slate-600 hover:bg-slate-100"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>

            <span>{item.title}</span>

          </NavLink>

        ))}

      </nav>

      {/* Bottom User */}
      <div className="border-t p-4">

        <div className="flex items-center gap-3">

          <img
            src="https://i.pravatar.cc/100"
            alt="profile"
            className="w-11 h-11 rounded-full"
          />

          <div>

            <h3 className="font-semibold">
              Roshan
            </h3>

            <p className="text-xs text-gray-500">
              Finance Admin
            </p>

          </div>

        </div>

      </div>

    </aside>
  );
};

export default Sidebar;