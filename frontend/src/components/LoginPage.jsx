import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import goldmansachsLogo from '../assets/goldmansachs.png'

const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="p-8 bg-white shadow-lg rounded-lg w-full max-w-md">
        {/* App Logo */}
        <div className="flex justify-center mb-6">
          <img
            src={goldmansachsLogo}
            alt="App Logo"
            className="w-16 h-16 rounded-full"
          />
        </div>

        
        <h1 className="text-3xl font-bold mb-4 text-center text-indigo-600">
          Mutual Fund Calculator
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Log in securely to manage your investments with ease and confidence.
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
