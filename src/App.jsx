import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import InputSection from './components/InputSection';
import LoadingState from './components/LoadingState';
import ResultsSection from './components/ResultsSection';
import Toast from './components/Toast';
import Footer from './components/Footer';

function App() {
  const [transcript, setTranscript] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'error' });

  const showToast = (message, type = 'error') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'error' }), 4000);
  };

  const handleSubmit = async () => {
    if (!transcript.trim()) {
      showToast('⚠️ Please enter a transcript first', 'error');
      return;
    }

    setLoading(true);
    setResults(null);

    const requestBody = {
      transcript: transcript,
      email: email || undefined,
    };

    console.log('Sending request to webhook...');
    console.log('Request body:', requestBody);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout

      const response = await fetch('https://madbhai.app.n8n.cloud/webhook-test/6c590cfe-5a00-4b3b-9ece-a6625b031dc5', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      console.log('Response status:', response.status);
      console.log('Response headers:', [...response.headers.entries()]);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      console.log('Response text:', text);
      console.log('Response length:', text.length);
      
      if (!text || text.trim().length === 0) {
        showToast('⚠️ Webhook returned empty response. Please check your n8n workflow configuration.', 'error');
        setLoading(false);
        return;
      }

      // Try to parse as JSON first, if it fails, treat as plain text
      let data;
      try {
        data = JSON.parse(text);
        console.log('Parsed JSON data:', data);
      } catch (parseError) {
        console.log('Response is plain text, not JSON. Using text as summary.');
        // If not JSON, treat the entire response as the summary
        data = {
          summary: text,
          references: [],
          flashcards: []
        };
      }
      
      // Allow results even if only summary exists
      if (!data.summary && !data.references && !data.flashcards) {
        console.warn('Response missing expected fields:', data);
        showToast('⚠️ Response missing required fields (summary, references, or flashcards).', 'error');
        setLoading(false);
        return;
      }
      
      // Ensure all fields exist with defaults
      setResults({
        summary: data.summary || '',
        references: data.references || [],
        flashcards: data.flashcards || []
      });

      if (email) {
        showToast('✉️ Summary sent to your email!', 'success');
      }
    } catch (error) {
      console.error('Error details:', error);
      if (error.name === 'AbortError') {
        showToast('⚠️ Request timeout. The webhook is taking too long to respond.', 'error');
      } else if (error instanceof SyntaxError) {
        showToast('⚠️ Invalid JSON response from webhook.', 'error');
      } else if (error.message.includes('Failed to fetch')) {
        showToast('⚠️ Network error. Check CORS settings or webhook URL.', 'error');
      } else {
        showToast(`⚠️ ${error.message || 'Something went wrong. Please try again.'}`, 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setTranscript('');
    setEmail('');
    setResults(null);
    setLoading(false);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setTranscript(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="app">
      <Header />
      
      <main className="main-container">
        <div className="content-wrapper">
          {!loading && !results && (
            <InputSection
              transcript={transcript}
              setTranscript={setTranscript}
              email={email}
              setEmail={setEmail}
              onSubmit={handleSubmit}
              onFileUpload={handleFileUpload}
            />
          )}

          {loading && <LoadingState />}

          {!loading && results && (
            <ResultsSection 
              results={results} 
              onReset={handleReset}
            />
          )}
        </div>
      </main>

      <Footer />
      
      {toast.show && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}

export default App;
