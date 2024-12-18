import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/tribute.css'

function Tribute() {
  return (
    <div className="tribute">
      <div className="tribute-container">
        <h1>A Special Tribute</h1>
        <p>
          This website is dedicated to my two wonderful cousins,
          <strong> Najmi </strong> and <strong> Nazmi</strong>.
        </p>
        <p>
          I created this quiz platform with you both in mind. But let's be
          honest, I mostly made it so you guys would stop asking me for my phone
          every time I see you!
        </p>
        <p>
          Now, instead of scrolling endlessly on my phone, you can challenge
          yourselves with fun and educational quizzes. It's like having all the
          entertainment you want, but learning something new along the way!
        </p>
        <blockquote>
          “The beautiful thing about learning is that no one can take it away
          from you.” – B.B. King
        </blockquote>
        <p>
          Wishing you both the very best in life! Keep growing, keep learning,
          and please... give me a break at times! 😄
        </p>

        <div className="tribute-footer">
          <h3>-Lutfil</h3>
        </div>

        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default Tribute
