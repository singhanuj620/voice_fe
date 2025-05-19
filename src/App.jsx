import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import HowItWorks from './components/HowItWorks';
import FeaturesSection from './components/FeaturesSection';
import DemoSection from './components/DemoSection';
import UseCasesSection from './components/UseCasesSection';
import TechStackSection from './components/TechStackSection';
import FooterSection from './components/FooterSection';
import VoiceToText from './components/VoiceToText';
import './landing.css';

function App() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.body.classList.toggle('dark', dark);
  }, [dark]);

  const handleUploadClick = () => {
    // Placeholder for upload logic
    alert('Upload functionality coming soon!');
  };

  return (
    <Router>
      <button
        style={{
          position: 'fixed', top: 18, right: 18, zIndex: 1000, background: 'var(--card-bg)', color: 'var(--text)', border: 'none', borderRadius: '1.5rem', padding: '0.5rem 1.2rem', boxShadow: 'var(--shadow)', cursor: 'pointer', fontWeight: 600
        }}
        onClick={() => setDark(d => !d)}
        aria-label="Toggle dark mode"
      >
        {dark ? '☀️ Light' : '🌙 Dark'}
      </button>
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection onUploadClick={handleUploadClick} />
            <HowItWorks />
            <FeaturesSection />
            <DemoSection />
            <UseCasesSection />
            <TechStackSection />
            <FooterSection />
          </>
        } />
        <Route path="/voice-to-text" element={<VoiceToText />} />
      </Routes>
    </Router>
  );
}

export default App;