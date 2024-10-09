import React, { useEffect, useState } from 'react';
import { FaPlus } from "react-icons/fa";
import { BsChevronDown } from "react-icons/bs";
import { Tooltip } from 'react-tooltip'
import { FaCheck } from "react-icons/fa";
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
    <div className="bg-white shadow-xl rounded-lg p-8 max-w-sm mx-auto border border-gray-300 mt-12" style={{ width: "400px", height: "450px" }}>
      <h1 className="text-3xl font-semibold mb-8 text-center text-gray-700">AutoFill Extension</h1>

      <div className="relative mb-8">
        <select
          onChange={(e) => setSelectedDetails(e.target.value)}
          className="block appearance-none w-full bg-white border border-gray-300 hover:border-blue-400 px-4 py-3 pr-10 rounded-lg shadow-sm leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
          data-tip="Select your personal details"
        >
          <option value="">-- Select Personal Details --</option>
          {details.map((detail, index) => (
            <option key={index} value={JSON.stringify(detail)}>
              {`${detail.fullName} (${detail.email})`}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
          <BsChevronDown className="h-5 w-5" />
        </div>
      </div>

      <button
        onClick={handleOpenDetailsPage}
        className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-3 px-5 rounded-lg w-full mb-6 flex items-center justify-center space-x-2 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        <FaPlus className="inline-block mr-2" />
        <span>Open Add Details Page</span>
      </button>


      <button
      onClick={handleFillFormDetails}
      className="bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-semibold py-3 px-5 rounded-lg w-full flex items-center justify-center space-x-2 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300"
      data-tip="Click to autofill your details"
    >
      <FaCheck className="inline-block" /> {/* Adding an icon */}
      <span>Autofill Details</span>
    </button>
      <Tooltip place="top" type="dark" effect="solid" />
    

    </div>
  );
};

export default Popup;
