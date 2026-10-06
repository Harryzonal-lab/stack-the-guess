
function Hud({
  score,
  wrongGuesses,
  cardCount,
  timeLeft,
  onHelp,
}) {
  return (
    <header className="hud">
      <div className="hud-title">
        <h1>Stack the Guess</h1>

        <p className="hud-subtitle">
          Guess the word. Stack the cards.
        </p>
      </div>

      <div className="hud-stats">
        <div className="stat">
          <span className="stat-value">
            {score}
          </span>

          <span className="stat-label">
            score
          </span>
        </div>

        <div className="stat">
          <span className="stat-value">
            {wrongGuesses}
          </span>

          <span className="stat-label">
            wrong
          </span>
        </div>

        <div className="stat">
          <span className="stat-value">
            {cardCount}
          </span>

          <span className="stat-label">
            cards
          </span>
        </div>

        <div className="timer">
          ⏱️ {timeLeft}s
        </div>

        <button
          className="icon-btn"
          type="button"
          onClick={onHelp}
          aria-label="How to play"
        >
          ?
        </button>
      </div>
    </header>
  )
}

export default Hud
