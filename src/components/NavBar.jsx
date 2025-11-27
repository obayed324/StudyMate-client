import { Link, NavLink } from "react-router"; 
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { GoHomeFill } from "react-icons/go";
import { FaUser, FaUserFriends } from "react-icons/fa";
import { MdConnectWithoutContact } from "react-icons/md";
import { IoLogIn, IoLogOut, IoPersonAddSharp } from "react-icons/io5";
import { toast } from "react-toastify";

const NavBar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => setTheme(checked ? "dark" : "light");

  const handleLogout = () => {
    signOutUser()
      .then(() => toast.success("You have successfully logged out!"))
      .catch((err) => toast.error(err.message || "Logout failed!"));
  };

  // Utility for active link classes
  const activeClass = ({ isActive }) =>
    `flex items-center gap-1 transition-colors duration-200 ${
      isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"
    }`;

  return (
    <nav className="shadow-md py-3 px-4 md:px-8 sticky top-0 z-50 rounded-full bg-white">
      <div className="max-w-8xl mx-auto flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
        >
          StudyMate
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-6 items-center font-medium">
          <li>
            <NavLink to="/" className={activeClass}>
              <GoHomeFill className="inline-block" /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/allPartner" className={activeClass}>
              <FaUserFriends className="inline-block" /> Find Partners
            </NavLink>
          </li>
          {user && (
            <>
              <li>
                <NavLink to="/create-profile" className={activeClass}>
                  <IoPersonAddSharp className="inline-block" /> Create Partner Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/my-connections" className={activeClass}>
                  <MdConnectWithoutContact className="inline-block" /> My Connections
                </NavLink>
              </li>
            </>
          )}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <input
            type="checkbox"
            className="toggle toggle-sm"
            onChange={(e) => handleTheme(e.target.checked)}
            defaultChecked={theme === "dark"}
          />

          {/* Auth Buttons / Avatar */}
          {!user ? (
            <>
              <Link to="/auth/login" className="btn btn-sm bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-full">
                <IoLogIn /> Login
              </Link>
              <Link to="/auth/register" className="btn btn-sm bg-linear-to-r from-green-500 to-teal-500 text-white rounded-full">
                Register
              </Link>
            </>
          ) : (
            <div className="dropdown dropdown-end relative">
              {/* Avatar */}
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar border border-gray-300 hover:border-blue-400 transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={user.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                    alt={user.displayName || "User"}
                    className="object-cover w-full h-full"
                    onError={(e) => (e.currentTarget.src = "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp")}
                  />
                </div>
              </label>

              {/* Dropdown Menu */}
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-xl mt-3 shadow-xl border w-64 overflow-hidden animate-slide-down"
              >
                {/* User Info */}
                <li className="px-4 py-3 border-b bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                  <p className="font-semibold truncate" title={user.displayName}>{user.displayName}</p>
                  <p className="text-xs text-gray-500 truncate" title={user.email}>{user.email}</p>
                </li>

                {/* Profile Link */}
                <li className="px-4 py-2 hover:bg-blue-50 transition-colors duration-200 rounded-md mx-2 my-1">
                  <Link to="/profile" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                    <FaUser /> Profile
                  </Link>
                </li>

                {/* Logout Button */}
                <li className="px-4 py-2">
                  <button
                    onClick={handleLogout}
                    className="btn w-full bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full transition-transform duration-200 transform hover:scale-105"
                  >
                    <IoLogOut /> Logout
                  </button>
                </li>
              </ul>
            </div>
          )}

          {/* Mobile Dropdown */}
          <div className="dropdown md:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-circle ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-50 p-3 shadow bg-base-100 rounded-xl w-56 right-0 absolute border">
              <li>
                <NavLink to="/" className={activeClass}><GoHomeFill /> Home</NavLink>
              </li>
              <li>
                <NavLink to="/allPartner" className={activeClass}><FaUserFriends /> Find Partners</NavLink>
              </li>
              {user && (
                <>
                  <li>
                    <NavLink to="/create-profile" className={activeClass}><IoPersonAddSharp /> Create Partner Profile</NavLink>
                  </li>
                  <li>
                    <NavLink to="/my-connections" className={activeClass}><MdConnectWithoutContact /> My Connections</NavLink>
                  </li>
                </>
              )}
              <li className="mt-2 border-t pt-2">
                <label className="flex items-center gap-2">
                  Dark Mode
                  <input type="checkbox" className="toggle toggle-sm" onChange={(e) => handleTheme(e.target.checked)} defaultChecked={theme === "dark"} />
                </label>
              </li>
              {!user ? (
                <>
                  <li className="mt-2"><Link to="/auth/login" className="btn btn-sm w-full bg-linear-to-r from-blue-500 to-purple-500 text-white">Login</Link></li>
                  <li className="mt-1"><Link to="/auth/register" className="btn btn-sm w-full bg-linear-to-r from-green-500 to-teal-500 text-white">Register</Link></li>
                </>
              ) : (
                <li className="mt-2">
                  <button onClick={signOutUser} className="btn btn-sm w-full bg-linear-to-r from-red-500 to-pink-500 text-white">Logout</button>
                </li>
              )}
            </ul>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default NavBar;
