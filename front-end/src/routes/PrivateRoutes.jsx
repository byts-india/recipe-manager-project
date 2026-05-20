import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';

export default function PrivateRoutes({ children }) {
  const isAuth = useSelector((state) => state.auth.isAuth);

  if (isAuth) return children;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Access Restricted
        </h2>
        <p className="text-gray-600 mb-6">
          You need to sign in to access this page.
        </p>
        <Link
          to="/login"
          className="inline-block px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}
