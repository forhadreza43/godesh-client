// src/pages/ErrorPages/AccessDenied.jsx

import { ShieldOff } from "lucide-react";
import { Link } from "react-router";

const AccessDenied = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <ShieldOff size={64} className="mb-4 text-red-500" />
      <h1 className="mb-2 text-3xl font-bold text-red-600">Access Denied</h1>
      <p className="mb-6 text-gray-700">
        You do not have permission to view this page.
      </p>
      <Link
        to="/dashboard"
        className="rounded bg-green-600 px-5 py-2 text-white hover:bg-green-700"
      >
        Back to Dashboard
      </Link>
    </div>
  );
};

export default AccessDenied;
