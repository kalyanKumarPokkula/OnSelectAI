import { CONTEXT_MENU_ACTIONS } from './config.js';

class APIService {
	constructor() {
		this.baseUrl = 'http://localhost:3000/api';
		this.cache = new Map();
	}

	createCacheKey(text, action, instructions) {
		return `${action}-${text.substring(0, 50)}-${instructions}`;
	}

	async processWithAI(text, action, customInstructions = '') {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 30000);

		try {
			// Check cache first
			const cacheKey = this.createCacheKey(text, action, customInstructions);
			if (this.cache.has(cacheKey)) {
				return this.cache.get(cacheKey);
			}

			const prompt = this.getPromptForAction(text, action, customInstructions);

			const response = await fetch(this.baseUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					prompt: this.sanitizeInput(prompt),
				}),
				signal: controller.signal,
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(
					errorData.error?.message || 'Failed to process with AI'
				);
			}

			const data = await response.json();

			// Cache the result
			this.cache.set(cacheKey, data.message);

			return data.message;
		} catch (error) {
			console.error('API Error:', error);
			throw new Error(`AI Processing failed: ${error.message}`);
		} finally {
			clearTimeout(timeoutId);
		}
	}

	sanitizeInput(text) {
		return text.trim().replace(/[<>]/g, '');
	}

	getPromptForAction(text, action, customInstructions = '') {
		const prompts = {
			[CONTEXT_MENU_ACTIONS.SUMMARIZE]: `Please provide a concise summary of the following text:\n\n${text}`,
			[CONTEXT_MENU_ACTIONS.REWRITE_FRIENDLY]: `Please rewrite the following text in a friendly, casual tone:\n\n${text}`,
			[CONTEXT_MENU_ACTIONS.REWRITE_PROFESSIONAL]: `Please rewrite the following text in a professional, formal tone:\n\n${text}`,
			[CONTEXT_MENU_ACTIONS.BULLET_POINTS]: `Please convert the following text into clear, organized bullet points:\n\n${text}`,
			[CONTEXT_MENU_ACTIONS.REPLY_EMAIL]: `Please draft a professional and appropriate reply to the following email:\n\n${text}`,
			[CONTEXT_MENU_ACTIONS.CUSTOM]: `Text: ${text}\n\nInstructions: ${customInstructions}`,
		};

		return prompts[action] || prompts[CONTEXT_MENU_ACTIONS.CUSTOM];
	}
}

export const apiService = new APIService();
