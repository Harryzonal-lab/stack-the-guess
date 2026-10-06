
export function computeHintLength(
  guess,
  target,
  currentHintLength
) {
  let matchingPrefixLength = 0

  while (
    matchingPrefixLength < guess.length &&
    matchingPrefixLength < target.length &&
    guess[matchingPrefixLength] ===
      target[matchingPrefixLength]
  ) {
    matchingPrefixLength++
  }

  const nextHintLength = Math.max(
    currentHintLength + 1,
    matchingPrefixLength + 1
  )

  return Math.min(
    nextHintLength,
    target.length
  )
}