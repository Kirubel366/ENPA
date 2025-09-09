import React, { useState } from 'react'
import image from "../../assets/home3 (1).jpg"
import { FaPhone } from 'react-icons/fa6'
import { IoMail } from 'react-icons/io5'
import { GrLocation } from "react-icons/gr";
import { useGlobalContext } from '../../contexts/GlobalContext';
import { LuLoader } from 'react-icons/lu';
import toast from 'react-hot-toast';

const Contact = () => {
  
  const {isSubmittingContactForm, sendContactForm} = useGlobalContext()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!emailRegex.test(formData.email) && formData.email) {
      return toast.error("Invalid email format!")
    }
    await sendContactForm(formData)
    setFormData({
      name: "",
      email: "",
      message: "",
    })
  } 
  return (
    <div className='mt-35'>
      <div className='relative w-full'>
        <img src={image} alt="" className='w-full h-50 object-cover'  />
        <div className="absolute z-10 flex items-center justify-center top-0 right-0 left-0 bottom-0 bg-[#03045E]/70 shadow-lg shadow-[#0077B6]">
          <h3 className='relative z-10 text-3xl font-bold text-white'>Contact Us</h3>
        </div>
      </div>
      <div className='w-full relative noise-bg h-auto py-20 flex flex-wrap items-start justify-center px-10 sm:px-30 gap-15'>
        <div className='flex relative z-20 items-center justify-start gap-10 rounded-3xl border-3 p-10 border-[#0077B6] bg-[#03045E]/70 h-auto w-150'>
          <div className='flex flex-col items-start justify-center gap-10 text-white w-full'>
            <div className='flex flex-col items-start justify-center gap-3 text-xl'>
              <div className='flex items-center justify-center gap-2 text-white font-bold'>
                <FaPhone className='text-[hsl(201,100%,66%)]' />
                <p>+251991129478</p>
              </div>
              <div className='flex items-center justify-center gap-2 text-white font-bold'>
                <IoMail className='text-[hsl(201,100%,66%)]' />
                <p>kaleb.enpa@gmail.com</p>
              </div>
              <div className='flex items-start justify-center gap-2 text-white font-bold'>
                <GrLocation className='text-3xl text-[hsl(201,100%,66%)]' />
                <p>Woreda 9, Kolfe Keranyo, Yeka, Addis Ababa</p>
              </div>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-5 bg-[#063684]/80 border-2 border-[#0077B6] rounded-2xl w-full h-auto p-5'>
                <h3 className='self-start text-xl font-bold'>Any message?</h3>
                <div className='flex flex-wrap sm:flex-nowrap items-center justify-center gap-5 w-full'>
                    <input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value})} type="text" placeholder='Name...' className='focus:outline-none rounded-full py-2 px-5 border-2 border-[#0077B6] w-full' />
                    <input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value})} type="text" placeholder='Email...' className='focus:outline-none rounded-full py-2 px-5 border-2 border-[#0077B6] w-full' />
                </div>
                <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value})} placeholder='Message...' className='focus:outline-none rounded-2xl py-2 px-5 border-2 border-[#0077B6] w-full' />
                <button type='submit' className='flex items-center justify-center bg-[#0077B6] w-40 px-6 py-1 rounded-full font-bold text-lg shadow-md hover:shadow-[rgb(0,119,182)] border-2 border-transparent hover:border-[hsl(199,100%,27%)] hover:cursor-pointer transition-all duration-300'>{isSubmittingContactForm ? <LuLoader className='animate-spin' /> : "Submit"}</button>
            </form>
          </div>
        </div>
        <div className='w-full sm:w-200 relative z-20 h-131 border-3 border-[#1618C3] bg-[#0077B6]/50 rounded-3xl flex flex-col items-center justify-start p-10 gap-15'>
          <h3 className='text-3xl font-bold text-green-500 text-shadow-md text-shadow-green-200'>Directions To EMPA</h3>
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d229539.71652921962!2d38.750233!3d9.009271!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b87906f9364db%3A0x2c957bcbd4ef19ea!2sENPA%20AMBA!5e1!3m2!1sen!2set!4v1756559581072!5m2!1sen!2set" className='w-full sm:w-130 h-100 rounded-3xl' />
        </div>
        <div className='hidden sm:block absolute -bottom-50 -left-120 noise-bg size-200 rounded-full'/>
        <div className='hidden sm:block absolute -bottom-50 -right-120 noise-bg size-200 rounded-full'/>
      </div>
    </div>
  )
}

export default Contact