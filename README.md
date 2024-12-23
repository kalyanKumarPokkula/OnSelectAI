![OnSelectAI Logo](/Client/assets/productIcon-16.png)

# OnSelectAI - Local AI Text Processing Extension

## Overview

OnSelectAI is a powerful Chrome extension that leverages local Large Language Models (LLMs) to process text directly in your browser. With privacy at its core, all processing happens locally on your machine, ensuring your data never leaves your system.

![OnSelectAI Demo](/Client/assets/productDemo.gif)

## Features

### 🎯 Core Functionalities

1. **Text Summarization**

   - Quickly summarize long articles, documents, or any selected text
   - Get concise, accurate summaries while maintaining key information

2. **Smart Rewriting**

   - **Friendly Mode**: Convert formal text into casual, conversational tone
   - **Professional Mode**: Transform casual writing into polished, professional content

3. **Bullet Point Generation**

   - Convert paragraphs into clear, organized bullet points
   - Perfect for note-taking and content organization

4. **Email Response Generation**

   - Generate context-aware email replies
   - Save time while maintaining professional communication

5. **Custom Instructions**
   - Create your own AI processing instructions
   - Flexible text manipulation based on your specific needs

### 🛡️ Privacy & Performance

- **100% Local Processing**: All AI operations run on your machine
- **No Data Transmission**: Your text never leaves your computer
- **Fast Response**: Quick processing with local LLM
- **Offline Capability**: Works without internet connection

---

## Installation

### For Chrome Web Store (Coming Soon)

TBD

### Prerequisites

- Docker and Docker Compose installed on your system
- Google Chrome browser
- At least 4GB of free disk space

### Manual Installation

### Step 1: Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/kalyanKumarPokkula/OnSelectAI.git
   cd OnSelectAI
   ```

2. Start the Docker containers:

   ```bash
   docker compose up -d
   ```

This will:

- Start the local API server
- Initialize the Ollama LLM service
- Set up all necessary connections

### Step 2: Extension Installation

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top-right)
3. Click "Load unpacked"
4. Select the `LocalAIExtension` folder from the cloned repository

## How to Use

### Basic Usage

1. **Select Text**: Highlight any text on a webpage
2. **Access Menu**: Right-click to open the context menu
3. **Choose Action**: Select one of the available options:
   - Summarize
   - Rewrite (Friendly)
   - Rewrite (Professional)
   - Make Bullet Points
   - Reply to Email
   - Custom Instructions

### Custom Instructions

1. Select text and choose "Custom Instructions"
2. Enter your specific instruction in the popup
3. Click the send button or press Enter
4. View the AI-processed result

### Copy Results

- Click the copy icon in the result window
- The processed text is now in your clipboard
- A checkmark will briefly appear to confirm the copy

## Troubleshooting

### Common Issues

1. **Extension Not Working**

   - Ensure Docker containers are running
   - Check if the API is accessible at `http://localhost:3000`
   - Restart the browser if necessary

2. **Slow Processing**

   - First request might be slower due to model loading
   - Subsequent requests will be faster
   - Check system resources if persistently slow

3. **Docker Issues**
   - Ensure ports 3000 and 11434 are available
   - Try restarting Docker services
   - Check Docker logs for specific errors

## Technical Requirements

- **Operating System**: Windows/Mac/Linux
- **Browser**: Google Chrome (latest version)
- **System Memory**: Minimum 8GB RAM recommended
- **Disk Space**: 4GB+ for LLM models
- **Docker**: Latest stable version
- **Docker Compose**: Latest stable version

## Privacy Notice

OnSelectAI processes all text locally on your machine. We:

- Don't collect any user data
- Don't transmit text to external servers
- Don't store processed results
- Don't require internet for text processing

## Support

For issues, questions, or suggestions:

1. Open an issue on GitHub
2. Check the troubleshooting guide
3. Contact support at [your-email@domain.com]

## License

This project is licensed under the MIT License - see the LICENSE file for details.
