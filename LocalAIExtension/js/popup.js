import { processWithAI } from './api.js';
import { CONTEXT_MENU_ACTIONS } from './config.js';

document.addEventListener('DOMContentLoaded', async () => {
	const instructionsSection = document.getElementById(
		'customInstructionsSection'
	);
	const instructionsArea = document.getElementById('instructions');
	const processTextBtn = document.getElementById('processText');
	const resultDiv = document.getElementById('result');

	let selectedText = '';
	let selectedAction = '';

	// Get selected text and action from background script
	chrome.runtime.sendMessage(
		{ action: 'getSelectedData' },
		async (response) => {
			if (response?.selectedData) {
				selectedText = response.selectedData.text;
				selectedAction = response.selectedData.action;

				// Show/hide instructions based on action
				if (selectedAction === CONTEXT_MENU_ACTIONS.CUSTOM) {
					instructionsSection.style.display = 'block';
					processTextBtn.style.display = 'block';
				} else {
					instructionsSection.style.display = 'none';
					processTextBtn.style.display = 'none';
					// Process immediately for non-custom actions
					await processText();
				}
			}
		}
	);

	// Process text with AI
	async function processText() {
		if (!selectedText) {
			resultDiv.textContent = 'Error: No text selected';
			return;
		}

		try {
			if (processTextBtn) {
				processTextBtn.disabled = true;
				// processTextBtn.textContent = 'Processing...';
			}
			resultDiv.textContent = 'Processing your request...';

			const result = await processWithAI(
				selectedText,
				selectedAction,
				instructionsArea?.value?.trim() || ''
			);
			resultDiv.textContent = result;
		} catch (error) {
			resultDiv.textContent = `Error: ${error.message}`;
		} finally {
			if (processTextBtn) {
				processTextBtn.disabled = false;
				// processTextBtn.textContent = 'Process with AI';
			}
		}
	}

	// Process text button click handler
	processTextBtn.addEventListener('click', processText);
});

// Function to copy the content of the result div to the clipboard
function copyToClipboard() {
	const resultDiv = document.getElementById('result');
	const textToCopy = resultDiv.textContent || resultDiv.innerText;

	if (textToCopy.trim() === '') {
		return; // No content to copy
	}

	// Use the Clipboard API to copy text
	navigator.clipboard
		.writeText(textToCopy)
		.then(() => {
			const copyButton = document.getElementById('copyButton');
			const originalIcon = copyButton.innerHTML;

			// Change the icon to a tick mark
			copyButton.innerHTML = `
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            `;

			// Revert the icon back to the original after 2 seconds
			setTimeout(() => {
				copyButton.innerHTML = originalIcon;
			}, 1200);
		})
		.catch((error) => {
			console.error(`Failed to copy text: ${error.message}`);
		});
}

// Add event listener to the Copy button
document
	.getElementById('copyButton')
	.addEventListener('click', copyToClipboard);
