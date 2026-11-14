import { Routes, Route, useLocation } from 'react-router'
import { AnimatePresence, MotionConfig } from 'motion/react'

import Layout from './components/Layout.jsx'
import IntroOverlay from './components/IntroOverlay.jsx'
import Home from './pages/Home.jsx'
import Archive from './pages/Archive.jsx'
import WorkDetail from './pages/WorkDetail.jsx'
import Laboratory from './pages/Laboratory.jsx'
import Manifesto from './pages/Manifesto.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  const location = useLocation()

  return (
    // reducedMotion="user"：使用者系統開啟「減少動態」時，Motion 會停用位移類動畫
    <MotionConfig reducedMotion="user">
      <Layout>
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/archive/:id" element={<WorkDetail />} />
            <Route path="/laboratory" element={<Laboratory />} />
            <Route path="/manifesto" element={<Manifesto />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </Layout>
      <IntroOverlay />
    </MotionConfig>
  )
}
