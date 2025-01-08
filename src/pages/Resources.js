import React, { useState } from 'react'
import '../styles/resources.css'

const Resources = () => {
  const videos = {
    history: [
      {
        title: 'World War 2 in 7 Minutes',
        id: 'wvDFsxjaPaE',
        description: 'A quick overview of the key events of World War II.',
      },
      {
        title: 'Roman Empire in 12 Minutes',
        id: 'x3FFDPdLVNw',
        description:
          'Explore the rise and fall of the Roman Empire in this brief video.',
      },
    ],
    geography: [
      {
        title: 'What is Geography',
        id: 'tOqmtWQa-JQ',
        description:
          'Learn about the fundamentals of geography and its importance.',
      },
      {
        title: "Earth's Layers Explained",
        id: 'eXiVGEEPQ6c',
        description:
          "Understand the composition and structure of Earth's layers.",
      },
    ],
    english: [
      {
        title: 'English Grammar Basics',
        id: '6LFjVC3cHjI',
        description:
          'A simple guide to understanding the basics of English grammar.',
      },
      {
        title: 'Improve Writing',
        id: 'pHdzv1NfZRM',
        description: 'Tips and techniques to enhance your writing skills.',
      },
    ],
    maths: [
      {
        title: 'Algebra Basics',
        id: 'NybHckSEQBI',
        description: 'A beginner-friendly introduction to algebraic concepts.',
      },
      {
        title: 'Map of Mathematics',
        id: 'OmJ-4B-mS-Y',
        description:
          'An engaging visual journey through the world of mathematics.',
      },
    ],
    science: [
      {
        title: 'The Water Cycle',
        id: 'zBnKgwnn7i4',
        description:
          'Learn how water moves through the Earth in this fun and educational video.',
      },
      {
        title: 'Basics of Physics',
        id: 'adLj6kygwds',
        description:
          'Understand fundamental concepts of physics in a simple way.',
      },
    ],
    general_knowledge: [
      {
        title: 'Fun Facts',
        id: '2FAws-_ErGo',
        description:
          'A compilation of fascinating and surprising facts from around the world.',
      },
      {
        title: 'How Do Airplanes Fly?',
        id: 'Gg0TXNXgz-w',
        description:
          'Discover the science behind airplane flight and aerodynamics.',
      },
    ],
  }

  const [loadedVideos, setLoadedVideos] = useState({})

  const loadVideo = (category, index) => {
    setLoadedVideos((prev) => ({
      ...prev,
      [`${category}-${index}`]: true,
    }))
  }

  return (
    <div className="resources">
      <h1>Educational Resources</h1>
      <div>
        {Object.keys(videos).map((category) => (
          <div key={category} className="category">
            <h2>{category.replace('_', ' ')}</h2>
            <div className="video-container">
              {videos[category].map((video, index) => {
                const videoKey = `${category}-${index}`

                return (
                  <div key={index} className="video">
                    <h3>{video.title}</h3>
                    <p>{video.description}</p> {/* Add description */}
                    {loadedVideos[videoKey] ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <img
                        src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                        alt={video.title}
                        onClick={() => loadVideo(category, index)}
                        style={{ cursor: 'pointer' }}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Resources
