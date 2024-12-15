import { Ollama } from '@langchain/ollama';

export const llm = new Ollama({
	// model: 'llama3.1:8b', // Default value
	model: 'llama3.2:latest',
	temperature: 0,
	maxRetries: 2,
	maxTokens: 100,
	// other params...
});
