import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
// import QuizPage from './pages/QuizPage'
import Community from './pages/Community'
import CreateQuiz from './pages/CreateQuiz'
import Profile from './pages/Profile'
import Header from './components/Header'
import Login from './pages/Login'
import Leaderboard from './pages/Leaderboard'
import Footer from './components/Footer'
import './styles.css'
import { UserProvider } from './contexts/UserContext'
import Register from './pages/Register'
import QuizPage from './components/QuizPage'
import Resources from './pages/Resources'
import Tribute from './pages/Tribute'

function App() {
  return (
    <UserProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/quiz/:category" element={<QuizPage />} /> */}
          <Route path="/community" element={<Community />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/create" element={<CreateQuiz />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/quiz/:quiz_id" element={<QuizPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tribute" element={<Tribute />} />
        </Routes>
        <Footer /> {/* Add Footer here */}
      </Router>
    </UserProvider>
  )
}

export default App
