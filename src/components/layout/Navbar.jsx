import { FaBell, FaSearch } from "react-icons/fa";
import { useState,useRef,useEffect } from "react";
import NotificationDropdown from "../dashboard/NotificationDropdown";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import {  FaCog, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

const user = useSelector((state) => state.auth.user);
console.log(user);
useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target)
    ) {
      setShowNotification(false);
    }

    if (
      profileRef.current &&
      !profileRef.current.contains(event.target)
    ) {
      setShowProfile(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
  };
}, []);

const handleLogout = () => {
  dispatch(logout());

  navigate("/login");
};
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Finance Dashboard</h2>

          <p className="text-sm text-gray-500">Track your income & expenses</p>
        </div>

        {/* Right */}
<div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">

  {/* Search */}
  <div className="relative flex-1 w-full sm:w-auto">
    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

    <input
      type="text"
      placeholder="Search..."
      className="w-full lg:w-72 rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none focus:border-green-600"
    />
  </div>

  {/* Notification */}
  <div ref={notificationRef} className="relative">
    <button
      onClick={() => setShowNotification(!showNotification)}
      className="relative flex h-11 w-11 items-center justify-center rounded-xl border hover:bg-gray-100"
    >
      <FaBell className="text-gray-600" />

      <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full"></span>
    </button>

    {showNotification && <NotificationDropdown />}
  </div>

  {/* Admin Info */}
 <div ref={profileRef} className=" relative">

  <button
    onClick={() => setShowProfile(!showProfile)}
    className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-gray-100 transition"
  >

   <div className="h-10 w-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-lg">
  {(user?.user?.name || user?.name)?.charAt(0).toUpperCase()}
</div>

    <div className="text-left border border-red-500 p-2">
  <p className="font-semibold">{user?.user?.name || user?.name}</p>
  <p className="text-xs text-gray-500">{user?.user?.role || user?.role}</p>
</div>

  </button>

  {showProfile && (
    <div className="absolute right-0 mt-3 w-64 rounded-xl bg-white border shadow-xl overflow-hidden transition-all ">

      <div className="p-4 py-3 border-b">

        <p className="font-semibold">
  {user?.user?.name || user?.name}
</p>

<p className="text-sm text-gray-500">
  {user?.user?.email || user?.email}
</p>

      </div>

     

      <button onClick={()=>{
        navigate("/settings")
        setShowProfile(false);
      }}
       className="flex items-center gap-3 w-full px-4 py-3 text-green-600 hover:bg-red-50 transition"
      >
        <FaCog />

        Settings
      </button>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50"
      >
        <FaSignOutAlt />

        Logout
      </button>

    </div>
  )}

</div>

  
  

</div>
</div>
</header>
  )
}

export default Navbar