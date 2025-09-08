import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/landing pages/Home'
import Footer from './components/Footer'
import { Routes, Route, useLocation } from "react-router-dom"
import About from './pages/landing pages/About'
import Gallery from './pages/landing pages/Gallery'
import Events from './pages/landing pages/Events'
import Contact from './pages/landing pages/Contact'
import Donate from './pages/landing pages/Donate'
import Authentication from './components/Authentication'
import { useGlobalContext } from './contexts/GlobalContext'
import Admin from './pages/Authenticated pages/Admin'
import Volunteer from './pages/Authenticated pages/Volunteer'
import { Toaster } from 'react-hot-toast'
import logo from "./assets/logo.png";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  const { isAuthOpen, isAuthChecking, authUser } = useGlobalContext();

  if (isAuthChecking) {
    return (
      <div className='absolute noise-bg-3 font-oregano text-white font-bold text-4xl flex gap-2 items-center justify-center w-full h-[100vh] z-300'>
        <img src={logo} alt="Logo" className='size-33 relative' />
        Loading...
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      {!authUser ? <Navbar className="relative z-10" /> : null}
      {!authUser ? <div className="absolute top-0 right-0 left-0 h-35 opacity-[95%] bg-gradient-to-r from-[#03045E] to-[#000180]/20" /> : null}
      {isAuthOpen === true ? <Authentication /> : null}  

      <ScrollToTop />

      <Routes>
        <Route path="/" element={!authUser ? <Home /> : authUser.role === "admin" ? <Admin /> : <Volunteer />}/>
        <Route path="/about" element={!authUser ? <About /> : authUser.role === "admin" ? <Admin /> : <Volunteer />}/>
        <Route path="/gallery" element={!authUser ? <Gallery /> : authUser.role === "admin" ? <Admin /> : <Volunteer />}/>
        <Route path="/events" element={!authUser ? <Events /> : authUser.role === "admin" ? <Admin /> : <Volunteer />}/>
        <Route path="/contact" element={!authUser ? <Contact /> : authUser.role === "admin" ? <Admin /> : <Volunteer />}/>
        <Route path="/donate" element={!authUser ? <Donate /> : authUser.role === "admin" ? <Admin /> : <Volunteer />}/>
      </Routes>

      {!authUser ? <Footer />  : null}
      <Toaster />
    </div>
  );
}

export default App;
