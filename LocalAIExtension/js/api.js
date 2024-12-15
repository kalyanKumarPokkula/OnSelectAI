import { OPENAI_API_KEY, CONTEXT_MENU_ACTIONS } from './config.js';

function getPromptForAction(text, action, customInstructions = '') {
	const prompts = {
		[CONTEXT_MENU_ACTIONS.SUMMARIZE]: `Please provide a concise summary of the following text:\n\n${text}`,
		[CONTEXT_MENU_ACTIONS.REWRITE_FRIENDLY]: `Please rewrite the following text in a friendly, casual tone:\n\n${text}`,
		[CONTEXT_MENU_ACTIONS.REWRITE_PROFESSIONAL]: `Please rewrite the following text in a professional, formal tone:\n\n${text}`,
		[CONTEXT_MENU_ACTIONS.BULLET_POINTS]: `Please convert the following text into clear, organized bullet points (Note: dont give output as markdown format and just give me the answer nothing extra line just be on point):\n\n${text}`,
		[CONTEXT_MENU_ACTIONS.REPLY_EMAIL]: `Please draft a professional and appropriate reply to the following email:\n\n${text}`,
		[CONTEXT_MENU_ACTIONS.CUSTOM]: `Text: ${text}\n\nInstructions: ${customInstructions}`,
	};

	return prompts[action] || prompts[CONTEXT_MENU_ACTIONS.CUSTOM];
}

export async function processWithAI(text, action, customInstructions = '') {
	try {
		const prompt = getPromptForAction(text, action, customInstructions);
		const response = await fetch('http://localhost:3000/api', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				prompt: prompt,
			}),
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error?.message || 'Failed to process with AI');
		}

		const data = await response.json();
		console.log(data);

		return data.message;
	} catch (error) {
		console.log(error);

		throw new Error(`AI Processing failed: ${error.message}`);
	}
}
