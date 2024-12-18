import React, { useState, useEffect } from 'react'
import '../styles/leaderboard.css'
import { useUser } from '../contexts/UserContext'

function Leaderboard() {
  const { user } = useUser() // Get the logged-in user
  const [leaderboard, setLeaderboard] = useState([])
  const [currentTab, setCurrentTab] = useState('daily')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const itemsPerPage = 5 // Number of leaderboard entries per page

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // Clear leaderboard data when switching tabs
        setLeaderboard([])

        // Fetch data from the backend API
        const response = await fetch(
          `https://7783-2402-1980-828b-9014-30bf-4572-ca56-5f1b.ngrok-free.app/api/leaderboards?period=${currentTab}`
        )

        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard data')
        }

        const data = await response.json()

        // Paginate the data
        const startIndex = (currentPage - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        const paginatedData = data.slice(startIndex, endIndex)

        setLeaderboard(paginatedData)
        setTotalPages(Math.ceil(data.length / itemsPerPage))
      } catch (error) {
        console.error('Error fetching leaderboard:', error)
        setLeaderboard([]) // Clear leaderboard on error
      }
    }

    fetchLeaderboard()
  }, [currentPage, currentTab])

  const isUserHighlighted = (username) => user?.username === username

  return (
    <div className="leaderboard full-screen">
      <h1>Leaderboard</h1>

      {/* Tabs */}
      <div className="tabs">
        {['daily', 'weekly', 'monthly'].map((tab) => (
          <button
            key={tab}
            className={`tab-button ${currentTab === tab ? 'active' : ''}`}
            onClick={() => {
              setCurrentTab(tab)
              setCurrentPage(1)
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Leaderboard List */}
      {leaderboard.length > 0 ? (
        <div className="leaderboard-list">
          {leaderboard.map((entry, index) => (
            <div
              key={index}
              className={`leaderboard-card ${
                isUserHighlighted(entry.username) ? 'highlight' : ''
              }`}
            >
              <div className="rank">
                #{(currentPage - 1) * itemsPerPage + index + 1}
              </div>
              <div className="details">
                <h2>{entry.username}</h2>
                <p>
                  <strong>Total Score:</strong> {entry.total_score}
                </p>
                <p>
                  <strong>Quizzes Taken:</strong> {entry.quizzes_taken}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Creative Message for Empty Leaderboard
        <div className="empty-leaderboard">
          <h2>No Quiz Heroes Yet!</h2>
          <div className="trophy-emoji" style={{ fontSize: '3rem' }}>
            🏆
          </div>
          <p>Claim the crown and make your mark on the leaderboard!</p>
        </div>
      )}

      {/* Pagination */}
      {leaderboard.length > 0 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default Leaderboard
