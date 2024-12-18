import React, { useState } from 'react'
import '../styles/resources.css'

const Resources = () => {
  const videos = {
    history: [
      {
        title: 'World War 2 in 7 Minutes',
        id: 'wvDFsxjaPaE',
      },
      {
        title: 'Roman Empire in 12 Minutes',
        id: 'x3FFDPdLVNw',
      },
    ],
    geography: [
      {
        title: 'What is Geography',
        id: 'tOqmtWQa-JQ',
      },
      {
        title: "Earth's Layers Explained",
        id: 'eXiVGEEPQ6c',
      },
    ],
    english: [
      {
        title: 'English Grammar Basics',
        id: '6LFjVC3cHjI',
      },
      {
        title: 'Improve Writing',
        id: 'pHdzv1NfZRM',
      },
    ],
    maths: [
      {
        title: 'Algebra Basics',
        id: 'NybHckSEQBI',
      },
      {
        title: 'Map of Mathematics',
        id: 'OmJ-4B-mS-Y',
      },
    ],

    science: [
      {
        title: 'The Water Cycle',
        id: 'zBnKgwnn7i4',
      },
      {
        title: 'Basics of Physics',
        id: 'adLj6kygwds',
      },
    ],
    general_knowledge: [
      {
        title: 'Fun Facts',
        id: '2FAws-_ErGo',
      },
      {
        title: 'How Do Airplanes Fly?',
        id: 'Gg0TXNXgz-w',
      },
    ],
  }

  // Track which videos have been clicked
  const [loadedVideos, setLoadedVideos] = useState({})

  // Function to load iframe for a video
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
                    {loadedVideos[videoKey] ? (
                      // Render the iframe when the video is clicked
                      <iframe
                        src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      // Show thumbnail by default
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
