import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

const LandingPage: React.FC = () => {
  const { isAuthenticated, user } = useUser();

  return (
    <div className="bg-gaming-dark min-h-screen flex flex-col items-center justify-center text-white">
      {isAuthenticated ? (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Welcome, {user?.name || "User"}!</h1>
          <p className="text-lg mb-6">You are logged in. Explore the app!</p>
          <Link
            to="/dashboard"
            className="bg-gaming-purple hover:bg-gaming-purple/90 text-white py-2 px-6 rounded-md"
          >
            Go to Dashboard
          </Link>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Welcome to GamingCart!</h1>
          <p className="text-lg mb-6">Please log in or register to continue.</p>
          <div className="flex space-x-4">
            <Link
              to="/login"
              className="bg-gaming-purple hover:bg-gaming-purple/90 text-white py-2 px-6 rounded-md"
            >
              Log In
            </Link>
            <Link
              to="/register"
              className="border border-gaming-purple text-gaming-purple hover:bg-gaming-purple/10 py-2 px-6 rounded-md"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;