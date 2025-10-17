import React, { useRef } from 'react';
import './InputSection.css';

const InputSection = ({ transcript, setTranscript, email, setEmail, onSubmit, onFileUpload }) => {
  const fileInputRef = useRef(null);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      onSubmit();
    }
  };

  return (
    <div className="input-section">
      <div className="input-group">
        <label className="input-label">Lecture Transcript</label>
        <textarea
          className="transcript-input"
          placeholder="Paste your lecture transcript here…"
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          onKeyPress={handleKeyPress}
          rows={12}
        />
        <div className="upload-helper">
          <button 
            className="upload-btn"
            onClick={() => fileInputRef.current?.click()}
          >
            📄 Upload .txt file
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt"
            onChange={onFileUpload}
            style={{ display: 'none' }}
          />
        </div>
      </div>

      <div className="input-group">
        <label className="input-label">Email (Optional)</label>
        <input
          type="email"
          className="email-input"
          placeholder="your.email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button className="submit-btn" onClick={onSubmit}>
        Generate Summary
      </button>

      <p className="helper-text">Press Ctrl + Enter to submit</p>
    </div>
  );
};

export default InputSection;
