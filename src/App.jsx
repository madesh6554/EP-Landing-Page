import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from './Navbar'
import WhatsAppFloat from './components/WhatsAppFloat'
import LetterPop from './components/LetterPop'
import Features from './sections/Features'
import Courses from './sections/Courses'
import Testimonials from './sections/Testimonials'
import FAQ from './sections/FAQ'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import WhoIsItFor from './sections/WhoIsItFor'
import HeroCarousel from './sections/HeroCarousel'
import BeforeAfter from './sections/BeforeAfter'
import StickyCTA from './components/StickyCTA'
import './App.css'

const WA_LINK = 'https://api.whatsapp.com/send/?phone=918667272183&text=Hi%2C+I+would+like+to+know+more+about+the+courses.&type=phone_number&app_absent=0'

export default function App() {
  const [introDone] = useState(true)

  useEffect(() => {
    document.body.classList.add('page-ready')
  }, [])

  return (
    <>
      {/* Floating WhatsApp button */}
      {introDone && <WhatsAppFloat />}

      {/* Click-to-pop alphabet letters */}
      {introDone && <LetterPop />}

      {/* Sticky CTA bar (mobile only) */}
      {introDone && <StickyCTA />}

      {/* Site shell */}
      <div className={`site-shell ${introDone ? 'visible' : ''}`}>
        <Navbar visible={introDone} />

        {/* ── Hero ── */}
        <main className="hero-placeholder" id="home">
          <div className="hero-content">

            <motion.div
              className="hero-badge"
              initial={{ opacity: 0, y: 20 }}
              animate={introDone ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              🎓 Face-to-Face Classroom Training · Coimbatore
            </motion.div>

            <motion.h1
              className="hero-headline"
              initial={{ opacity: 0, y: 30 }}
              animate={introDone ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              Speak with <span className="highlight-red">Confidence.</span><br />
              Grow with <span className="highlight-blue">English.</span>
            </motion.h1>

            <motion.p
              className="hero-sub"
              initial={{ opacity: 0, y: 20 }}
              animate={introDone ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Offline spoken English classes in Coimbatore — combining 1-to-1 trainer
              personalised training and group learning to help you communicate with real confidence.
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={introDone ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <a
                href={WA_LINK}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                💬 Book a Free Demo
              </a>
              <a href="#features" className="btn-ghost">Learn More ↓</a>
            </motion.div>

          </div>

          {/* Cinematic Hero Carousel */}
          <HeroCarousel introDone={introDone} />

          {/* Decorative glow orbs */}
          <div className="glow-orb orb-red" />
          <div className="glow-orb orb-blue" />

          {/* Scroll indicator */}
          {introDone && (
            <motion.div
              className="scroll-indicator"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              <span>Scroll</span>
              <motion.div
                className="scroll-dot"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          )}
        </main>

        {/* ── All Sections ── */}
        <WhoIsItFor />
        <Features />
        <Courses />
        <BeforeAfter />
        <Testimonials />
        <FAQ />
        <Contact />
        <Footer />
      </div>
    </>
  )
}
