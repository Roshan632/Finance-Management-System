import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="bg-slate-100 min-h-screen">

      <Sidebar />

      <div className="ml-64">

        <Navbar />

        <main className="p-8">
          {children}
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;