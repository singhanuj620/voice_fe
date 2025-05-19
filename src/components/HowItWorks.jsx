// HowItWorks.jsx
import React from 'react';
import { FaFileUpload, FaRobot, FaMicrophoneAlt } from 'react-icons/fa';

const steps = [
  {
    icon: <FaFileUpload className="how-step-icon" />, 
    title: 'Upload your business report',
    desc: 'PDF, Excel, or Dashboard',
  },
  {
    icon: <FaRobot className="how-step-icon" />,
    title: 'AI summarizes & converts to voice',
    desc: 'Instant, accurate, and clear',
  },
  {
    icon: <FaMicrophoneAlt className="how-step-icon" />,
    title: 'Ask questions via voice',
    desc: 'Get spoken answers in real-time',
  },
];

export default function HowItWorks() {
  return (
    <section className="section">
      <h2 className="section-title">How It Works</h2>
      <div className="how-steps">
        {steps.map((step, i) => (
          <div className="how-step" key={i}>
            {step.icon}
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
