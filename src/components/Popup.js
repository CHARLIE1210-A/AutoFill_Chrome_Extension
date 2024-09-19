import React, { useEffect, useState } from 'react';
import '../index.css';

// Popup Component
const Popup = () => {
  const [details, setDetails] = useState([]);
  const [selectedDetails, setSelectedDetails] = useState('');

  // Fetch personal details from storage when the popup loads
  useEffect(() => {
    chrome.storage.local.get(['personalDetails'], (result) => {
      if (result.personalDetails) {
        setDetails([result.personalDetails]);
      }
    });
  }, []);

  // Handle button click to open details.html page
  const handleOpenDetailsPage = () => {
    chrome.tabs.create({ url: chrome.runtime.getURL('add-details.html') });
    // chrome.runtime.openOptionsPage();
  };

  // Handle button click to use selected details
  const handleUseDetails = () => {
    if (selectedDetails) {
      const details = JSON.parse(selectedDetails);
      alert(`Using Details: \n${details.fullName} \n${details.email} \n${details.phone} \n${details.address}`);
    }
  };

  // Handle button click to autofill form
  const handleFillFormDetails = () => {
    if (selectedDetails) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        chrome.scripting.executeScript({
          target: { tabId: activeTab.id },
          files: ['content.js']
        }, () => {
          if (chrome.runtime.lastError) {
            console.error('Error injecting script:', chrome.runtime.lastError);
          } else {
            chrome.tabs.sendMessage(activeTab.id, { message: 'autofill_form' }, (response) => {
              if (chrome.runtime.lastError) {
                console.error('Error sending message:', chrome.runtime.lastError);
              } else {
                console.log('Message received by content script:', response);
              }
            });
          }
        });
      });
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm mx-auto border border-gray-200 mt-10" style={{ width: "400px", height: "400px" }}>
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">AutoFill Extension</h1>

      <button
        onClick={handleOpenDetailsPage}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mb-4 transition duration-300 ease-in-out transform hover:scale-105"
      >
        Open Add Details Page
      </button>

      <div className="relative mb-6">
        <select
          onChange={(e) => setSelectedDetails(e.target.value)}
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
        >
          <option value="">-- Select Personal Details --</option>
          {details.map((detail, index) => (
            <option key={index} value={JSON.stringify(detail)}>
              {`${detail.fullName} (${detail.email})`}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 12l-6-6h12l-6 6z" /></svg>
        </div>
      </div>

      {/* <button
        onClick={handleUseDetails}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full mb-4 transition duration-300 ease-in-out transform hover:scale-105"
      >
        Use Selected Details
      </button> */}

      <button
        onClick={handleFillFormDetails}
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded w-full transition duration-300 ease-in-out transform hover:scale-105"
      >
        Autofill Details
      </button>
    </div>
  );
};

export default Popup;
