import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="p-8 bg-white shadow-lg rounded-lg w-full max-w-md">
        {/* App Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="data:image/png;base64,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"
            alt="App Logo"
            className="w-16 h-16 rounded-full"
          />
        </div>

        
        <h1 className="text-3xl font-bold mb-4 text-center text-indigo-600">
          Welcome to Mutual Fund App
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Securely log in to manage your investments with ease.
        </p>

        {/* Login Button */}
        <div className="space-y-4">
          <button
            onClick={async () => {
              try {
                console.log("Forcing login form...");
                await loginWithRedirect({
                  prompt: "login", // Always show the login form
                });
              } catch (error) {
                console.error("Error during login:", error);
              }
            }}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 shadow-md"
          >
            Log In with Auth0
          </button>
        </div>

       
        <p className="text-center text-sm text-gray-500 mt-6">
          By logging in, you agree to our{" "}
          <a href="#" className="text-indigo-600 underline">
            Terms
          </a>{" "}
          and{" "}
          <a href="#" className="text-indigo-600 underline">
            Privacy Policy
          </a>.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
