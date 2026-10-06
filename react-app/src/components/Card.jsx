
function Card({
  card,
  index,
  isActive,
  onClick,
}) {
  return (
    <div
      className={`card ${
        isActive ? 'is-selected' : ''
      }`}
      onClick={() => onClick(card.id)}
      style={{
        '--dx': `${card.dx}px`,
        '--dy': `${card.dy}px`,
        '--rot': `${card.rot}deg`,
        zIndex: index + 1,
      }}
    >
      {/*
        DiceBear returns trusted SVG markup from its API.
        dangerouslySetInnerHTML is required to render
        that SVG string as actual SVG.
      */}
      <div
        dangerouslySetInnerHTML={{
          __html: card.svg,
        }}
      />
    </div>
  )
}

export default Card
