import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/landing pages/Home'
import Footer from './components/Footer'
import { Routes, Route } from "react-router-dom"
import About from './pages/landing pages/About'
import Gallery from './pages/landing pages/Gallery'
import Events from './pages/landing pages/Events'
import Contact from './pages/landing pages/Contact'
import Donate from './pages/landing pages/Donate'

const App = () => {
  return (
  <div className="overflow-hidden">
     <Navbar className="relative z-10" />
     <div className="absolute top-0 right-0 left-0 h-35 opacity-[95%] bg-gradient-to-r from-[#03045E] to-[#000180]/20" />
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/about" element={<About />}/>
      <Route path="/gallery" element={<Gallery />}/>
      <Route path="/events" element={<Events />}/>
      <Route path="/contact" element={<Contact />}/>
      <Route path="/donate" element={<Donate />}/>
    </Routes>
    <Footer />  
  </div>
  )
}

export default App