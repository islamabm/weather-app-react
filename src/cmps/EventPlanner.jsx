import React, { useState } from 'react'
import { getAdvice } from '../services/openai.service'

export default function EventPlanner({ weather, closeModal }) {
  const [question, setQuestion] = useState('')
  const [advice, setAdvice] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleInputChange = (event) => {
    setQuestion(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    const advice = await getAdvice(question, weather)
    console.log('advice', advice)
    setAdvice(advice)
    setLoading(false)
  }

  return (
    <div className="modal-overlay">
      <div className="gpt-modal">
        <button className="close-btn" onClick={closeModal}>
          X
        </button>
        {/* <img
          className="right"
          src="https://chatgptdetector.co/wp-content/uploads/2023/02/AI-Detector-Bot.webp"
        /> */}
        <form onSubmit={handleSubmit}>
          <input
            name="question"
            value={question}
            onChange={handleInputChange}
            placeholder="Ask for advice"
          />
          <button className="advice-btn" type="submit">
            Get Advice
          </button>
        </form>
        {advice && <p>{advice}</p>}
        {loading && <span class="loader"></span>}
      </div>
    </div>
  )
}
