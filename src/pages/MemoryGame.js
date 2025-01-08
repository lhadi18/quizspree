import React, { useState, useEffect } from 'react'
import '../styles/memorygame.css'

function MemoryGame() {
  // List of colors for the memory game
  const colors = [
    'red',
    'blue',
    'green',
    'yellow',
    'purple',
    'orange',
    'red',
    'blue',
    'green',
    'yellow',
    'purple',
    'orange',
  ]

  const shuffleColors = (array) => {
    return array.sort(() => Math.random() - 0.5)
  }

  const [shuffledColors, setShuffledColors] = useState(shuffleColors(colors))
  const [openedCards, setOpenedCards] = useState([])
  const [matchedCards, setMatchedCards] = useState([])
  const [moves, setMoves] = useState(0)

  const handleCardClick = (index) => {
    if (openedCards.length === 2 || openedCards.includes(index)) return

    const newOpenedCards = [...openedCards, index]
    setOpenedCards(newOpenedCards)

    if (newOpenedCards.length === 2) {
      setMoves((prevMoves) => prevMoves + 1)

      const [firstIndex, secondIndex] = newOpenedCards
      if (shuffledColors[firstIndex] === shuffledColors[secondIndex]) {
        setMatchedCards((prev) => [...prev, firstIndex, secondIndex])
        setOpenedCards([])
      } else {
        setTimeout(() => setOpenedCards([]), 1000)
      }
    }
  }

  useEffect(() => {
    if (matchedCards.length === colors.length) {
      alert(`You won in ${moves} moves!`)
      resetGame()
    }
  }, [matchedCards])

  const resetGame = () => {
    setShuffledColors(shuffleColors(colors))
    setOpenedCards([])
    setMatchedCards([])
    setMoves(0)
  }

  return (
    <div className="memory-game">
      <h1>Color Memory Game</h1>
      <div className="game-grid">
        {shuffledColors.map((color, index) => (
          <div
            key={index}
            className={`card ${
              openedCards.includes(index) || matchedCards.includes(index)
                ? 'flipped'
                : ''
            }`}
            onClick={() => handleCardClick(index)}
            style={{
              backgroundColor:
                openedCards.includes(index) || matchedCards.includes(index)
                  ? color
                  : '#ccc',
            }}
          ></div>
        ))}
      </div>
      <div className="game-info">
        <p>Moves: {moves}</p>
        <button onClick={resetGame}>Restart Game</button>
      </div>
    </div>
  )
}

export default MemoryGame
