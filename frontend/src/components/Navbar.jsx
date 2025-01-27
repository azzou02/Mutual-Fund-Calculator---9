import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = ({ darkMode, setDarkMode }) => {
  const { logout, user, isAuthenticated } = useAuth0(); // Auth0 hooks for logout and user info

  return (
    <nav className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* App Name */}
        <h1 className="text-2xl font-bold">Goldman Sachs</h1>
        
        
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-300 dark:bg-gray-600 text-black dark:text-white px-4 py-2 rounded hover:bg-gray-400 transition duration-150"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          {/* User Info (Optional) */}
          {isAuthenticated && user && (
            <div className="flex items-center space-x-2">
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
                  returnTo: window.location.origin, // Redirects to the home page after logout
                })
              }

              className="bg-indigo-600 text-white px-4 py-2 rounded font-semibold hover:bg-indigo-700 transition duration-150"
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
