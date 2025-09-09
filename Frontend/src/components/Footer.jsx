import React, { useState } from 'react'
import { Icon } from '@iconify/react';
import logo from "../assets/logo.png";
import { FaPhone } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { GrLocation } from 'react-icons/gr';
import { useGlobalContext } from '../contexts/GlobalContext';
import { LuLoader } from 'react-icons/lu';
import toast from 'react-hot-toast';

const Footer = () => {
  const {isSubmittingFooterMessage, sendFooterMessage} = useGlobalContext()
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  })
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!emailRegex.test(formData.email) && formData.email) {
      return toast.error("Invalid email format!")
    }
    await sendFooterMessage(formData)
    setFormData({
      email: "",
      message: "",
    })
  }
  return (
    <div className='w-full h-auto pb-10 bg-[#023E8A] px-10 md:px-30 text-white font-outfit '>
      <div className='flex flex-col items-center jusify-center mb-15'>
        <img src={logo} alt="" className='size-40 z-20 relative' />
        <p className='font-medium text-xl text-white'>Join Us in Making a Change!!!</p>
      </div>
      <div className='flex flex-wrap items-start text-center justify-center md:justify-between gap-20'>
        <div className='flex flex-col items-center sm:items-start justify-center gap-5'>
          <h3 className='font-semibold text-2xl'>Any Comments?</h3>
          <form onSubmit={handleSubmit} className='flex flex-col items-center sm:items-start justify-center gap-3'>
            <input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value})} type="text" placeholder='Email' className='rounded-2xl py-2 px-4 focus:outline-none w-80 [#0077B6]/60 border-2 border-[#0077B6]' />
            <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value})} type="text" placeholder='Leave your comment...' className='rounded-2xl py-2 px-4 focus:outline-none w-80 [#0077B6]/60 border-2 border-[#0077B6]' />
            <button type='submit' className='flex items-center justify-center bg-[#0077B6] w-40 px-6 py-1 rounded-full font-bold text-lg shadow-md hover:shadow-[rgb(0,119,182)] border-2 border-transparent hover:border-[hsl(199,100%,27%)] hover:cursor-pointer transition-all duration-300'>{isSubmittingFooterMessage ? <LuLoader className='animate-spin' /> : "Submit"}</button>
          </form>
        </div>
        <div className='flex flex-col items-center justify-center gap-5'>
          <h3 className='font-semibold text-2xl'>Quick Links</h3>
          <div className='flex flex-col items-center justify-center gap-1'>
            <Link to="/" className='text-lg text-[#90E0EF] hover:text-green-400 hover:cursor-pointer hover:translate-x-2 transition-all duration-500'>Home</Link>
            <Link to="/about" className='text-lg text-[#90E0EF] hover:text-green-400 hover:cursor-pointer hover:translate-x-2 transition-all duration-500'>About Us</Link>
            <Link to="/gallery" className='text-lg text-[#90E0EF] hover:text-green-400 hover:cursor-pointer hover:translate-x-2 transition-all duration-500'>Gallery</Link>
            <Link to="/events" className='text-lg text-[#90E0EF] hover:text-green-400 hover:cursor-pointerointer hover:translate-x-2 transition-all duration-500'>Events</Link>
            <Link to="/contact" className='text-lg text-[#90E0EF] hover:text-green-400 hover:cursor-pointer hover:translate-x-2 transition-all duration-500'>Contact Us</Link>
            <Link to="/donate" className='text-lg text-[#90E0EF] hover:text-green-400 hover:cursor-pointer hover:translate-x-2 transition-all duration-500'>Donate</Link>
          </div>
        </div>
        <div className='flex flex-col items-center justify-center gap-5'>
          <h3 className='font-semibold text-2xl'>Contact Us</h3>
          <div className='flex flex-col items-center justify-center gap-1'>
            <div className='flex text-xl items-center justify-center gap-2 text-[#90E0EF] font-bold'>
              <FaPhone />
              <p>+251911803260</p>
            </div>
            <div className='flex text-xl items-center justify-center gap-2 text-[#90E0EF] font-bold'>
              <IoMail />
              <p>kirud87@gmail.com</p>
            </div>
            <div className='flex text-xl items-start justify-center text-[#90E0EF] font-bold'>
              <GrLocation className='text-3xl' />
              <p className='w-60 text-center'>Woreda 9, Kolfe Keranyo, Yeka, Addis Ababa</p>
            </div>         
          </div>
        </div>
        <div className='flex flex-col items-center justify-center gap-5'>
          <h3 className='font-semibold text-2xl'>Social Media</h3>
          <div className='flex items-center justify-center gap-3'>
            <Icon
              className='hover:cursor-pointer hover:scale-120 transition-all duration-500'
              icon="logos:youtube-icon"
              width="27"
              height="27"
              onClick={() => window.open('https://www.youtube.com/@kalebenpa', '_blank')}
            />

            <Icon
              className='hover:cursor-pointer hover:scale-120 transition-all duration-500'
              icon="logos:tiktok-icon"
              width="23"
              height="23"
              onClick={() => window.open('https://www.tiktok.com/@enpa_amba', '_blank')}
            />

            <Icon
              className='hover:cursor-pointer hover:scale-120 transition-all duration-500'
              icon="skill-icons:instagram"
              width="23"
              height="23"
              onClick={() => window.open('https://www.instagram.com/enpa_amba/', '_blank')}
            />

            <Icon
              className='hover:cursor-pointer hover:scale-120 transition-all duration-500'
              icon="logos:facebook"
              width="23"
              height="23"
              onClick={() => window.open('https://www.facebook.com/people/Enpa-Amba/100009394607453/', '_blank')}
            />
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center gap-8 mt-20'>
        <hr className='w-full'/>
        <div className='flex items-center justify-center gap-1 text-[#90E0EF]'>
          <Icon icon="ph:copyright-light" width="24" height="24" />
          <p>2025 ENPA. All rights reserved / Developed by KiruTech</p>
        </div>
      </div>
    </div>
  )
}

export default Footer