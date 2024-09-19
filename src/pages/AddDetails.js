import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import '../index.css'

const AddDetails = () => {
  const [details, setDetails] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    chrome.storage.local.set({ personalDetails: details }, () => {
      alert(`Details saved successfully!, ${details.fullName} \n${details.email} \n${details.phone} \n${details.address}`);
    });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-gray-200 p-6 rounded shadow-md w-full max-w-lg">
        <h2 className="text-lg font-bold mb-4">Add Your Details</h2>
        <label htmlFor="fullName">Full Name:</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={details.fullName}
          onChange={handleChange}
          required
          className="border p-2 mb-2 w-full"
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={details.email}
          onChange={handleChange}
          required
          className="border p-2 mb-2 w-full"
        />

        <label htmlFor="phone">Phone Number:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={details.phone}
          onChange={handleChange}
          required
          className="border p-2 mb-2 w-full"
        />

        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={details.address}
          onChange={handleChange}
          required
          className="border p-2 mb-2 w-full"
        />

        <button onClick={handleSave} className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded">
          Save Details
        </button>
      </div>
    </div>
  );
};

// Render the AddDetails component into the add-details-root div
const root = ReactDOM.createRoot(document.getElementById('add-details-root'));
root.render(
  <React.StrictMode>
    <AddDetails />
  </React.StrictMode>
);
