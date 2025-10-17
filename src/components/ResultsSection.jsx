import React, { useState } from 'react';
import './ResultsSection.css';

const ResultsSection = ({ results, onReset }) => {
  const [copiedSection, setCopiedSection] = useState(null);
  const [expandedCards, setExpandedCards] = useState({});

  const copyToClipboard = (text, section) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const toggleCard = (index) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="results-section">
      <button className="reset-btn" onClick={onReset}>
        ← Reset
      </button>

      {/* Summary Section */}
      <div className="result-card" style={{ animationDelay: '0.1s' }}>
        <div className="card-header">
          <h2 className="card-title">🧾 Simplified Summary</h2>
          <button
            className="copy-btn"
            onClick={() => copyToClipboard(results.summary, 'summary')}
            title="Copy to clipboard"
          >
            {copiedSection === 'summary' ? '✓' : '📋'}
          </button>
        </div>
        <div className="card-content">
          <p className="summary-text">{results.summary}</p>
        </div>
      </div>

      {/* References Section */}
      {results.references && results.references.length > 0 && (
        <div className="result-card" style={{ animationDelay: '0.2s' }}>
          <div className="card-header">
            <h2 className="card-title">📚 Important References</h2>
            <button
              className="copy-btn"
              onClick={() => copyToClipboard(results.references.join('\n'), 'references')}
              title="Copy to clipboard"
            >
              {copiedSection === 'references' ? '✓' : '📋'}
            </button>
          </div>
          <div className="card-content">
            <ul className="references-list">
              {results.references.map((ref, index) => (
                <li key={index} className="reference-item">{ref}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Flashcards Section */}
      {results.flashcards && results.flashcards.length > 0 && (
        <div className="result-card" style={{ animationDelay: '0.3s' }}>
          <div className="card-header">
            <h2 className="card-title">🎓 Smart Flashcards</h2>
          </div>
          <div className="card-content">
            <div className="flashcards-grid">
              {results.flashcards.map((card, index) => (
                <div
                  key={index}
                  className={`flashcard ${expandedCards[index] ? 'expanded' : ''}`}
                  onClick={() => toggleCard(index)}
                >
                  <div className="flashcard-question">
                    <span className="flashcard-label">Q</span>
                    <p>{card.Q}</p>
                  </div>
                  <div className="flashcard-answer">
                    <span className="flashcard-label">A</span>
                    <p>{card.A}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsSection;
