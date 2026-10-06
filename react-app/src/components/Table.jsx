
import Card from './Card'

function Table({
  cards,
  activeCardId,
  onCardClick,
  isWon,
}) {
  return (
    <section
      className={`table ${
        isWon ? 'is-won' : ''
      }`}
    >
      <div className="canvas">
        {cards.map((card, index) => (
          <Card
            key={card.id}
            card={card}
            index={index}
            isActive={
              card.id === activeCardId
            }
            onClick={onCardClick}
          />
        ))}
      </div>

      {cards.length === 0 && (
        <p className="empty-state">
          Wrong guesses will appear here.
        </p>
      )}
    </section>
  )
}

export default Table
