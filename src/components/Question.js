import React from 'react'

function Question({ question, options, onAnswer }) {
  return (
    <div className="question">
      <p>{question}</p>
      <div className="options">
        {options.map((option, index) => (
          <button key={index} onClick={() => onAnswer(index)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Question
