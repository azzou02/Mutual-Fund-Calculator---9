import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN} // Auth0 domain
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID} // Auth0 client ID
      authorizationParams={{
        redirect_uri: window.location.origin, // Redirect URI
        prompt: "login", // Force login form on every redirect
      }}
      cacheLocation="localstorage" // Enables persistence across page reloads
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </StrictMode>
);