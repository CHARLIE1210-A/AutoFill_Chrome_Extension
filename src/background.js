chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
  });
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'openNewScreen') {
      chrome.tabs.create({ url: 'new_screen.html' }, (tab) => {
        sendResponse(tab.id);
      });
    }
  });