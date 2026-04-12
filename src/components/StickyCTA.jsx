import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './StickyCTA.css'

const WA_LINK =
  'https://api.whatsapp.com/send/?phone=918667272183&text=Hi%2C+I+would+like+to+know+more+about+the+courses.&type=phone_number&app_absent=0'

export default function StickyCTA() {
  const [show, setShow] = useState(false)
  const ready = useRef(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      ready.current = true
      // Only show if not already at Contact section
      const contact = document.getElementById('contact')
      if (contact) {
        const rect = contact.getBoundingClientRect()
        setShow(rect.top > window.innerHeight * 0.5)
      } else {
        setShow(true)
      }
    }, 2000)

    const handleScroll = () => {
      if (!ready.current) return
      const contact = document.getElementById('contact')
      if (!contact) return
      const rect = contact.getBoundingClientRect()
      setShow(rect.top > window.innerHeight * 0.5)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="sticky-cta-bar"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <a
            href={WA_LINK}
            target="_blank"
            rel="noreferrer"
            className="sticky-cta-btn"
          >
            Book a Free Demo
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
