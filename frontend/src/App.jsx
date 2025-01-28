// src/App.jsx
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import MainApp from "./MainApp";
import PastInvestments from "./components/PastInvestment";

const App = () => {
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <Routes>
      <Route path="/" element={<MainApp />} />
      <Route path="/past-investments" element={<PastInvestments />} />
    </Routes>
  );
};

export default App;