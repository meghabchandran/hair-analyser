import { useState, useRef, useEffect } from 'react'
import './App.css'
import ImageUploader from "./components/ImageUploader";
import ResultCard from "./components/ResultCard";

function App() {
  const [imgSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const canvasRef = useRef(null);
  const [cvReady, setCvReady] = useState(false);

  useEffect(() => {
    let interval = setInterval(() => {
      if (window.cv && window.cv['onRuntimeInitialized']) {
        if (!window.cv._hasSetRuntimeInit) {
          window.cv._hasSetRuntimeInit = true;
          window.cv.onRuntimeInitialized = () => {
            setCvReady(true);
            console.log("OpenCV.js is ready");
          };
        }
      }
      if (window.cv && window.cv.Mat) {
        setCvReady(true);
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const processImage = () => {
    if (!cvReady) {
      alert("OpenCV is still loading, please wait...");
      return;
    }
    setLoading(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new window.Image();
    img.src = imgSrc;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const src = window.cv.imread(canvas);
      const gray = new window.cv.Mat();
      window.cv.cvtColor(src, gray, window.cv.COLOR_RGBA2GRAY, 0);

      const blurred = new window.cv.Mat();
      const ksize = new window.cv.Size(5, 5);
      window.cv.GaussianBlur(gray, blurred, ksize, 0);

      window.cv.imshow(canvas, blurred);

      src.delete();
      gray.delete();
      blurred.delete();

      setTimeout(() => {
        const hairCount = Math.floor(Math.random() * 100000) + 20000;
        setResult({ hairCount });
        setLoading(false);
      }, 2000);
    };
  };

  return (
    <>
      <ImageUploader
        imageSrc={imgSrc}
        onImageChange={(src) => {
          setImageSrc(src);
          setResult(null);
        }}
      />

      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

      <button onClick={processImage} disabled={!imgSrc || !cvReady || loading}>
        {loading ? "Scanning..." : cvReady ? "Count Hair" : "Loading OpenCV..."}
      </button>

      {result && (
        <ResultCard
          result={result}
          imageSrc={imgSrc}
          isAnalysing={loading}
        />
      )}
    </>
  );
}

export default App