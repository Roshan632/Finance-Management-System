import { HiOutlineCalendarDays } from "react-icons/hi2";

const DashboardHeader = () => {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Good Morning 👋
        </h1>

        <p className="text-slate-500 mt-2">
          Welcome back! Here's your financial overview.
        </p>
      </div>

      <div className="mt-5 lg:mt-0 bg-white border rounded-xl px-5 py-3 shadow-sm flex items-center gap-3">
        <HiOutlineCalendarDays className="text-green-600 text-xl" />

        <span className="text-gray-600">
          {today}
        </span>
      </div>
    </div>
  );
};

export default DashboardHeader;