import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginPage from "./components/LoginPage";
import MainApp from "./MainApp"; // Main application after login

const App = () => {
  const { isAuthenticated } = useAuth0(); // Check if the user is authenticated

  // If the user is not authenticated, show the login page
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // If the user is authenticated, show the main app
  return <MainApp />;
};

export default App;