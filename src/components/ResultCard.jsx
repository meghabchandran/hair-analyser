export default function ResultCard({ result, imageSrc, isAnalysing }) {
    const { hairCount } = result;

    const message =
        hairCount > 120000
            ? "Wow — lush mane! 🌿"
            : hairCount > 60000
                ? "Nice hair density! 😎"
                : hairCount > 20000
                    ? "Moderate density — manageable ✨"
                    : "Hmm — consider a hair care regimen 🧴";

    return (
        <div className="result">
            <div className="result-left" style={{ position: "relative" }}>
                <img src={imageSrc} alt="result preview" style={{
                    width: "300px",
                    height: "300px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    border: "2px solid #ccc",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                }} />
                {isAnalysing && (
                    <div className="scanning-overlay">
                        <div className="scanner-bar"></div>
                        <span className="scanning-text">Scanning...</span>
                    </div>
                )}
            </div>
            <div className="result-right">
                {!isAnalysing && (
                    <>
                        <h2>Estimated Hair Count</h2>
                        <div className="count">{hairCount.toLocaleString()}</div>
                        <p className="msg">{message}</p>
                        <div className="share">
                            <small>Share your result (optional):</small>
                            <div className="share-buttons">
                                <button onClick={() => navigator.clipboard?.writeText(`I have ${hairCount.toLocaleString()} hairs according to HairCounterAI 😂`)}>Copy Text</button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}