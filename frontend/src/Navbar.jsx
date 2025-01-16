const Navbar = ({ darkMode, setDarkMode }) => {
    return (
      <nav className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Navbar</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-300 dark:bg-gray-600 text-black dark:text-white px-4 py-2 rounded"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
  