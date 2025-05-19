// HeroSection.jsx
import React from 'react';
import '../landing.css';
import { FaMicrophone } from 'react-icons/fa';

export default function HeroSection({ onUploadClick }) {
  return (
    <section className="landing-hero">
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <img src="/vite.svg" alt="AI Assistant" style={{width: 64, marginBottom: 16}} />
        <h1 className="landing-hero-title">Voice-Based Business Reports Assistant</h1>
        <p className="landing-hero-subtitle">Turn complex business reports into voice-driven insights with AI.</p>
        <button className="landing-hero-cta" onClick={onUploadClick}>Upload Your Report</button>
        <div className="waveform" aria-label="Waveform animation">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="waveform-bar" />
          ))}
        </div>
      </div>
      <FaMicrophone style={{position: 'absolute', right: 32, bottom: 32, fontSize: 36, color: 'var(--accent)', background: '#fff', borderRadius: '50%', padding: 10, boxShadow: 'var(--shadow)'}} title="Voice Query" />
    </section>
  );
}
