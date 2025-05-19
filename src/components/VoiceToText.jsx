// VoiceToText.jsx
import React, { useRef, useState } from "react";
import "../landing.css";
import { FaMicrophone, FaStop } from "react-icons/fa";
const BE_BASE_URL = import.meta.env.VITE_BE_BASE_URL;

export default function VoiceToText() {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const recognitionRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);
  const [apiResponse, setApiResponse] = useState(null);

  const startRecording = async () => {
    setTranscript("");
    setApiResponse(null);
    setAudioUrl(null);
    // SpeechRecognition setup
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setTranscript("Speech recognition not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = true;
    recognition.onresult = (event) => {
      let finalTranscript = "";
      for (let i = 0; i < event.results.length; ++i) {
        finalTranscript += event.results[i][0].transcript;
      }
      setTranscript(finalTranscript);
    };
    recognition.onerror = (e) => {
      setTranscript("Speech recognition error: " + e.error);
    };
    recognitionRef.current = recognition;
    recognition.start();
    setRecording(true);
    // Start audio recording
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new window.MediaRecorder(stream, {
      mimeType: "audio/webm",
    });
    mediaRecorderRef.current = mediaRecorder;
    audioChunks.current = [];
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) audioChunks.current.push(e.data);
    };
    mediaRecorder.onstop = async () => {
      console.log("Recording stopped");
      const blob = new Blob(audioChunks.current, { type: "audio/webm" });
      setAudioUrl(URL.createObjectURL(blob));
      // Send .webm file to backend
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("file", blob, "voice.webm");
        const res = await fetch(`${BE_BASE_URL}/voice-to-text`, {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        setApiResponse(data.text || JSON.stringify(data) || "No text returned");
      } catch (e) {
        setApiResponse("Error sending audio: " + e.message);
      }
      setLoading(false);
    };
    mediaRecorder.start();
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }
    setRecording(false);
  };

  return (
    <section className="section" style={{ minHeight: "70vh" }}>
      <h2 className="section-title">Voice to Text</h2>
      <p
        style={{
          textAlign: "center",
          maxWidth: 500,
          margin: "0 auto 2rem auto",
        }}
      >
        Press the microphone to record your voice. Your speech will be converted
        to text using our AI backend.
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        <button
          className="landing-hero-cta"
          style={{
            background: recording ? "var(--secondary)" : "var(--accent)",
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 18,
            position: "relative",
          }}
          onClick={recording ? stopRecording : startRecording}
          aria-pressed={recording}
          aria-label={recording ? "Stop recording" : "Start recording"}
        >
          {recording && (
            <span
              style={{
                display: "inline-block",
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "red",
                marginRight: 6,
                boxShadow: "0 0 8px 2px rgba(255,0,0,0.5)",
                animation: "pulse 1s infinite alternate",
              }}
            />
          )}
          {recording ? <FaStop /> : <FaMicrophone />}{" "}
          {recording ? "Stop" : "Start"} Recording
        </button>
        {/* Add keyframes for pulse animation */}
        <style>{`
          @keyframes pulse {
            0% { box-shadow: 0 0 8px 2px rgba(255,0,0,0.5); }
            100% { box-shadow: 0 0 16px 6px rgba(255,0,0,0.8); }
          }
        `}</style>
        {recording && (
          <div
            style={{
              display: "flex",
              gap: 4,
              margin: "16px 0 0 0",
              height: 32,
            }}
            aria-label="Audio input animation"
          >
            {[1, 2, 3, 4, 5].map((bar, i) => (
              <div
                key={i}
                style={{
                  width: 6,
                  height: 16 + Math.sin(Date.now() / 200 + i) * 8,
                  background: "var(--accent)",
                  borderRadius: 3,
                  animation: `waveBar 1s ${i * 0.1}s infinite ease-in-out`,
                }}
              />
            ))}
          </div>
        )}
        {/* Add keyframes for waveform animation */}
        <style>{`
          @keyframes waveBar {
            0%, 100% { transform: scaleY(1); }
            50% { transform: scaleY(2.2); }
          }
        `}</style>
        {/* Show transcript if available */}
        {transcript && (
          <div
            style={{
              marginTop: 16,
              padding: 12,
              background: "#f5f5f5",
              borderRadius: 8,
              color: "#222",
              minWidth: 200,
              maxWidth: 400,
              fontSize: 18,
              fontWeight: 500,
              textAlign: "center",
            }}
          >
            {transcript}
          </div>
        )}
        {/* Show loading spinner and message while waiting for API response */}
        {loading && (
          <div style={{ marginTop: 16 }}>
            <div className="spinner" style={{
              width: 36, height: 36, border: '4px solid #90caf9', borderTop: '4px solid #1565c0', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto'
            }} />
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            <div style={{ color: '#1565c0', marginTop: 8, fontWeight: 500 }}>Processing...</div>
          </div>
        )}
        {/* Show API response in a separate block if available */}
        {apiResponse && !loading && (
          <div
            style={{
              marginTop: 16,
              padding: 12,
              background: "#e3f2fd",
              borderRadius: 8,
              color: "#1565c0",
              minWidth: 200,
              maxWidth: 400,
              fontSize: 17,
              fontWeight: 500,
              textAlign: "center",
              border: "1px solid #90caf9",
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 6 }}>API Response</div>
            {apiResponse}
          </div>
        )}
        {/* Show download button if audio is available */}
        {audioUrl && (
          <a
            href={audioUrl}
            download="voice.webm"
            style={{
              marginTop: 16,
              display: "inline-block",
              background: "var(--accent)",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: 6,
              fontWeight: 600,
              textDecoration: "none",
              fontSize: 16,
            }}
          >
            Download .webm
          </a>
        )}
      </div>
    </section>
  );
}
