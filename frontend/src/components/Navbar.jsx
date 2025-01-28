import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = ({ darkMode, setDarkMode }) => {
  const { logout, user, isAuthenticated } = useAuth0(); // Auth0 hooks

  return (
    <nav className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* App Logo */}
        <h1 className="text-2xl font-bold">
          <Link to="/">Goldman Sachs</Link>
        </h1>

      
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-300 dark:bg-gray-600 text-black font-medium dark:text-white px-4 py-2 rounded hover:bg-gray-400 transition duration-150"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          {/* Navigation Links */}
          {isAuthenticated && (
            <Link
              to="/past-investments"
              className="text-indigo-600 dark:text-indigo-300 font-semibold hover:underline"
            >
              Past Investments
            </Link>
          )}

          {/* User Info (Optional) */}
          {isAuthenticated && user && (
            <div className="flex items-center space-x-2 border-solid">
              <img
                src={user.picture}
                alt="User"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm">{user.nickname}</span>
            </div>
          )}

          {/* Logout Button */}
          {isAuthenticated && (
            <button
              onClick={() =>
                logout({
                  returnTo: window.location.origin, // Redirect to home after logout
                })
              }

              className="bg-indigo-600 text-white px-4 py-2 rounded font-medium hover:bg-indigo-800 transition duration-150"
            >
              Log Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
