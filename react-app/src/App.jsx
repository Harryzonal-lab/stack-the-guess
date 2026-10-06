
import { useEffect, useState } from 'react'

import { WORD_BANK, DICEBEAR_STYLES } from './game/wordBank'
import { fetchAvatarSVG } from './game/dicebear'
import { computeHintLength } from './game/hints'

import Hud from './components/Hud'
import Table from './components/Table'
import ControlPanel from './components/ControlPanel'
import HelpModal from './components/HelpModal'

function getRandomWord() {
  return WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)]
}

function App() {
  const [targetWord, setTargetWord] = useState(getRandomWord)
  const [hintLength, setHintLength] = useState(0)

  const [cards, setCards] = useState([])

  const [feedback, setFeedback] = useState('')
  const [score, setScore] = useState(0)
  const [wrongGuesses, setWrongGuesses] = useState(0)

  const [activeCardId, setActiveCardId] = useState(null)

  const [timeLeft, setTimeLeft] = useState(60)
  const [gameOver, setGameOver] = useState(false)

  const [showHelp, setShowHelp] = useState(false)

  // Timer
  useEffect(() => {
    if (gameOver) return

    if (timeLeft === 0) {
      setGameOver(true)
      setFeedback(`Time's up! The word was "${targetWord}".`)
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((currentTime) => currentTime - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, gameOver, targetWord])

  async function handleGuess(guess) {
    if (gameOver) return

    const newHintLength = computeHintLength(
      guess,
      targetWord,
      hintLength
    )

    setHintLength(newHintLength)

    // Correct guess
    if (guess === targetWord) {
      setFeedback('Correct! 🎉')
      setScore((currentScore) => currentScore + 1)
      setGameOver(true)

      const successSound = new Audio('/sounds/success.mp3')
      successSound.play().catch(() => {})

      return
    }

    // Wrong guess
    setFeedback('Wrong guess!')

    setWrongGuesses((currentWrong) => currentWrong + 1)

    const errorSound = new Audio('/sounds/error.mp3')
    errorSound.play().catch(() => {})

    try {
      const randomStyle =
        DICEBEAR_STYLES[
          Math.floor(Math.random() * DICEBEAR_STYLES.length)
        ]

      const svg = await fetchAvatarSVG(
        guess,
        randomStyle
      )

      const newCard = {
        id: crypto.randomUUID(),
        svg,

        // Values used by the original card design.
        dx: Math.floor(Math.random() * 41) - 20,
        dy: Math.floor(Math.random() * 41) - 20,
        rot: Math.floor(Math.random() * 17) - 8,
      }

      setCards((currentCards) => [
        ...currentCards,
        newCard,
      ])
    } catch (error) {
      console.error(error)
      setFeedback('Could not load avatar.')
    }
  }

  function bringCardToFront(cardId) {
    setActiveCardId(cardId)

    setCards((currentCards) => {
      const selectedCard = currentCards.find(
        (card) => card.id === cardId
      )

      if (!selectedCard) return currentCards

      const remainingCards = currentCards.filter(
        (card) => card.id !== cardId
      )

      return [...remainingCards, selectedCard]
    })
  }

  function handleReset() {
    setTargetWord(getRandomWord())
    setHintLength(0)

    setCards([])

    setFeedback('')
    setScore(0)
    setWrongGuesses(0)

    setActiveCardId(null)

    setTimeLeft(60)
    setGameOver(false)
  }

  const hint =
    targetWord.slice(0, hintLength) +
    '_'.repeat(targetWord.length - hintLength)

  return (
    <div className="stage">
      <Hud
        score={score}
        wrongGuesses={wrongGuesses}
        cardCount={cards.length}
        timeLeft={timeLeft}
        onHelp={() => setShowHelp(true)}
      />

      <Table
        cards={cards}
        activeCardId={activeCardId}
        onCardClick={bringCardToFront}
        isWon={feedback === 'Correct! 🎉'}
      />

      <ControlPanel
        hint={hint}
        feedback={feedback}
        onGuess={handleGuess}
        onReset={handleReset}
        disabled={gameOver}
      />

      {showHelp && (
        <HelpModal
          onClose={() => setShowHelp(false)}
        />
      )}
    </div>
  )
}

export default App

