// FooterSection.jsx
import React from 'react';

export default function FooterSection() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a className="footer-link" href="https://github.com/" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a className="footer-link" href="#" target="_blank" rel="noopener noreferrer">Documentation</a>
        <a className="footer-link" href="#" target="_blank" rel="noopener noreferrer">Contact</a>
      </div>
      <div style={{fontSize: '0.95rem', opacity: 0.8}}>
        &copy; {new Date().getFullYear()} Voice-Based Business Reports Assistant
      </div>
    </footer>
  );
}
