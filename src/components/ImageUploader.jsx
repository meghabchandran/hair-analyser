export default function ImageUploader({
    imageSrc,
    onImageChange,
    isAnalysing,
    processImage,
    cvReady,
    loading
}) {
    const handleFile = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const allowed = ["image/png", "image/jpeg", "image/webp"];
        if (!allowed.includes(file.type)) {
            alert("Please upload a PNG/JPEG/WebP image.");
            return;
        }
        const reader = new FileReader();
        reader.onload = () => onImageChange(reader.result);
        reader.readAsDataURL(file);
    };

    return (
        <div className="uploader">
            {imageSrc ? (
                <div className="preview" style={{ position: "relative" }}>
                    <img
                        src={imageSrc}
                        alt="preview"
                        style={{
                            width: "300px",
                            height: "300px",
                            objectFit: "cover",
                            borderRadius: "8px",
                            border: "2px solid #ccc",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                        }}
                    />
                    {isAnalysing && (
                        <div className="scanning-overlay">
                            <div className="scanner-bar"></div>
                            <span className="scanning-text">Scanning...</span>
                        </div>
                    )}
                </div>
            ) : (
                <div className="placeholder">No image selected</div>
            )}

            <div className="uploader-controls">
                <label className="upload-btn">
                    Choose Image
                    <input type="file" accept="image/*" onChange={handleFile} hidden />
                </label>
                <button
                    className="count-hair-btn"
                    onClick={processImage}
                    disabled={!imageSrc || !cvReady || loading}
                >
                    {loading ? "Scanning..." : cvReady ? "Count Hair" : "Loading OpenCV..."}
                </button>
            </div>
        </div>
    );
}