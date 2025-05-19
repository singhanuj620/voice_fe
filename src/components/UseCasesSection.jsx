// UseCasesSection.jsx
import React from 'react';
import { FaBriefcase, FaChartBar, FaEye, FaHandsHelping } from 'react-icons/fa';

const usecases = [
  { icon: <FaBriefcase size={28} color="#5b6cff" />, label: 'Business Executives on the go' },
  { icon: <FaChartBar size={28} color="#a259f7" />, label: 'Analysts reviewing data' },
  { icon: <FaEye size={28} color="#4fd1c5" />, label: 'Visually impaired professionals' },
  { icon: <FaHandsHelping size={28} color="#a259f7" />, label: 'Hands-free operation in meetings' },
];

export default function UseCasesSection() {
  return (
    <section className="section">
      <h2 className="section-title">Use Cases</h2>
      <div className="usecases-list">
        {usecases.map((u, i) => (
          <div className="usecase-item" key={i}>
            {u.icon}
            <h4 style={{margin: '1rem 0 0.5rem 0'}}>{u.label}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}
