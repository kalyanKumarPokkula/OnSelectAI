import { Ollama } from '@langchain/ollama';
import { MAX_RETRIES, TIMEOUT } from './config.js';

const createLLMInstance = () => {
	return new Ollama({
		baseUrl: 'http://ollama:11434',
		model: 'llama3.2:3b',
		temperature: 0,
		maxRetries: MAX_RETRIES,
		maxTokens: 100,
		timeout: TIMEOUT,
		callbacks: [
			{
				handleLLMError: async (error) => {
					console.error('LLM Error:', error);
					// Implement fallback logic here if needed
				},
			},
		],
	});
};

export const llm = createLLMInstance();
