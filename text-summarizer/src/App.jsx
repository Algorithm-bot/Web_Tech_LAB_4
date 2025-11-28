import React, { useState } from 'react';
import './App.css';

// Use the Hugging Face Inference API endpoint
// The old api-inference.huggingface.co is deprecated, use router.huggingface.co/hf-inference
const API_URL = "https://router.huggingface.co/hf-inference/models/facebook/bart-large-cnn";

function App() {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = import.meta.env.VITE_HUGGING_FACE_TOKEN;

  const makeRequest = async (url) => {
    const requestBody = { inputs: inputText };
    console.log('Making request to:', url);
    console.log('Request body:', requestBody);
    console.log('API Key present:', !!apiKey);
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    return response;
  };

  const handleSummarize = async () => {
    setLoading(true);
    setError(null);
    setSummary('');

    if (!inputText.trim()) {
      setError('Please enter some text to summarize.');
      setLoading(false);
      return;
    }

    if (!apiKey) {
      setError('API key is missing. Please set VITE_HUGGING_FACE_TOKEN in your .env file.');
      setLoading(false);
      return;
    }

    try {
      // In dev mode, use proxy directly to avoid CORS issues
      // In production, try direct API first
      let response = null;
      const proxyUrl = "/api/huggingface/models/facebook/bart-large-cnn";
      
      if (import.meta.env.DEV) {
        // Use proxy in dev mode to avoid CORS
        console.log('Dev mode: Using proxy to avoid CORS issues');
        console.log('Proxy URL:', proxyUrl);
        response = await makeRequest(proxyUrl);
        console.log('Response status:', response.status, response.statusText);
        console.log('Response URL:', response.url);
      } else {
        // In production, try direct API
        try {
          console.log('Production mode: Direct API call to:', API_URL);
          response = await makeRequest(API_URL);
          console.log('Response status:', response.status, response.statusText);
        } catch (directError) {
          console.log('Direct API failed:', directError.name, directError.message);
          // If CORS or network error, we can't use proxy in production
          throw directError;
        }
      }
      
      if (!response) {
        throw new Error('No response received');
      }

      if (!response.ok) {
        let errorMessage = 'Failed to get a summary.';
        let errorDetails = null;
        try {
          const errorData = await response.json();
          errorDetails = errorData;
          console.error('API Error Response:', errorData);
          if (errorData.error) {
            errorMessage = errorData.error;
          } else if (response.status === 503) {
            errorMessage = 'Model is loading. Please wait a moment and try again.';
          } else if (response.status === 401) {
            errorMessage = 'Invalid API key. Please check your VITE_HUGGING_FACE_TOKEN.';
          } else if (response.status === 429) {
            errorMessage = 'Rate limit exceeded. Please try again later.';
          } else if (response.status === 404) {
            errorMessage = `API endpoint not found (404). The model 'facebook/bart-large-cnn' may not be available or the endpoint URL is incorrect. Try checking the Hugging Face model page: https://huggingface.co/facebook/bart-large-cnn`;
          } else if (response.status === 410) {
            errorMessage = `API endpoint is no longer available (410 Gone). The endpoint may have been deprecated or moved. Please check Hugging Face documentation for the current API format.`;
          }
        } catch (e) {
          // Response might not be JSON
          const textResponse = await response.text().catch(() => '');
          console.error('Non-JSON Error Response:', textResponse);
          if (response.status === 404) {
            errorMessage = `HTTP 404: The API endpoint was not found. URL: ${response.url || 'unknown'}. Please verify the endpoint is correct.`;
          } else if (response.status === 410) {
            errorMessage = `HTTP 410: The API endpoint is no longer available (Gone). The endpoint format may have changed. Please check Hugging Face API documentation.`;
          } else {
            errorMessage = `HTTP ${response.status}: ${response.statusText}`;
          }
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      
      // Handle different response formats
      if (Array.isArray(data) && data.length > 0 && data[0].summary_text) {
        setSummary(data[0].summary_text);
      } else if (data.summary_text) {
        setSummary(data.summary_text);
      } else if (typeof data === 'string') {
        setSummary(data);
      } else {
        throw new Error('API did not return a valid summary format.');
      }
    } catch (err) {
      console.error('Summarization error:', err);
      
      // Better error messages for network/CORS issues
      let errorMessage = 'An unexpected error occurred. Please try again.';
      
      if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
        errorMessage = 'Network error: Unable to connect to the API. This might be due to CORS restrictions, network connectivity issues, or the API service being temporarily unavailable. Please check your internet connection, restart the dev server, and try again.';
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Text Summarizer</h1>
        <p>Paste your text below and get a concise summary.</p>
      </header>

      <main>
        <div className="io-container">
          <div className="input-side">
            <h2>Your Text</h2>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your long article, notes, or any text here..."
              rows="15"
            ></textarea>
          </div>

          <div className="output-side">
            <h2>Summary</h2>
            <div className="summary-box">
              {loading && <div className="loader">Summarizing...</div>}
              {error && <div className="error-message">{error}</div>}
              {!loading && !error && summary && <p>{summary}</p>}
              {!loading && !error && !summary && (
                <p className="placeholder">Your summary will appear here.</p>
              )}
            </div>
          </div>
        </div>

        <button onClick={handleSummarize} disabled={loading}>
          {loading ? 'Working on it...' : 'Summarize Text'}
        </button>
      </main>
    </div>
  );
}

export default App;
