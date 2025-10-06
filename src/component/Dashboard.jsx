import React, { useState, useRef } from "react";
import {
  FaUniversity,
  FaUserShield,
  FaClock,
  FaDollarSign,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

// Reusable Button Component
const Button = ({ children, className = "", ...props }) => (
  <button
    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default function Dashboard() {
  const [admins, setAdmins] = useState([
    {
      id: 1,
      library: "ABC College Library",
      location: "Delhi, India",
      adminName: "Rahul Gupta",
      email: "admin@abccollege.com",
      contact: "+91 9876543210",
      joinDate: "15/1/2024",
      billing: "Monthly UPI",
      status: "Active",
    },
    {
      id: 2,
      library: "ABC College Library",
      location: "Delhi, India",
      adminName: "Rahul Gupta",
      email: "admin@abccollege.com",
      contact: "+91 9876543210",
      joinDate: "15/1/2024",
      billing: "Monthly UPI",
      status: "Active",
    },
    {
      id: 3,
      library: "ABC College Library",
      location: "Delhi, India",
      adminName: "Rahul Gupta",
      email: "admin@abccollege.com",
      contact: "+91 9876543210",
      joinDate: "15/1/2024",
      billing: "Monthly UPI",
      status: "Pending",
    },
    {
      id: 4,
      library: "ABC College Library",
      location: "Delhi, India",
      adminName: "Rahul Gupta",
      email: "admin@abccollege.com",
      contact: "+91 9876543210",
      joinDate: "15/1/2024",
      billing: "Monthly UPI",
      status: "Pending",
    },
  ]);

  const [editingAdmin, setEditingAdmin] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    library: "",
    location: "",
    adminName: "",
    email: "",
    contact: "",
    joinDate: "",
    billing: "Monthly UPI",
    status: "Active",
  });
  const [banner, setBanner] = useState(null);
  const fileInputRef = useRef();

  const handleDelete = (id) => {
    setAdmins(admins.filter((a) => a.id !== id));
  };

  const handleEdit = (admin) => {
    setEditingAdmin(admin);
  };

  const handleSave = () => {
    setAdmins(
      admins.map((a) =>
        a.id === editingAdmin.id ? editingAdmin : a
      )
    );
    setEditingAdmin(null);
  };

  // Banner upload
  const handleBannerClick = () => {
    fileInputRef.current.click();
  };
  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setBanner(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  // Add new admin
  const handleAddAdmin = () => {
    setShowAddModal(true);
    setNewAdmin({
      library: "",
      location: "",
      adminName: "",
      email: "",
      contact: "",
      joinDate: "",
      billing: "Monthly UPI",
      status: "Active",
    });
  };
  const handleSaveNewAdmin = () => {
    setAdmins([
      ...admins,
      { ...newAdmin, id: Date.now() },
    ]);
    setShowAddModal(false);
  };

  return (
    <div className="p-6 bg-blue-50 min-h-screen font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          Welcome back, Super Administrator! 👋
        </h2>
        <div className="flex flex-col items-end">
          <Button className="bg-purple-500 text-white hover:bg-purple-600 shadow" onClick={handleBannerClick}>
            Upload Banner
          </Button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleBannerChange}
          />
          {banner && (
            <img src={banner} alt="Banner Preview" className="mt-2 rounded-lg shadow w-48 h-20 object-cover" />
          )}
        </div>
      </div>

      <p className="text-gray-600 mb-6">
        Manage all library networks and administrators from your central
        dashboard
      </p>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-2xl shadow text-center">
          <FaUniversity className="text-blue-500 text-2xl mx-auto" />
          <h3 className="text-2xl font-bold mt-2">4</h3>
          <p>Total Libraries</p>
          <span className="text-green-500 text-sm">+12% this month</span>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow text-center">
          <FaUserShield className="text-green-500 text-2xl mx-auto" />
          <h3 className="text-2xl font-bold mt-2">2</h3>
          <p>Active Admins</p>
          <span className="text-green-500 text-sm">+8% this month</span>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow text-center">
          <FaClock className="text-orange-500 text-2xl mx-auto" />
          <h3 className="text-2xl font-bold mt-2">2</h3>
          <p>Pending Approval</p>
          <span className="text-red-500 text-sm">Needs attention</span>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow text-center">
          <FaDollarSign className="text-purple-500 text-2xl mx-auto" />
          <h3 className="text-2xl font-bold mt-2">$45,000</h3>
          <p>Monthly Revenue</p>
          <span className="text-green-500 text-sm">+15% this month</span>
        </div>
      </div>

      {/* Admin Table */}
      <div className="bg-white rounded-2xl shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">Library Admins Management</h3>
          <div className="flex gap-2">
            <Button className="border border-gray-300 hover:bg-gray-100">
              Bulk Reminder
            </Button>
            <Button className="bg-blue-500 text-white hover:bg-blue-600" onClick={handleAddAdmin}>
              + Add New Admin
            </Button>
          </div>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-gray-700">
              <th className="p-2">Library Details</th>
              <th className="p-2">Admin Information</th>
              <th className="p-2">Contact</th>
              <th className="p-2">Join Date</th>
              <th className="p-2">Billing</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {admins.map((admin) => (
              <tr
                key={admin.id}
                className="border-b hover:bg-gray-50 transition-all"
              >
                <td className="p-2">
                  <div className="font-semibold">{admin.library}</div>
                  <div className="text-gray-500 text-xs">{admin.location}</div>
                </td>
                <td className="p-2">
                  <div>{admin.adminName}</div>
                  <div className="text-gray-500 text-xs">{admin.email}</div>
                </td>
                <td className="p-2">{admin.contact}</td>
                <td className="p-2">{admin.joinDate}</td>
                <td className="p-2">{admin.billing}</td>
                <td className="p-2">
                  {admin.status === "Active" ? (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                      Active
                    </span>
                  ) : (
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">
                      Pending
                    </span>
                  )}
                </td>
                <td className="p-2 flex gap-3">
                  <button
                    onClick={() => handleEdit(admin)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(admin.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-96">
            <h3 className="text-lg font-semibold mb-4">Edit Admin</h3>

            <label className="block mb-2 text-sm font-medium">Name</label>
            <input
              className="w-full mb-3 p-2 border rounded"
              value={editingAdmin.adminName}
              onChange={(e) =>
                setEditingAdmin({ ...editingAdmin, adminName: e.target.value })
              }
            />

            <label className="block mb-2 text-sm font-medium">Email</label>
            <input
              className="w-full mb-3 p-2 border rounded"
              value={editingAdmin.email}
              onChange={(e) =>
                setEditingAdmin({ ...editingAdmin, email: e.target.value })
              }
            />

            <label className="block mb-2 text-sm font-medium">Contact</label>
            <input
              className="w-full mb-3 p-2 border rounded"
              value={editingAdmin.contact}
              onChange={(e) =>
                setEditingAdmin({ ...editingAdmin, contact: e.target.value })
              }
            />

            <label className="block mb-2 text-sm font-medium">Status</label>
            <select
              className="w-full mb-4 p-2 border rounded"
              value={editingAdmin.status}
              onChange={(e) =>
                setEditingAdmin({ ...editingAdmin, status: e.target.value })
              }
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
            </select>

            <div className="flex justify-end gap-2">
              <Button
                className="border border-gray-300 hover:bg-gray-100"
                onClick={() => setEditingAdmin(null)}
              >
                Cancel
              </Button>
              <Button
                className="bg-blue-500 text-white hover:bg-blue-600"
                onClick={handleSave}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Admin Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-xl w-72">
            <h3 className="text-base font-semibold mb-3">Add New Admin</h3>
            <label className="block mb-1 text-xs font-medium">Library</label>
            <input
              className="w-full mb-2 p-1 border rounded text-xs"
              value={newAdmin.library}
              onChange={(e) => setNewAdmin({ ...newAdmin, library: e.target.value })}
            />
            <label className="block mb-1 text-xs font-medium">Location</label>
            <input
              className="w-full mb-2 p-1 border rounded text-xs"
              value={newAdmin.location}
              onChange={(e) => setNewAdmin({ ...newAdmin, location: e.target.value })}
            />
            <label className="block mb-1 text-xs font-medium">Name</label>
            <input
              className="w-full mb-2 p-1 border rounded text-xs"
              value={newAdmin.adminName}
              onChange={(e) => setNewAdmin({ ...newAdmin, adminName: e.target.value })}
            />
            <label className="block mb-1 text-xs font-medium">Email</label>
            <input
              className="w-full mb-2 p-1 border rounded text-xs"
              value={newAdmin.email}
              onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
            />
            <label className="block mb-1 text-xs font-medium">Contact</label>
            <input
              className="w-full mb-2 p-1 border rounded text-xs"
              value={newAdmin.contact}
              onChange={(e) => setNewAdmin({ ...newAdmin, contact: e.target.value })}
            />
            <label className="block mb-1 text-xs font-medium">Join Date</label>
            <input
              className="w-full mb-2 p-1 border rounded text-xs"
              value={newAdmin.joinDate}
              onChange={(e) => setNewAdmin({ ...newAdmin, joinDate: e.target.value })}
            />
            <label className="block mb-1 text-xs font-medium">Billing</label>
            <input
              className="w-full mb-2 p-1 border rounded text-xs"
              value={newAdmin.billing}
              onChange={(e) => setNewAdmin({ ...newAdmin, billing: e.target.value })}
            />
            <label className="block mb-1 text-xs font-medium">Status</label>
            <select
              className="w-full mb-3 p-1 border rounded text-xs"
              value={newAdmin.status}
              onChange={(e) => setNewAdmin({ ...newAdmin, status: e.target.value })}
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
            </select>
            <div className="flex justify-end gap-2 mt-2">
              <Button
                className="border border-gray-300 hover:bg-gray-100 text-xs px-2 py-1"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-blue-500 text-white hover:bg-blue-600 text-xs px-2 py-1"
                onClick={handleSaveNewAdmin}
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
