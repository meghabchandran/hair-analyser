export default function ResultCard({ result, imageSrc, onReset }) {
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
            <div className="result-left">
                <img
                    src={imageSrc}
                    alt="Analyzed scalp"
                    className="result-image"
                />
            </div>
            <div className="result-right">
                <h2>Estimated Hair Count</h2>
                <div className="count">{hairCount.toLocaleString()}</div>
                <p className="msg">{message}</p>

                <div className="redo-section">
                    <button className="upload-btn" onClick={onReset}>
                        Analyze Another
                    </button>
                </div>
            </div>
        </div>
    );
}
