

export default function ResultCard({ result, imageSrc }) {
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
                <img src={imageSrc} alt="result preview" />
            </div>
            <div className="result-right">
                <h2>Estimated Hair Count</h2>
                <div className="count">{hairCount.toLocaleString()}</div>
                <p className="msg">{message}</p>

                <div className="share">
                    <small>Share your result (optional):</small>
                    <div className="share-buttons">
                        <button onClick={() => navigator.clipboard?.writeText(`I have ${hairCount.toLocaleString()} hairs according to HairCounterAI 😂`)}>Copy Text</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
