import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import './IntroAnimation.css'

/*
  CINEMATIC SEQUENCE:
  Step 0 (0.0s)  → Black screen
  Step 1 (0.3s)  → "E" tile (red) scales in from center
  Step 2 (0.9s)  → "P" tile (blue) scales in from center
  Step 3 (1.8s)  → Both tiles expand wide, letters slide to their positions
  Step 4 (2.5s)  → Full words "English" and "Partner" reveal inside the tiles
  Step 5 (3.2s)  → Subtitle "The Language Hub" fades up
  Step 6 (4.0s)  → The entire logo shrinks and flies up to its nav position
  Step 7 (4.8s)  → Intro overlay fades out, page content revealed
*/

export default function IntroAnimation({ onComplete }) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 300),
      setTimeout(() => setStep(2), 900),
      setTimeout(() => setStep(3), 1800),
      setTimeout(() => setStep(4), 2500),
      setTimeout(() => setStep(5), 3200),
      setTimeout(() => setStep(6), 4000),
      setTimeout(() => setStep(7), 5000),
      setTimeout(() => { onComplete && onComplete() }, 5400),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  const isExpanded   = step >= 3
  const showSubtitle = step >= 5
  const flyToNav     = step >= 6
  const fadeOut      = step >= 7

  return (
    <AnimatePresence>
      {!fadeOut ? (
        <motion.div
          className="intro-overlay"
          initial={{ opacity: 1 }}
          animate={{ opacity: fadeOut ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {/* Ambient background particles */}
          <div className="particles">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="particle"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: step >= 1 ? [0, 0.6, 0] : 0,
                  scale: step >= 1 ? [0, 1, 0] : 0,
                  x: `${(Math.random() - 0.5) * 400}px`,
                  y: `${(Math.random() - 0.5) * 400}px`,
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 2,
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: i % 2 === 0 ? 'var(--ep-red)' : 'var(--ep-blue)',
                }}
              />
            ))}
          </div>

          {/* Main logo group — flies to nav on step 6 */}
          <motion.div
            className="logo-group"
            animate={
              flyToNav
                ? {
                    y: '-42vh',
                    x: '-38vw',
                    scale: 0.22,
                  }
                : { y: 0, x: 0, scale: 1 }
            }
            transition={
              flyToNav
                ? { duration: 0.8, ease: [0.68, -0.06, 0.265, 1.2] }
                : { duration: 0 }
            }
          >
            {/* The two tiles row */}
            <div className="tiles-row">

              {/* ── RED TILE — "E" → expands → "English" ── */}
              <AnimatePresence>
                {step >= 1 && (
                  <motion.div
                    className="tile red-tile"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      width: isExpanded ? 'clamp(180px, 26vw, 360px)' : 'clamp(90px, 14vw, 140px)',
                      height: isExpanded ? 'clamp(70px, 9vw, 110px)' : 'clamp(90px, 14vw, 140px)',
                      borderRadius: isExpanded ? '16px 0 0 16px' : '16px',
                    }}
                    transition={{
                      scale:        { type: 'spring', stiffness: 280, damping: 22, delay: 0 },
                      opacity:      { duration: 0.3 },
                      width:        { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                      height:       { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                      borderRadius: { duration: 0.5 },
                    }}
                  >
                    {/* Split word: "E" stays, "nglish" slides out */}
                    <div className="tile-text">
                      <span className="first-char">E</span>
                      <motion.div
                        className="rest-clip"
                        initial={{ maxWidth: 0, opacity: 0 }}
                        animate={{
                          maxWidth: isExpanded ? '220px' : 0,
                          opacity:  isExpanded ? 1 : 0,
                        }}
                        transition={{
                          maxWidth: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.12 },
                          opacity:  { duration: 0.3, delay: 0.12 },
                        }}
                      >
                        <span className="rest-chars">nglish</span>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── BLUE TILE — "P" → expands → "Partner" ── */}
              <AnimatePresence>
                {step >= 2 && (
                  <motion.div
                    className="tile blue-tile"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      width: isExpanded ? 'clamp(180px, 26vw, 360px)' : 'clamp(90px, 14vw, 140px)',
                      height: isExpanded ? 'clamp(70px, 9vw, 110px)' : 'clamp(90px, 14vw, 140px)',
                      borderRadius: isExpanded ? '0 16px 16px 0' : '16px',
                    }}
                    transition={{
                      scale:        { type: 'spring', stiffness: 280, damping: 22, delay: 0 },
                      opacity:      { duration: 0.3 },
                      width:        { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                      height:       { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                      borderRadius: { duration: 0.5 },
                    }}
                  >
                    {/* Split word: "P" stays, "artner" slides out */}
                    <div className="tile-text">
                      <span className="first-char">P</span>
                      <motion.div
                        className="rest-clip"
                        initial={{ maxWidth: 0, opacity: 0 }}
                        animate={{
                          maxWidth: isExpanded ? '220px' : 0,
                          opacity:  isExpanded ? 1 : 0,
                        }}
                        transition={{
                          maxWidth: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.12 },
                          opacity:  { duration: 0.3, delay: 0.12 },
                        }}
                      >
                        <span className="rest-chars">artner</span>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Subtitle: The Language Hub */}
            <motion.div
              className="subtitle-wrap"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: showSubtitle ? 1 : 0, y: showSubtitle ? 0 : 16 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <span className="subtitle-text">The Language Hub</span>
            </motion.div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
