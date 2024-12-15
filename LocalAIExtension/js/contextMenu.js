import { CONTEXT_MENU_ACTIONS } from './config.js';

export function createContextMenu() {
  // Remove existing menu items first
  chrome.contextMenus.removeAll(() => {
    // Parent menu item
    chrome.contextMenus.create({
      id: 'localAIAssist',
      title: 'LocalAIAssist',
      contexts: ['selection']
    });

    // Submenu items
    chrome.contextMenus.create({
      id: CONTEXT_MENU_ACTIONS.SUMMARIZE,
      parentId: 'localAIAssist',
      title: 'Summarize',
      contexts: ['selection']
    });

    chrome.contextMenus.create({
      id: CONTEXT_MENU_ACTIONS.REWRITE_FRIENDLY,
      parentId: 'localAIAssist',
      title: 'Rewrite (Friendly)',
      contexts: ['selection']
    });

    chrome.contextMenus.create({
      id: CONTEXT_MENU_ACTIONS.REWRITE_PROFESSIONAL,
      parentId: 'localAIAssist',
      title: 'Rewrite (Professional)',
      contexts: ['selection']
    });

    chrome.contextMenus.create({
      id: CONTEXT_MENU_ACTIONS.BULLET_POINTS,
      parentId: 'localAIAssist',
      title: 'Make Bullet Points',
      contexts: ['selection']
    });

    chrome.contextMenus.create({
      id: CONTEXT_MENU_ACTIONS.REPLY_EMAIL,
      parentId: 'localAIAssist',
      title: 'Reply to Email',
      contexts: ['selection']
    });

    chrome.contextMenus.create({
      id: CONTEXT_MENU_ACTIONS.CUSTOM,
      parentId: 'localAIAssist',
      title: 'Custom Instructions',
      contexts: ['selection']
    });
  });
}