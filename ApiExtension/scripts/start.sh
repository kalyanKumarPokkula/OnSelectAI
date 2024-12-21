#!/bin/sh

# Wait for Ollama to be ready
echo "Waiting for Ollama service..."
while ! curl -s http://ollama:11434/api/tags >/dev/null; do
    sleep 1
done

# Pull the model
echo "Pulling Llama2 model..."
curl -X POST http://ollama:11434/api/pull -d '{"name": "llama3.2:3b"}'

# Start the Node.js application
echo "Starting Node.js application..."
npm start 