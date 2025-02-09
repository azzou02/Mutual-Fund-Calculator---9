import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

const Navbar = ({ darkMode, setDarkMode }) => {
  const { logout, user, isAuthenticated } = useAuth0();

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-auto mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section */}
          <div className="flex-shrink-0 flex items-left">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              <Link to="/">Goldman Sachs</Link>
            </h1>
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            
            {/* Navigation Links */}
            {isAuthenticated && (
              <Link
                to="/past-investments"
                className="border border-indigo-700 px-4 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Past Investments
              </Link>
            )}

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
            >
              {darkMode ? (
                <SunIcon className="h-6 w-6 text-gray-200" />
              ) : (
                <MoonIcon className="h-6 w-6 text-indigo-800" />
              )}
            </button>

            {/* User Info */}
            {isAuthenticated && user && (
              <div className="flex items-center space-x-3 border-l border-gray-200 dark:border-gray-700 pl-6 ml-4">
                <img
                  src={user.picture}
                  alt="User"
                  className="w-8 h-8 rounded-full border-2 border-indigo-500"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {user.nickname}
                </span>
              </div>
            )}

            {/* Logout Button */}
            {isAuthenticated && (
              <button
                onClick={() => logout({ returnTo: window.location.origin })}
                className="ml-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
              >
                Log Out
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;