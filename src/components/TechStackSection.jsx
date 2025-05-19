// TechStackSection.jsx
import React from 'react';

const techs = [
  { name: 'OpenAI', url: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/openai.svg' },
  { name: 'FastAPI', url: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/fastapi.svg' },
  { name: 'React', url: '/src/assets/react.svg' },
  { name: 'gTTS', url: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/google.svg' },
  { name: 'Vercel', url: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/vercel.svg' },
];

export default function TechStackSection() {
  return (
    <section className="section">
      <h2 className="section-title">Tech Stack</h2>
      <div className="techstack-logos">
        {techs.map((t, i) => (
          <img key={i} src={t.url} alt={t.name} className="techstack-logo" title={t.name} />
        ))}
      </div>
    </section>
  );
}
