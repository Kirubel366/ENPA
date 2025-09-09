import React, { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';
import logo from "../assets/logo.png";
import { FaPhone } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { Icon } from '@iconify/react';
import { useLocation, Link } from 'react-router-dom';
import { useGlobalContext } from '../contexts/GlobalContext';
import { LuMenu, LuX } from "react-icons/lu"

const Navbar = () => {
  const {setIsAuthOpen} = useGlobalContext();
  const typedRef = useRef(null);
  const location = useLocation();
  const currentPath = location.pathname;
  const [hideInfoNav, setHideInfoNav] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const isActive = (path) => currentPath === path;

  // typed.js effect
  useEffect(() => { 
    const typed = new Typed(typedRef.current, 
      { strings: [ 'Education for Needy People Association / አምባ', 
                   'Empowering Needy Students', 
                   'Providing Quality Education' ], 
        typeSpeed: 60, 
        backSpeed: 40, 
        backDelay: 1500, 
        loop: true 
      }); 
        
      return () => typed.destroy();
  }, []);
  

  // hide top info nav after scrolling down its height
  useEffect(() => {
    const handleScroll = () => {
      setHideInfoNav(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Top Info Bar */}
      <div className={`
        w-full h-10 bg-[#0077B6] flex items-center justify-between px-2 md:px-30
        transform transition-all duration-500 ease-in-out
        ${hideInfoNav ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"}
      `}>
        <div className='flex items-center justify-center gap-2 sm:gap-5'>
          <div className='flex items-center justify-center gap-1 sm:gap-2 text-white font-bold'>
            <FaPhone />
            <p>+251991129478</p>
          </div>
          <div className='w-[2.5px] h-7 bg-white rounded-sm' />
          <div className='flex items-center justify-center gap-1 sm:gap-2 text-white font-bold'>
            <IoMail />
            <p>kaleb.enpa@gmail.com</p>
          </div>
        </div>
        <div className='flex items-center justify-center sm:gap-3'>
          <Icon
            className="hover:cursor-pointer hover:scale-120 transition-all duration-500 scale-80 sm:scale-100"
            icon="logos:youtube-icon"
            width="22"
            height="22"
            onClick={() => window.open('https://www.youtube.com/@kalebenpa', '_blank')}
          />

          <Icon
            className="hover:cursor-pointer hover:scale-120 transition-all duration-500 scale-80 sm:scale-100"
            icon="logos:tiktok-icon"
            width="18"
            height="18"
            onClick={() => window.open('https://www.tiktok.com/@enpa_amba', '_blank')}
          />

          <Icon
            className="hover:cursor-pointer hover:scale-120 transition-all duration-500 scale-80 sm:scale-100"
            icon="skill-icons:instagram"
            width="18"
            height="18"
            onClick={() => window.open('https://www.instagram.com/enpa_amba/', '_blank')}
          />

          <Icon
            className="hover:cursor-pointer hover:scale-120 transition-all duration-500 scale-80 sm:scale-100"
            icon="logos:facebook"
            width="18"
            height="18"
            onClick={() => window.open('https://www.facebook.com/people/Enpa-Amba/100009394607453/', '_blank')}
          />
        </div>   
      </div>

      {/* Main Navbar */}
      <div className={`
        relative flex items-center justify-between w-full h-25 bg-[#023E8A]/90 px-10 md:px-30
        transition-all duration-500 ease-in-out shadow-lg shadow-[#0077B6]
        ${hideInfoNav ? "-mt-10" : "mt-0"}
      `}>
        <div className='flex items-center justify-start gap-7'>
        <Link to="/"><img src={logo} alt="Logo" className='size-33 relative hover:cursor-pointer hover:scale-105 transition-all duration-300' /></Link>
          <h4 className='hidden sm:block noise-bg text-3xl px-5 py-2 text-green-400 font-medium font-oregano rounded-lg overflow-hidden'> 
            <span ref={typedRef} className="inline-block"></span> 
          </h4>
        </div>

        <div className='hidden xl:flex items-center justify-center gap-10'>
          <div className='flex items-center justify-center text-white font-semibold gap-7 font-outfit text-lg'>
            <Link to="/" className={`hover:text-green-400 text-xl transition-all duration-500 ${isActive("/") ? "text-green-400" : ""}`}>Home</Link>
            <Link to="/about" className={`hover:text-green-400 text-xl transition-all duration-500 ${isActive("/about") ? "text-green-400" : ""}`}>About Us</Link>
            <Link to="/gallery" className={`hover:text-green-400 text-xl transition-all duration-500 ${isActive("/gallery") ? "text-green-400" : ""}`}>Gallery</Link>
            <Link to="/events" className={`hover:text-green-400 text-xl transition-all duration-500 ${isActive("/events") ? "text-green-400" : ""}`}>Events</Link>
            <Link to="/contact" className={`hover:text-green-400 text-xl transition-all duration-500 ${isActive("/contact") ? "text-green-400" : ""}`}>Contact Us</Link>
            <Link to="/donate" className={`hover:text-green-400 text-xl transition-all duration-500 ${isActive("/donate") ? "text-green-400" : ""}`}>Donate</Link>
          </div>
          <button onClick={() => setIsAuthOpen(true)} className='bg-[#08085D]/30 border-2 hover:cursor-pointer hover:bg-[#08085D]/60 transition-all duration-500 border-[#0077B6] w-30 px-4 py-2 rounded-full font-bold text-lg text-white'>Login</button>
        </div>
        <LuMenu onClick={() => setIsNavOpen(true)} className={`${isNavOpen ? "hidden" : ""} xl:hidden text-3xl text-white`} />
        <LuX onClick={() => setIsNavOpen(false)} className={`${isNavOpen ? "" : "hidden"} xl:hidden text-3xl text-white`} />
        <div className={`${isNavOpen ? "" : "hidden"} text-xl absolute top-17 right-0 flex flex-col items-start justify-center gap-10 p-10 rounded-l-2xl bg-[#023E8A] w-70`}>
          <div className='flex flex-col items-start justify-center text-white font-semibold gap-7 font-outfit'>
            <Link to="/" onClick={() => setIsNavOpen(false)} className={`hover:text-green-400 transition-all duration-500 ${isActive("/") ? "text-green-400" : ""}`}>Home</Link>
            <hr className={`w-full -mt-2 ${isActive("/") ? "" : "hidden"} transition-opacity duration-500`} />
            <Link onClick={() => setIsNavOpen(false)} to="/about" className={`hover:text-green-400 transition-all duration-500 ${isActive("/about") ? "text-green-400" : ""}`}>About Us</Link>
            <hr className={`w-full -mt-2 ${isActive("/about") ? "" : "hidden"}`} />
            <Link onClick={() => setIsNavOpen(false)} to="/gallery" className={`hover:text-green-400 transition-all duration-500 ${isActive("/gallery") ? "text-green-400" : ""}`}>Gallery</Link>
            <hr className={`w-full -mt-2 ${isActive("/gallery") ? "" : "hidden"}`} />
            <Link onClick={() => setIsNavOpen(false)} to="/events" className={`hover:text-green-400 transition-all duration-500 ${isActive("/events") ? "text-green-400" : ""}`}>Events</Link>
            <hr className={`w-full -mt-2 ${isActive("/events") ? "" : "hidden"}`} />
            <Link onClick={() => setIsNavOpen(false)} to="/contact" className={`hover:text-green-400 transition-all duration-500 ${isActive("/contact") ? "text-green-400" : ""}`}>Contact Us</Link>
            <hr className={`w-full -mt-2 ${isActive("/contact") ? "" : "hidden"}`} />
            <Link onClick={() => setIsNavOpen(false)} to="/donate" className={`hover:text-green-400 transition-all duration-500 ${isActive("/donate") ? "text-green-400" : ""}`}>Donate</Link>
            <hr className={`w-full -mt-2 ${isActive("/donate") ? "" : "hidden"}`} />
          </div>
          <button onClick={() => setIsAuthOpen(true)} className='bg-[#08085D]/30 border-2 hover:cursor-pointer hover:bg-[#08085D]/60 transition-all duration-500 border-[#0077B6] w-30 px-4 py-2 rounded-full font-bold text-white'>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
