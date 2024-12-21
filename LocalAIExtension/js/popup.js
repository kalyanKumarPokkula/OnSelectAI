import { apiService } from './api.js';
import { CONTEXT_MENU_ACTIONS } from './config.js';

class PopupManager {
	constructor() {
		this.instructionsSection = document.getElementById(
			'customInstructionsSection'
		);
		this.instructionsArea = document.getElementById('instructions');
		this.processTextBtn = document.getElementById('processText');
		this.resultDiv = document.getElementById('result');
		this.loadingSpinner = document.getElementById('loadingSpinner');
		this.copyButton = document.getElementById('copyResult');

		this.selectedText = '';
		this.selectedAction = '';

		this.init();
	}

	async init() {
		this.setupEventListeners();
		await this.getSelectedData();
	}

	setupEventListeners() {
		if (this.processTextBtn) {
			this.processTextBtn.addEventListener('click', () => this.processText());
		}
		if (this.instructionsArea) {
			this.instructionsArea.addEventListener('keypress', (e) => {
				if (e.key === 'Enter') this.processText();
			});
		}
		if (this.copyButton) {
			this.copyButton.addEventListener('click', () => this.copyToClipboard());
		}
	}

	async getSelectedData() {
		const response = await chrome.runtime.sendMessage({
			action: 'getSelectedData',
		});

		if (response?.selectedData) {
			this.selectedText = response.selectedData.text;
			this.selectedAction = response.selectedData.action;

			this.updateUIForAction();
		}
	}

	updateUIForAction() {
		if (this.selectedAction === CONTEXT_MENU_ACTIONS.CUSTOM) {
			this.instructionsSection.style.display = 'block';
			this.processTextBtn.style.display = 'block';
		} else {
			this.instructionsSection.style.display = 'none';
			this.processTextBtn.style.display = 'none';
			this.processText();
		}
	}

	showLoading() {
		this.loadingSpinner.style.display = 'block';
		// this.resultDiv.textContent = 'Processing your request...';
		if (this.processTextBtn) {
			this.processTextBtn.disabled = true;
		}
	}

	hideLoading() {
		this.loadingSpinner.style.display = 'none';
		if (this.processTextBtn) {
			this.processTextBtn.disabled = false;
		}
	}

	showError(message) {
		this.resultDiv.innerHTML = `<div class="error">${message}</div>`;
	}

	async processText() {
		if (!this.selectedText) {
			this.showError('Error: No text selected');
			return;
		}

		try {
			this.showLoading();
			const result = await apiService.processWithAI(
				this.selectedText,
				this.selectedAction,
				this.instructionsArea?.value?.trim() || ''
			);
			this.resultDiv.textContent = result;
		} catch (error) {
			this.showError(error.message);
		} finally {
			this.hideLoading();
		}
	}

	async copyToClipboard() {
		const textToCopy = this.resultDiv.textContent || this.resultDiv.innerText;

		if (textToCopy.trim() === '') {
			return; // No content to copy
		}

		try {
			await navigator.clipboard.writeText(textToCopy);
			const originalIcon = this.copyButton.innerHTML;

			// Change the icon to a tick mark
			this.copyButton.innerHTML = `
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<polyline points="20 6 9 17 4 12"></polyline>
				</svg>
			`;

			// Revert the icon back to the original after 1.2 seconds
			setTimeout(() => {
				this.copyButton.innerHTML = originalIcon;
			}, 1200);
		} catch (error) {
			console.error(`Failed to copy text: ${error.message}`);
		}
	}
}

// Initialize popup when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
	new PopupManager();
});
