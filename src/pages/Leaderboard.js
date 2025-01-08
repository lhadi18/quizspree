import React, { useState } from 'react'
import '../styles/leaderboard.css'

function Leaderboard() {
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 1 // Display 1 post per page

  // Simulated blog data with multiple images
  const blogPosts = [
    {
      title: 'Learning to Code: A Fun Adventure!',
      content: `Coding is like solving puzzles. With every line of code, you’re getting closer to building something amazing. 

Whether you want to create a website, a game, or an app, the possibilities are endless! Coding also teaches you how to think logically and solve problems creatively. Did you know that many popular games, like Minecraft, started as small coding projects?

Start small with fun tutorials and beginner-friendly projects. Platforms like Scratch or Code.org make it super easy to learn the basics while having fun. Once you’re comfortable, try building your own website or designing a game for your friends. Remember, every expert coder was once a beginner!`,
      images: [
        'https://www.journey.sekolahauliya.sch.id/wp-content/uploads/2023/12/Pembelajaran-Coding-di-SD-Pentingnya-Mengembangkan-Keterampilan-Digital-Sejak-Dini-.jpeg',
        'https://potomac.edu/wp-content/uploads/2020/12/benefits-of-coding-e1606911064541.jpg',
      ],
    },
    {
      title: 'The Magic of Numbers: Fun Math Tricks',
      content: `Math is everywhere, and it’s not just about numbers—it’s about discovering patterns and solving problems. Did you know that you can use math to impress your friends with cool tricks?

For example, here’s a simple one: Pick any number, multiply it by 2, add 8, divide it by 2, and subtract the original number. No matter what number you pick, the answer will always be 4!

Math isn’t just about equations. It’s used in video games, building skyscrapers, and even in space exploration. Next time someone asks "When will I ever use math?" you can tell them it’s used for coding, art, music, and so much more!`,
      images: [
        'https://image.pbs.org/poster_images/assets/6_magic_video_still.png',
        'https://www.risingstars-uk.com/getmedia/d288e6c1-7d03-4ad6-b0b4-8ea97ecc1728/maths-magic_2?width=560&height=560&ext=.png',
      ],
    },
    {
      title: 'Exploring the World: Fun Science Facts',
      content: `Science is like a treasure hunt—it helps us understand how the world works. Did you know that a single teaspoon of honey is the lifelong work of 12 bees? Or that there’s a type of jellyfish that can potentially live forever?

If you’re curious about the universe, you might love learning about black holes, which are so strong they can pull in light! Science is all around us—from the technology in your smartphone to the stars in the night sky.

Next time you drink water, think about this: The water you’re drinking is older than the dinosaurs! Science is full of wonders, and the more you explore, the more you’ll find.`,
      images: [
        'https://www.mnature.co.uk/wp-content/uploads/2019/03/Blog-Mother-Nature-Science-1.jpg',
        'https://www.hand2mind.com/media/wysiwyg/Publisher_Aligned_Kits/exploring_science__2.png',
      ],
    },
    {
      title: 'Discovering New Languages: Why It’s Cool!',
      content: `Learning a new language opens up a world of possibilities. Imagine being able to chat with friends from different countries, watch movies without subtitles, or even travel the world with ease!

Languages like Spanish, French, or Japanese can be exciting to learn. Start with simple words and phrases, and try practicing with language apps like Duolingo or Memrise. You’ll be amazed at how quickly you can pick up new words.

And here’s a fun fact: Learning languages can actually make you smarter! It helps improve memory and problem-solving skills. Plus, you can learn about other cultures and make friends from all over the globe.`,
      images: [
        'https://www.mcislanguages.com/wp-content/uploads/iStock-1337786250.jpg',
        'https://www.timeshighereducation.com/sites/default/files/styles/the_breaking_news_image_style/public/languages-signpost.jpg?itok=VSbR4uZ9',
      ],
    },
    {
      title: 'Amazing Art: Express Yourself Through Creativity',
      content: `Art is one of the best ways to share your ideas, feelings, and imagination. You can draw, paint, sculpt, or even create digital art—there are no limits to what you can create.

Did you know that art has been a part of human history for thousands of years? From ancient cave paintings to modern digital masterpieces, art connects us all.

If you’re not sure where to start, try sketching something simple, like your favorite animal or a flower. Or explore apps that let you create digital art on your phone or tablet. Remember, art isn’t about being perfect—it’s about having fun and expressing yourself. So grab your pencil, brush, or stylus and start creating!`,
      images: [
        'https://www.ooly.com/cdn/shop/articles/IMG_1759.jpg?v=1708997724&width=2048',
        'https://kinderart.com/wp-content/uploads/5_creative_activities-1.jpg.webp',
      ],
    },
  ]

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPosts = blogPosts.slice(startIndex, endIndex)

  const totalPages = Math.ceil(blogPosts.length / itemsPerPage)

  return (
    <div className="leaderboard full-screen">
      <h1 className="leaderboard-title">Educational Reads</h1>

      {/* Blog Post */}
      <div className="blog-post">
        {currentPosts.map((post, index) => (
          <div key={index} className="blog-card">
            {/* Carousel */}
            <Carousel images={post.images} />
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
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
    </div>
  )
}

// Carousel Component
function Carousel({ images }) {
  const [currentImage, setCurrentImage] = useState(0)

  const handlePrev = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="carousel">
      <button className="carousel-button prev" onClick={handlePrev}>
        &#10094;
      </button>
      <img
        src={images[currentImage]}
        alt={`Slide ${currentImage + 1}`}
        className="carousel-image"
      />
      <button className="carousel-button next" onClick={handleNext}>
        &#10095;
      </button>
    </div>
  )
}

export default Leaderboard
