import { useState } from 'react'
import './App.css'


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
const canvas = canvasRef.current;
const ctx = canvas.getContext("2d");
const img = new Image();
img.src = imageSrc;
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
  
  return(
    <>
    <input type="file"accept="image/*" onChange={(e)=> {
      const file = e.target.files[0];
          if (file) {
     const reader = new FileReader();
     reader.onload = () => setImageSrc(reader.result);
      reader.readAsDataURL(file);
    } 
    }

    }
    
    />
     <canvas ref={canvasRef}></canvas>
      <button onClick={processImage} disabled={!imageSrc || !cvReady}>
        {cvReady ? "Analyze with OpenCV" : "Loading OpenCV..."}
      </button>
  </>
  );
  
  }

export default App
