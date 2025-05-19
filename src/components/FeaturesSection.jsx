// FeaturesSection.jsx
import React from 'react';
import { FaBrain, FaHeadphones, FaComments, FaFileAlt, FaUniversalAccess, FaBolt } from 'react-icons/fa';

const features = [
  { icon: <FaBrain size={32} color="#a259f7" />, label: 'AI-Powered Summarization' },
  { icon: <FaHeadphones size={32} color="#5b6cff" />, label: 'Voice Narration of Reports' },
  { icon: <FaComments size={32} color="#4fd1c5" />, label: 'Natural Language Q&A (via voice)' },
  { icon: <FaFileAlt size={32} color="#a259f7" />, label: 'Multi-format Support (PDF, Excel, Charts)' },
  { icon: <FaUniversalAccess size={32} color="#5b6cff" />, label: 'Accessibility for visually impaired users' },
  { icon: <FaBolt size={32} color="#4fd1c5" />, label: 'Works in real-time' },
];

export default function FeaturesSection() {
  return (
    <section className="section">
      <h2 className="section-title">Key Features</h2>
      <div className="features-list">
        {features.map((f, i) => (
          <div className="feature-item" key={i}>
            {f.icon}
            <h4 style={{margin: '1rem 0 0.5rem 0'}}>{f.label}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}
