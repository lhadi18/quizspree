import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom'
import Home from './pages/Home'
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
import MemoryGame from './pages/MemoryGame'

function App() {
  return (
    <UserProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/community" element={<Community />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/create" element={<CreateQuiz />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/quiz/:quiz_id" element={<QuizPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tribute" element={<Tribute />} />
          <Route path="/memorygame" element={<MemoryGame />} />
        </Routes>
        <FooterVisibility />
      </Router>
    </UserProvider>
  )
}

function FooterVisibility() {
  const location = useLocation()

  // Only render the Footer if we're not on the /leaderboard page
  if (location.pathname === '/leaderboard' || location.pathname === '/blog') {
    return null
  }

  return <Footer />
}

export default App
