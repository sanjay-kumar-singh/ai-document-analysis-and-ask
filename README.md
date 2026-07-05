# Document Analysis Project

This project provides a full-stack document question-answering experience. A React frontend lets users upload documents and ask questions, while an Express backend parses uploaded files and uses a local Ollama model to generate answers.

## Overview

- Frontend: React + Vite
- Backend: Node.js + Express
- Document support: PDF, DOC, and DOCX files
- AI integration: Local Ollama API

## Project Structure

- [document-analysis-api](document-analysis-api) — backend API, file upload handling, document parsing, and AI integration
- [document-analysis-ui](document-analysis-ui) — frontend interface for uploading files and asking questions
- [document-analysis-api/uploads](document-analysis-api/uploads) — temporary storage for uploaded files

## Prerequisites

Before running the project, make sure you have:

- Node.js 18 or newer
- npm
- Ollama installed and running locally
- An Ollama model available, such as llama3.2 or mistral

## Backend Setup

1. Open a terminal and change to the backend folder:
   ```bash
   cd document-analysis-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   npm start
   ```

4. The API will be available at:
   - http://localhost:3000/health
   - http://localhost:3000/upload
   - http://localhost:3000/ask

### Backend Environment Variables

The backend uses the following environment variables:

- PORT — server port (default: 3000)
- OLLAMA_BASE_URL — Ollama endpoint (default: http://localhost:11434)
- OLLAMA_MODEL — model name to use (for example: llama3.2)

If needed, set them in your shell before starting the server.

## Frontend Setup

1. Open a second terminal and change to the frontend folder:
   ```bash
   cd document-analysis-ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the UI in your browser at:
   - http://localhost:5173

### Frontend Environment Variable

The frontend expects the backend URL through the VITE_BACKEND_URL variable. If you run the backend on the default port, it should work automatically. Otherwise, start the UI with:

```bash
VITE_BACKEND_URL=http://localhost:3000 npm run dev
```

## Usage

1. Start Ollama locally.
2. Start the backend API.
3. Start the frontend UI.
4. Upload a PDF, DOC, or DOCX file.
5. Ask a question about the document content.

## Notes

- Uploaded files are temporarily stored in the backend uploads folder.
- The application is intended for local development and testing.
- CORS is enabled for development so the frontend can communicate with the backend.

## Development Notes

If you want to make changes:

- Backend code lives in [document-analysis-api/src](document-analysis-api/src)
- Frontend code lives in [document-analysis-ui/src](document-analysis-ui/src)
