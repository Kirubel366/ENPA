import React, { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';
import logo from "../assets/logo.png";
import { FaPhone } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { Icon } from '@iconify/react';
import { useLocation, Link } from 'react-router-dom';

const Navbar = () => {
  const typedRef = useRef(null);
  const location = useLocation();
  const currentPath = location.pathname;
  const [hideInfoNav, setHideInfoNav] = useState(false);

  const isActive = (path) => currentPath === path;

  // typed.js effect
  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        'Education for Needy People Association / አምባ',
        'Empowering Needy Students',
        'Providing Quality Education'
      ],
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
        w-full h-10 bg-[#0077B6] flex items-center justify-between px-30
        transform transition-all duration-500 ease-in-out
        ${hideInfoNav ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"}
      `}>
        <div className='flex items-center justify-center gap-5'>
          <div className='flex items-center justify-center gap-2 text-white font-bold'>
            <FaPhone />
            <p>+251911803260</p>
          </div>
          <div className='w-[2.5px] h-7 bg-white rounded-sm' />
          <div className='flex items-center justify-center gap-2 text-white font-bold'>
            <IoMail />
            <p>kirud87@gmail.com</p>
          </div>
        </div>
        <div className='flex items-center justify-center gap-3'>
          <Icon className='hover:cursor-pointer hover:scale-120 transition-all duration-500' icon="logos:tiktok-icon" width="18" height="18" />
          <Icon className='hover:cursor-pointer hover:scale-120 transition-all duration-500' icon="skill-icons:instagram" width="18" height="18" />
          <Icon className='hover:cursor-pointer hover:scale-120 transition-all duration-500' icon="logos:facebook" width="18" height="18" />
          <Icon className='hover:cursor-pointer hover:scale-120 transition-all duration-500' icon="logos:youtube-icon" width="22" height="22" />
        </div>   
      </div>

      {/* Main Navbar */}
      <div className={`
        flex items-center justify-between w-full h-25 bg-[#023E8A] opacity-[85%] px-30
        transition-all duration-500 ease-in-out shadow-lg shadow-[#0077B6]
        ${hideInfoNav ? "-mt-10" : "mt-0"}
      `}>
        <div className='flex items-center justify-start gap-7'>
          <img src={logo} alt="Logo" className='size-33 relative' />
          <h4 className='noise-bg text-3xl px-5 py-2 text-green-400 font-medium font-oregano rounded-lg overflow-hidden'>
            <span ref={typedRef} className="inline-block"></span>
          </h4>
        </div>

        <div className='flex items-center justify-center gap-10'>
          <div className='flex items-center justify-center text-white font-semibold gap-7 font-outfit text-lg'>
            <Link to="/" className={`hover:text-green-400 transition-all duration-500 ${isActive("/") ? "text-green-400" : ""}`}>Home</Link>
            <Link to="/about" className={`hover:text-green-400 transition-all duration-500 ${isActive("/about") ? "text-green-400" : ""}`}>About Us</Link>
            <Link to="/gallery" className={`hover:text-green-400 transition-all duration-500 ${isActive("/gallery") ? "text-green-400" : ""}`}>Gallery</Link>
            <Link to="/events" className={`hover:text-green-400 transition-all duration-500 ${isActive("/events") ? "text-green-400" : ""}`}>Events</Link>
            <Link to="/contact" className={`hover:text-green-400 transition-all duration-500 ${isActive("/contact") ? "text-green-400" : ""}`}>Contact Us</Link>
          </div>
          <button className='bg-[#08085D]/30 border-2 hover:bg-[#08085D]/60 transition-all duration-500 border-[#0077B6] w-30 px-4 py-2 rounded-full font-bold text-lg text-white'>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
