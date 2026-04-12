import { useState, useRef } from 'react'
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import './BeforeAfter.css'

const transformations = [
  {
    before: { icon: '😰', text: 'Hesitate to speak in public', tag: 'Nervous' },
    after:  { icon: '🎤', text: 'Speak fluently & clearly',     tag: 'Confident' },
  },
  {
    before: { icon: '😓', text: 'Fear of making mistakes',       tag: 'Anxious' },
    after:  { icon: '💪', text: 'Learn from mistakes boldly',    tag: 'Fearless' },
  },
  {
    before: { icon: '😶', text: 'Silent in meetings',            tag: 'Unheard' },
    after:  { icon: '🏆', text: 'Lead meetings & presentations', tag: 'Leader' },
  },
  {
    before: { icon: '📖', text: 'Struggle with vocabulary',      tag: 'Limited' },
    after:  { icon: '📚', text: 'Rich vocabulary & expressions', tag: 'Eloquent' },
  },
  {
    before: { icon: '🤐', text: 'Avoid English conversations',   tag: 'Withdrawn' },
    after:  { icon: '🗣️', text: 'Enjoy English conversations',   tag: 'Engaging' },
  },
]

const N = transformations.length
const SEG = 100 / N

export default function BeforeAfter() {
  const trackRef = useRef(null)
  const [sliderPos, setSliderPos] = useState(0)

  // The outer track is tall (see CSS). As the user scrolls through it,
  // the inner "stage" stays pinned to the viewport and the transformation plays.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  })

  // Small start/end deadband so the cards settle before pinning releases.
  const slider = useTransform(scrollYProgress, [0.08, 0.92], [0, 100], { clamp: true })

  useMotionValueEvent(slider, 'change', (v) => {
    setSliderPos(v)
  })

  return (
    <section className="before-after-section" ref={trackRef}>
      <div className="ba-sticky">
      <div className="section-header">
        <span className="section-label">Transformation</span>
        <h2 className="section-title">
          See the <span className="title-accent">difference</span>
        </h2>
        <p className="section-sub">
          Keep scrolling — watch every habit transform, one by one.
        </p>
      </div>

      <div className="ba-wrapper">
        {/* Column labels — red highlight swaps from "Before" → "After" as scroll progresses */}
        <div className={`ba-col-headers ${sliderPos >= 50 ? 'is-after-active' : 'is-before-active'}`}>
          <div className="ba-col-header ba-col-header--before">
            <span className="ba-dot ba-dot--before" /> Before Training
          </div>
          <div className="ba-col-header ba-col-header--after">
            After Training <span className="ba-dot ba-dot--after" />
          </div>
        </div>

        <div className="ba-container" style={{ '--ba-progress': `${sliderPos}%` }}>
          {/* Split background */}
          <div className="ba-bg ba-bg--before" />
          <div className="ba-bg ba-bg--after" style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }} />

          {/* Horizontal card row */}
          <div className="ba-cards">
            {transformations.map((card, i) => {
              const start = i * SEG
              const progress = Math.max(0, Math.min(1, (sliderPos - start) / SEG))
              const revealed = progress >= 0.5

              return (
                <div
                  key={i}
                  className={`ba-card ${revealed ? 'is-after' : 'is-before'}`}
                >
                  {/* Before layer */}
                  <div
                    className="ba-card-state ba-card-state--before"
                    style={{ clipPath: `inset(0 ${progress * 100}% 0 0)` }}
                  >
                    <div className="ba-card-icon ba-card-icon--before">{card.before.icon}</div>
                    <span className="ba-card-tag ba-card-tag--before">{card.before.tag}</span>
                    <span className="ba-card-label ba-card-label--before">{card.before.text}</span>
                  </div>

                  {/* After layer */}
                  <div
                    className="ba-card-state ba-card-state--after"
                    style={{ clipPath: `inset(0 0 0 ${100 - progress * 100}%)` }}
                  >
                    <div className="ba-card-icon ba-card-icon--after">{card.after.icon}</div>
                    <span className="ba-card-tag ba-card-tag--after">{card.after.tag}</span>
                    <span className="ba-card-label ba-card-label--after">{card.after.text}</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Vertical progress bar (auto-driven by scroll) */}
          <div className="ba-slider" style={{ left: `${sliderPos}%` }}>
            <div className="ba-slider-line" />
            <div className="ba-slider-handle">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 6 15 12 9 18" />
              </svg>
            </div>
          </div>
        </div>

        <p className="ba-hint">
          <span className="ba-hint-dot" />
          {sliderPos < 95
            ? 'Scroll down to reveal the transformation'
            : 'You just saw the transformation ✨'}
        </p>
      </div>
      </div>
    </section>
  )
}
