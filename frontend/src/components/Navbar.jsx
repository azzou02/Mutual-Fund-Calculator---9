import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ onToggleDarkMode }) => {
  const [darkMode, setDarkMode] = useState(false);

  const handleToggle = () => {
    setDarkMode((prev) => !prev);
    onToggleDarkMode(!darkMode);
  };

  return (
    <nav className="navbar flex items-center space-x-6">
      <Link to="/" className="hover:text-blue-500">
        Home
      </Link>
      <Link to="/past-data" className="hover:text-blue-500">
        Past Data
      </Link>
      <Link to="/graphs" className="hover:text-blue-500">
        Graphs
      </Link>
      <div className="dark-mode-toggle flex items-center space-x-2">
        <label htmlFor="darkMode">Dark Mode</label>
        <input
          type="checkbox"
          id="darkMode"
          checked={darkMode}
          onChange={handleToggle}
        />
      </div>
    </nav>
  );
};

export default Navbar;
