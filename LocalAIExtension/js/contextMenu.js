import { CONTEXT_MENU_ACTIONS } from './config.js';

export function createContextMenu() {
	// Remove existing menu items first
	chrome.contextMenus.removeAll(() => {
		// Parent menu item
		chrome.contextMenus.create({
			id: 'OnSelectAI',
			title: 'OnSelectAI',
			contexts: ['selection'],
		});

		// Submenu items
		chrome.contextMenus.create({
			id: CONTEXT_MENU_ACTIONS.SUMMARIZE,
			parentId: 'OnSelectAI',
			title: 'Summarize',
			contexts: ['selection'],
		});

		chrome.contextMenus.create({
			id: CONTEXT_MENU_ACTIONS.REWRITE_FRIENDLY,
			parentId: 'OnSelectAI',
			title: 'Rewrite (Friendly)',
			contexts: ['selection'],
		});

		chrome.contextMenus.create({
			id: CONTEXT_MENU_ACTIONS.REWRITE_PROFESSIONAL,
			parentId: 'OnSelectAI',
			title: 'Rewrite (Professional)',
			contexts: ['selection'],
		});

		chrome.contextMenus.create({
			id: CONTEXT_MENU_ACTIONS.BULLET_POINTS,
			parentId: 'OnSelectAI',
			title: 'Make Bullet Points',
			contexts: ['selection'],
		});

		chrome.contextMenus.create({
			id: CONTEXT_MENU_ACTIONS.REPLY_EMAIL,
			parentId: 'OnSelectAI',
			title: 'Reply to Email',
			contexts: ['selection'],
		});

		chrome.contextMenus.create({
			id: CONTEXT_MENU_ACTIONS.CUSTOM,
			parentId: 'OnSelectAI',
			title: 'Custom Instructions',
			contexts: ['selection'],
		});
	});
}
