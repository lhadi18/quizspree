import React, { useState, useEffect } from 'react'
import { useUser } from '../contexts/UserContext'
import '../styles/create-quiz.css'

function CreateQuiz() {
  const { user } = useUser()

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [categories, setCategories] = useState([])
  const [questions, setQuestions] = useState([
    {
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: '',
    },
  ])
  const [preview, setPreview] = useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://7783-2402-1980-828b-9014-30bf-4572-ca56-5f1b.ngrok-free.app/api/categories'
        )
        if (!response.ok) throw new Error('Failed to fetch categories')
        const data = await response.json()
        setCategories(data)
      } catch (error) {
        console.error('Error fetching categories:', error)
        alert('Unable to load categories. Please try again later.')
      }
    }
    fetchCategories()
  }, [])

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions]
    if (field === 'question') updatedQuestions[index].question = value
    else if (field === 'explanation')
      updatedQuestions[index].explanation = value
    else updatedQuestions[index].options[field] = value
    setQuestions(updatedQuestions)
  }

  const handleCorrectAnswerChange = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions]
    updatedQuestions[questionIndex].correctAnswer = optionIndex
    setQuestions(updatedQuestions)
  }

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        explanation: '',
      },
    ])
  }

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user?.user_id) {
      alert('You must be logged in to create a quiz.')
      return
    }

    if (
      !title ||
      !category ||
      questions.some((q) => !q.question || q.options.some((o) => !o))
    ) {
      alert('Please fill out all fields.')
      return
    }

    const quizPayload = {
      quiz_name: title,
      category_id: parseInt(category),
      created_by: user?.user_id,
      questions: questions.map((q) => ({
        question_text: q.question,
        question_type: 'mcq',
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
      })),
    }

    try {
      const response = await fetch(
        'https://7783-2402-1980-828b-9014-30bf-4572-ca56-5f1b.ngrok-free.app/api/quizzes',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(quizPayload),
        }
      )
      if (!response.ok) throw new Error('Failed to submit quiz')

      alert('Quiz submitted successfully!')
      setTitle('')
      setCategory('')
      setQuestions([
        {
          question: '',
          options: ['', '', '', ''],
          correctAnswer: 0,
          explanation: '',
        },
      ])
    } catch (error) {
      console.error('Error submitting quiz:', error)
      alert('An error occurred while submitting the quiz.')
    }
  }

  return (
    <div className="create-quiz">
      <h2>Create a New Quiz</h2>
      <form onSubmit={handleSubmit}>
        {/* Quiz Title */}
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter quiz title"
        />

        {/* Category Dropdown */}
        <label>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.category_id} value={cat.category_id}>
              {cat.category_name}
            </option>
          ))}
        </select>

        {/* Questions */}
        <h3>Questions</h3>
        {questions.map((q, qIndex) => (
          <div className="question" key={qIndex}>
            <input
              type="text"
              value={q.question}
              onChange={(e) =>
                handleQuestionChange(qIndex, 'question', e.target.value)
              }
              placeholder={`Question ${qIndex + 1}`}
            />

            {q.options.map((option, oIndex) => (
              <div key={oIndex} className="option">
                <input
                  type="text"
                  value={option}
                  onChange={(e) =>
                    handleQuestionChange(qIndex, oIndex, e.target.value)
                  }
                  placeholder={`Option ${oIndex + 1}`}
                />
                <label>
                  <input
                    type="radio"
                    checked={q.correctAnswer === oIndex}
                    onChange={() => handleCorrectAnswerChange(qIndex, oIndex)}
                  />
                  Correct
                </label>
              </div>
            ))}
            <label>Explanation:</label>
            <textarea
              value={q.explanation}
              onChange={(e) =>
                handleQuestionChange(qIndex, 'explanation', e.target.value)
              }
              placeholder="Provide explanation for correct answer"
            />
            <button type="button" onClick={() => removeQuestion(qIndex)}>
              Remove Question
            </button>
          </div>
        ))}

        {/* Add Question Button */}
        <button type="button" onClick={addQuestion}>
          Add Question
        </button>

        {/* Submit Button */}
        <button type="submit">Submit Quiz</button>
      </form>
    </div>
  )
}

export default CreateQuiz
