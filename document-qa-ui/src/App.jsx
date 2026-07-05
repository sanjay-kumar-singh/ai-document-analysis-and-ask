import { useState } from 'react';

const backendBaseUrl = (import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000').replace(/\/$/, '');

async function requestToBackend(path, options = {}) {
  const response = await fetch(`${backendBaseUrl}${path}`, options);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }

  return data;
}

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [question, setQuestion] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [answer, setAnswer] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isAsking, setIsAsking] = useState(false);

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setUploadStatus('Please choose a PDF or DOCX file first.');
      return;
    }

    setIsUploading(true);
    setUploadStatus('Uploading document...');

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const data = await requestToBackend('/upload', {
        method: 'POST',
        body: formData,
      });
      setUploadStatus(data.message || 'Document uploaded successfully.');
      setAnswer('');
    } catch (error) {
      setUploadStatus(error.message || 'Upload failed.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleAsk = async (event) => {
    event.preventDefault();
    if (!question.trim()) {
      setAnswer('Please enter a question first.');
      return;
    }

    setIsAsking(true);
    setAnswer('Thinking...');

    try {
      const data = await requestToBackend('/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      setAnswer(data.answer || 'No answer returned.');
    } catch (error) {
      setAnswer(error.message || 'Could not retrieve an answer.');
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <div className="app-shell">
      <div className="card">
        <h1>Document QA</h1>
        <p>Upload a PDF or DOCX file and ask questions about its content.</p>

        <form onSubmit={handleUpload} className="form-block">
          <label htmlFor="file">Upload document</label>
          <input id="file" type="file" accept=".pdf,.doc,.docx" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
          <button type="submit" disabled={isUploading}>{isUploading ? 'Uploading...' : 'Upload file'}</button>
        </form>

        <p className="status">{uploadStatus}</p>

        <form onSubmit={handleAsk} className="form-block">
          <label htmlFor="question">Ask a question</label>
          <textarea id="question" rows="4" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Example: What is the main topic of this document?" />
          <button type="submit" disabled={isAsking}>{isAsking ? 'Asking...' : 'Get answer'}</button>
        </form>

        <div className="answer-box">
          <h2>Answer</h2>
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
