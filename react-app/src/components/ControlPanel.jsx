
import { useState } from 'react'

function ControlPanel({
  hint,
  feedback,
  onGuess,
  onReset,
  disabled,
}) {
  const [guess, setGuess] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    if (!guess.trim() || disabled) {
      return
    }

    onGuess(guess.toLowerCase().trim())

    setGuess('')
  }

  return (
    <section className="control-panel">
      <div className="hint-row">
        <div className="hint-label">
          💡 Hint
        </div>

        <div className="hint-display">
          {hint.split('').map(
            (character, index) => (
              <span
                key={index}
                className={
                  character === '_'
                    ? 'blank'
                    : 'revealed'
                }
              >
                {character}
              </span>
            )
          )}
        </div>
      </div>

      <form
        className="guess-form"
        onSubmit={handleSubmit}
      >
        <input
          className="guess-input"
          type="text"
          value={guess}
          disabled={disabled}
          onChange={(event) =>
            setGuess(event.target.value)
          }
          placeholder="What's the word?"
        />

        <button
          className="guess-submit"
          type="submit"
          disabled={disabled}
        >
          Guess
        </button>
      </form>

      <p className="feedback">
        {feedback}
      </p>

      <button
        className="guess-submit"
        type="button"
        onClick={onReset}
      >
        New Word
      </button>
    </section>
  )
}

export default ControlPanel
