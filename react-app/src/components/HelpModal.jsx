
function HelpModal({ onClose }) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>How to Play</h2>

        <ul>
          <li>Guess the hidden word.</li>

          <li>
            Every wrong guess adds a card.
          </li>

          <li>
            Each wrong guess reveals another hint.
          </li>

          <li>
            Click a card to bring it to the front.
          </li>

          <li>
            You have 60 seconds to solve the word.
          </li>
        </ul>

        <button
          className="guess-submit"
          type="button"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default HelpModal
