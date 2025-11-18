import React from "react";

const LoadingSpinner: React.FC = () => (
  <div style={{ padding: 24, textAlign: "center" }}>
    <div style={{ display: "inline-block", width: 36, height: 36, borderRadius: "50%", border: "4px solid rgba(11,92,255,0.15)", borderTopColor: "#0b5cff", animation: "spin 1s linear infinite" }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

export default LoadingSpinner;
