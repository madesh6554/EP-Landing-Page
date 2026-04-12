import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './LetterPop.css'

const ALPHABETS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const COLORS = ['#C8102E', '#1B2E6B', '#9333ea', '#4a7cff', '#f59e0b', '#10b981']

function randomBetween(min, max) {
  return min + Math.random() * (max - min)
}

let idCounter = 0

export default function LetterPop() {
  const [letters, setLetters] = useState([])

  const spawnLetters = useCallback((x, y) => {
    const count = Math.floor(randomBetween(5, 9))
    const ids = []

    setLetters((prev) => {
      const batch = []
      for (let i = 0; i < count; i++) {
        const id = ++idCounter
        ids.push(id)
        batch.push({
          id,
          char: ALPHABETS[Math.floor(Math.random() * ALPHABETS.length)],
          x,
          y,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          size: randomBetween(16, 36),
          dx: randomBetween(-120, 120),
          dy: randomBetween(-180, -40),
          rotate: randomBetween(-180, 180),
          delay: i * 0.03,
          duration: randomBetween(0.8, 1.4),
        })
      }
      return [...prev, ...batch]
    })

    setTimeout(() => {
      setLetters((prev) => prev.filter((l) => !ids.includes(l.id)))
    }, 2000)
  }, [])

  useEffect(() => {
    const handleClick = (e) => {
      spawnLetters(e.clientX, e.clientY)
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [spawnLetters])

  return (
    <div className="letter-pop-layer">
      <AnimatePresence>
        {letters.map((l) => (
          <motion.span
            key={l.id}
            className="pop-letter"
            initial={{
              x: l.x,
              y: l.y,
              opacity: 0,
              scale: 0,
              rotate: 0,
            }}
            animate={{
              x: l.x + l.dx,
              y: l.y + l.dy,
              opacity: [0, 1, 1, 0],
              scale: [0, 1.3, 1, 0.5],
              rotate: l.rotate,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              duration: l.duration,
              delay: l.delay,
              ease: [0.16, 1, 0.3, 1],
              opacity: {
                duration: l.duration,
                delay: l.delay,
                times: [0, 0.12, 0.65, 1],
              },
              scale: {
                duration: l.duration,
                delay: l.delay,
                times: [0, 0.15, 0.5, 1],
              },
            }}
            style={{
              color: l.color,
              fontSize: l.size,
              fontWeight: l.size > 28 ? 800 : 700,
            }}
          >
            {l.char}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  )
}
