import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Dashboard() {

  useEffect(() => {

    const admin = localStorage.getItem("admin");

    if (!admin) {
      window.location.href = "/admin/login";
    }

  }, []);

  return (

    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}

      <div className="w-64 bg-black text-white p-6">

        <h1 className="text-2xl font-bold mb-8">
          Admin Panel
        </h1>

        <nav className="flex flex-col gap-4">

          <Link
            to="/admin/dashboard"
            className="hover:bg-gray-800 p-2 rounded"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/tours"
            className="hover:bg-gray-800 p-2 rounded"
          >
            Manage Tours
          </Link>

          <Link
            to="/admin/destinations"
            className="hover:bg-gray-800 p-2 rounded"
          >
            Manage Destinations
          </Link>

        </nav>

      </div>

      {/* Main Content */}

      <div className="flex-1 p-10">

        <h1 className="text-3xl font-bold mb-8">
          Dashboard
        </h1>

        {/* Stats Cards */}

        <div className="grid grid-cols-3 gap-6">

          <div className="bg-white shadow p-6 rounded">
            <h2 className="text-lg font-semibold">
              Tours
            </h2>
            <p className="text-3xl mt-2">
              Manage Tours
            </p>
            <Link
              to="/admin/tours"
              className="text-blue-600 mt-3 inline-block"
            >
              View
            </Link>
          </div>

          <div className="bg-white shadow p-6 rounded">
            <h2 className="text-lg font-semibold">
              Destinations
            </h2>
            <p className="text-3xl mt-2">
              Manage
            </p>
            <Link
              to="/admin/destinations"
              className="text-blue-600 mt-3 inline-block"
            >
              View
            </Link>
          </div>

          <div className="bg-white shadow p-6 rounded">
            <h2 className="text-lg font-semibold">
              Logout
            </h2>

            <button
              onClick={()=>{
                localStorage.removeItem("admin");
                window.location.href="/";
              }}
              className="mt-3 bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}