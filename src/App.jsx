import React, { useState } from "react";
import ResultCard from "./components/ResultCard";
import ImageUploader from "./components/ImageUploader";

export default function App() {
  const [imageSrc, setImageSrc] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({ hairCount: 0 });

  const handleImageChange = (src) => {
    setImageSrc(src);
    setShowResult(false);
  };

  const handleCountHair = () => {
    // Simulate hair count
    const hairCount = Math.floor(Math.random() * 140000) + 10000;
    setResult({ hairCount });
    setShowResult(true);
  };

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", padding: 24, border: "1px solid #ddd", borderRadius: 8 }}>
      {!showResult ? (
        <>
          <h2>Upload a Pic</h2>
          <ImageUploader imageSrc={imageSrc} onImageChange={handleImageChange} />
          <button
            style={{ marginTop: 24, width: "100%", padding: "12px 0", fontSize: 16 }}
            onClick={handleCountHair}
            disabled={!imageSrc}
          >
            Count Hair
          </button>
        </>
      ) : (
        <ResultCard result={result} imageSrc={imageSrc} />
      )}
    </div>
  );
}