import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import '../index.css'

const AddDetails = () => {
  const [details, setDetails] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    streetAddress: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    email: '',
    phoneNo: '',
    gender: ''
  });

  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    chrome.storage.local.set({ personalDetails: details }, () => {
      alert(`Details saved successfully!, ${details.firstName} `);

      // Retrieve and print saved details to the console
      chrome.storage.local.get(['personalDetails'], (result) => {
        console.log('Saved details:', result.personalDetails);
      });
    });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
  <div className="bg-gray-200 p-8 rounded-lg shadow-md w-full max-w-xl">
    <h2 className="text-2xl font-bold mb-6 text-center">Add Your Details</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Name Section */}
      <div>
        <label className="block font-medium mb-1">First Name:</label>
        <input
          name="firstName"
          value={details.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="border border-gray-300 p-3 rounded w-full transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Last Name:</label>
        <input
          name="lastName"
          value={details.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="border border-gray-300 p-3 rounded w-full transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Date of Birth */}
      <div>
        <label className="block font-medium mb-1">Date of Birth:</label>
        <input
          type="date"
          name="dateOfBirth"
          value={details.dateOfBirth}
          onChange={handleChange}
          className="border border-gray-300 p-3 rounded w-full transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Address Section */}
      <div className="col-span-2">
        <label className="block font-medium mb-1">Street Address:</label>
        <input
          name="streetAddress"
          value={details.streetAddress}
          onChange={handleChange}
          placeholder="Street Address"
          className="border border-gray-300 p-3 rounded w-full transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">City:</label>
        <input
          name="city"
          value={details.city}
          onChange={handleChange}
          placeholder="City"
          className="border border-gray-300 p-3 rounded w-full transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">State:</label>
        <input
          name="state"
          value={details.state}
          onChange={handleChange}
          placeholder="State"
          className="border border-gray-300 p-3 rounded w-full transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Country:</label>
        <input
          name="country"
          value={details.country}
          onChange={handleChange}
          placeholder="Country"
          className="border border-gray-300 p-3 rounded w-full transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Zip Code:</label>
        <input
          name="zipCode"
          value={details.zipCode}
          onChange={handleChange}
          placeholder="Zip Code"
          className="border border-gray-300 p-3 rounded w-full transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Contact Information */}
      <div>
        <label className="block font-medium mb-1">Email:</label>
        <input
          type="email"
          name="email"
          value={details.email}
          onChange={handleChange}
          placeholder="Email"
          className="border border-gray-300 p-3 rounded w-full transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Phone Number:</label>
        <input
          type="tel"
          name="phoneNo"
          value={details.phoneNo}
          onChange={handleChange}
          placeholder="Phone Number"
          className="border border-gray-300 p-3 rounded w-full transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Gender */}
      <div className="col-span-2">
        <label className="block font-medium mb-1">Gender:</label>
        <select
          name="gender"
          value={details.gender}
          onChange={handleChange}
          className="border border-gray-300 p-3 rounded w-full transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </div>

    {/* Save Button */}
    <div className="mt-6 text-center">
      <button
        onClick={handleSave}
        className="bg-green-500 hover:bg-green-700 text-white py-3 px-6 rounded-lg transition duration-300 ease-in-out"
      >
        Save Details
      </button>
    </div>
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
