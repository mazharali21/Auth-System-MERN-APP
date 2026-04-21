import React from "react";

function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="text-2xl font-bold p-6 border-b border-gray-700">
          Admin Panel
        </div>

        <nav className="flex-1 p-4 space-y-3">
          <a href="#" className="block hover:bg-gray-700 p-2 rounded">
            Dashboard
          </a>
          <a href="#" className="block hover:bg-gray-700 p-2 rounded">
            Users
          </a>
          <a href="#" className="block hover:bg-gray-700 p-2 rounded">
            Orders
          </a>
          <a href="#" className="block hover:bg-gray-700 p-2 rounded">
            Settings
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <header className="bg-white shadow p-4 flex justify-between">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div>User Profile</div>
        </header>

        {/* Content */}
        <main className="p-6 space-y-6">

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-gray-500">Users</h2>
              <p className="text-3xl font-bold">1,245</p>
            </div>

            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-gray-500">Orders</h2>
              <p className="text-3xl font-bold">532</p>
            </div>

            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-gray-500">Revenue</h2>
              <p className="text-3xl font-bold">$12,430</p>
            </div>

          </div>

          {/* Table */}
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>

            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-2">User</th>
                  <th className="py-2">Action</th>
                  <th className="py-2">Date</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b">
                  <td className="py-2">Ali</td>
                  <td className="py-2">Created Order</td>
                  <td className="py-2">12 Mar</td>
                </tr>

                <tr className="border-b">
                  <td className="py-2">Sara</td>
                  <td className="py-2">Signed Up</td>
                  <td className="py-2">11 Mar</td>
                </tr>

                <tr>
                  <td className="py-2">Ahmed</td>
                  <td className="py-2">Updated Profile</td>
                  <td className="py-2">10 Mar</td>
                </tr>
              </tbody>
            </table>
          </div>

        </main>
      </div>
    </div>
  );
}

export default Dashboard