import { createContextMenu } from './js/contextMenu.js';

let selectedData = null;
let popupWindowId = null;

// Create context menu when extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
  createContextMenu();
});

// Handle context menu click
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  // Store the selected text and action
  selectedData = {
    text: info.selectionText,
    action: info.menuItemId
  };

  // Close existing popup if open
  if (popupWindowId !== null) {
    try {
      await chrome.windows.remove(popupWindowId);
    } catch (e) {
      console.error('Error closing existing popup:', e);
    }
  }

  // Create new popup window
  try {
    const popup = await chrome.windows.create({
      url: chrome.runtime.getURL('popup.html'),
      type: 'popup',
      width: 450,
      height: 600,
      focused: true
    });
    popupWindowId = popup.id;
  } catch (e) {
    console.error('Error creating popup:', e);
  }
});

// Handle window removal
chrome.windows.onRemoved.addListener((windowId) => {
  if (windowId === popupWindowId) {
    popupWindowId = null;
    selectedData = null;
  }
});

// Handle message from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getSelectedData') {
    sendResponse({ selectedData });
  }
});