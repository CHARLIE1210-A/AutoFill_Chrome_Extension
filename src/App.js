import React from 'react';
import Popup from './components/Popup';

function App() {
  const handleUseDetails = () => {
    // Check if the chrome API is available
    if (typeof chrome !== 'undefined' && chrome.tabs && chrome.scripting) {
      // Send a message to content script to autofill the form
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ['content.js'],
        }, function () {
          chrome.tabs.sendMessage(tabs[0].id, { message: 'autofill_form' });
        });
      });
    } else {
      console.error("Chrome API is not available. This code needs to run inside a Chrome extension.");
    }
  };

  return <Popup onUseDetails={handleUseDetails} />;
}

export default App;
