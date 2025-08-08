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
    cv.onRuntimeInitialized = () => {
      setCvReady(true);
      console.log("OpenCV.js is ready");
    };
  }, []);

  const processImage = () => {
    if (!cvReady) {
      alert("OpenCV is still loading, please wait...");
      return;
    }
    setLoading(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = imgSrc;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const src = cv.imread(canvas);
      const gray = new cv.Mat();
      cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);

      const blurred = new cv.Mat();
      const ksize = new cv.Size(5, 5);
      cv.GaussianBlur(gray, blurred, ksize, 0);

      cv.imshow(canvas, blurred);

      src.delete();
      gray.delete();
      blurred.delete();
    };
  };

  return (
    <>
      {/* ======= Replace this manual input with ImageUploader ======= */}
      <ImageUploader
        imageSrc={imgSrc}
        onImageChange={(src) => {
          setImageSrc(src);
          setResult(null);
        }}
      />


      <canvas ref={canvasRef}></canvas>

      <button onClick={processImage} disabled={!imgSrc || !cvReady}>
        {cvReady ? "Analyze with OpenCV" : "Loading OpenCV..."}
      </button>


      {result && <ResultCard result={result} imageSrc={imgSrc} />}
    </>
  );
}


export default App
