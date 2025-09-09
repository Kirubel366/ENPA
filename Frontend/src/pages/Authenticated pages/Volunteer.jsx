import React, { useEffect, useRef, useState } from 'react'
import { FaPhone, FaUser, FaX } from 'react-icons/fa6';
import { LuLoader, LuMail, LuPhone, LuX } from 'react-icons/lu';
import { MdContactMail, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Icon } from '@iconify/react/dist/iconify.js';
import image from "../../assets/home3.jpg"
import { TbLogout2 } from "react-icons/tb";
import { HiHome } from "react-icons/hi2";
import Typed from 'typed.js';
import logo from "../../assets/logo.png";
import { IoMail } from 'react-icons/io5';
import { GrLocation } from 'react-icons/gr';
import { FaCalendarAlt } from 'react-icons/fa';
import { useGlobalContext } from '../../contexts/GlobalContext';


const Volunteer = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isEmailReadOnly, setIsEmailReadOnly] = useState(true)
  const [isPhoneNoReadOnly, setIsPhoneNoReadOnly] = useState(true)
  const [isNameReadOnly, setIsNameReadOnly] = useState(true)
  const [page, setPage] = useState("home")
  const typedRef = useRef(null);
  const {authUser, updateVolunteerAccount, isVolunteerUpdating, deleteVolunteerAccount, logout, events, getAllEvents, areEventsLoading, isSubmittingContactForm, sendContactMessage} = useGlobalContext();
  const [formData, setFormData] = useState({
    name: authUser.name,
    email: authUser.email,
    phone: authUser.phone,
  })
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const phoneInputRef = useRef();
  const [contactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    await sendContactMessage(formData)
    setContactFormData({
      name: "",
      email: "",
      message: "",
    })
  } 

  useEffect(() => {
    setIsButtonDisabled(
      formData.name === authUser.name &&
      formData.email === authUser.email &&
      formData.phone === authUser.phone
    )
  }, [formData, authUser])

  const handleUpdate = (e) => {
    e.preventDefault()
    if(!isButtonDisabled){
        if(formData.email === authUser.email){
          updateVolunteerAccount({ ...formData, email: ""})
        } else {
          updateVolunteerAccount(formData)
        }
        setIsNameReadOnly(true)
        setIsEmailReadOnly(true)
        setIsPhoneNoReadOnly(true)
    }
  }

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        'Education for Needy People Association',
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

  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    getAllEvents()
  }, [])
  

  return (
    <div className='flex flex-col items-center justify-start gap-15 sm:pl-60 pb-15 pt-55 sm:pt-40 font-outfit noise-bg-3 h-auto min-h-[100vh]'>
        <div className='px-10 sm:px-30 fixed z-100 top-0 h-30 right-0 left-0 bg-gradient-to-r from-[#03045E] to-130% to-green-400 border-b-2 border-[#90E0EF]'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center justify-start gap-7 -mt-1'>
              <img onClick={() => setPage("home")} src={logo} alt="Logo" className='size-33 relative hover:cursor-pointer hover:scale-105 duration-300 transition-all' />
              <h4 className='noise-bg text-3xl hidden md:block px-5 py-2 text-green-400 font-medium font-oregano rounded-lg overflow-hidden'>
                <span ref={typedRef} className="inline-block"></span>
              </h4>
            </div>
            <p onClick={() => setIsOpen(true)} className={`text-3xl font-bold text-shadow-lg text-shadow-[#003E5E] font-oregano hover:cursor-pointer duration-500 transition-all hover:text-[#003E5E] hover:text-shadow-[#81FEAB] flex items-center justify-center ${isOpen ? "text-[#003E5E] text-shadow-[#81FEAB]" : "text-white"}`}><p>Account Info.</p><MdOutlineKeyboardArrowRight className='-rotate-270 size-10' /></p>
          </div>
          
          <form onSubmit={handleUpdate} className={`${isOpen ? "" : "hidden"} absolute top-33 right-3 flex flex-col gap-5 items-center justify-start p-5 sm:p-10 h-auto w-100 sm:w-130 bg-gradient-to-br from-[hsl(201,100%,26%)] to-130% to-[#81FEAB] rounded-3xl border-3 border-blue-400/60`}>
            <FaX onClick={() => setIsOpen(false)} className='absolute top-3 right-3 text-xl text-green-400/80 hover:scale-105 bg-[hsl(200,100%,30%)] rounded-full p-2 flex items-center justify-center size-10 hover:cursor-pointer duration-300 transition-all' />
            <h2 className='text-3xl font-bold text-green-400 font-piedra'>Account Info.</h2>
            <div className='flex items-center justify-start gap-2 text-lg text-[#90E0EF] bg-[#003E5E] p-3 rounded-lg w-full'>
              <FaUser />
              <input ref={nameInputRef} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value})} type="text" placeholder='Full Name' className='focus:outline-none rounded-lg placeholder:text-[#90E0EF]/80' readOnly={isNameReadOnly}/>
              <button type='button' onClick={() => {setIsNameReadOnly(false), nameInputRef.current.focus()}} className={`${isNameReadOnly ? "" : "hidden"} ml-auto bg-blue-400/80 px-3 py-1 rounded-lg font-bold text-sm shadow-md hover:shadow-blue-400/70 border-2 border-transparent hover:border-blue-500 text-white hover:cursor-pointer transition-all duration-300`}>Edit</button>
            </div>
            <div className='flex items-center justify-start gap-2 text-lg text-[#90E0EF] bg-[#003E5E] p-3 rounded-lg w-full'>
              <LuMail />
              <input ref={emailInputRef} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value})} type="text" placeholder='Email' className='focus:outline-none rounded-lg placeholder:text-[#90E0EF]/80' readOnly={isEmailReadOnly}/>
              <button type='button' onClick={() => {setIsEmailReadOnly(!isEmailReadOnly), emailInputRef.current.focus()}} className={`${isEmailReadOnly ? "" : "hidden"} ml-auto bg-blue-400/80 px-3 py-1 rounded-lg font-bold text-sm shadow-md hover:shadow-blue-400/70 border-2 border-transparent hover:border-blue-500 text-white hover:cursor-pointer transition-all duration-300`}>Edit</button>
            </div>
            <div className='flex items-center justify-start gap-2 text-lg text-[#90E0EF] bg-[#003E5E] p-3 rounded-lg w-full'>
              <LuPhone />
              <input ref={phoneInputRef} value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value})} type="text" placeholder='Phone no.' className='focus:outline-none rounded-lg placeholder:text-[#90E0EF]/80' readOnly={isPhoneNoReadOnly}/>
              <button type='button' onClick={() => {setIsPhoneNoReadOnly(!isPhoneNoReadOnly), phoneInputRef.current.focus()}} className={`${isPhoneNoReadOnly ? "" : "hidden"} ml-auto bg-blue-400/80 px-3 py-1 rounded-lg font-bold text-sm shadow-md hover:shadow-blue-400/70 border-2 border-transparent hover:border-blue-500 text-white hover:cursor-pointer transition-all duration-300`}>Edit</button>
            </div>
            <button disabled={isButtonDisabled} type='submit' className={`${isButtonDisabled ? "opacity-50" : "opacity-100 hover:border-green-500 hover:shadow-green-400/70 hover:cursor-pointer"} flex items-center justify-center mt-5 bg-green-400/80 w-full px-6 py-2 rounded-full font-bold text-xl shadow-md border-2 border-transparent text-white  transition-all duration-300`}>{isVolunteerUpdating ? <LuLoader className='animate-spin' /> : "Update"}</button>
            <button type='button' onClick={deleteVolunteerAccount} className='mt-5 bg-red-400/80 w-full px-6 py-2 rounded-full font-bold text-xl shadow-md hover:shadow-red-400/70 border-2 border-transparent hover:border-red-500/60 text-white hover:cursor-pointer transition-all duration-300'>Stop Volunteering</button>
          </form>
        </div>
        <TbLogout2 onClick={() => setIsSideBarOpen(true)} className='absolute top-33 bg-[#0077B6]/60 border-l-3 border-[hsl(201,100%,40%)] text-white h-20 rounded-l-full left-0 rotate-180 text-5xl' />
        <div className={`${isSideBarOpen || !isMobile ? "flex" : "hidden" } fixed z-30 flex-col gap-1.5 items-start justify-start top-30 left-0 h-[100vh] w-70 bg-[#03045E] pt-10 px-6 border-r-2 border-[#90E0EF]`}>
            <LuX onClick={() => setIsSideBarOpen(false)} className={`${isMobile ? "" : "hidden"} text-[hsl(201,50%,80%)] text-3xl self-end -mt-6`} />
            <div onClick={() => {setPage("home"), setIsSideBarOpen(false)}} className={`flex items-center justify-center gap-2 text-xl text-white border-2 hover:border-[#90E0EF] hover:bg-[hsl(189,60%,35%)]/50 ${page === "home" ? "border-[#90E0EF] bg-[hsl(189,60%,35%)]/50" : "border-transparent"} rounded-full py-2 px-7 hover:cursor-pointer transition-all duration-300`}>
            <HiHome />
            Home
            </div>
            <div onClick={() => {setPage("events"), setIsSideBarOpen(false)}} className={`flex items-center justify-center gap-2 text-xl text-white border-2 hover:border-[#90E0EF] hover:bg-[hsl(189,60%,35%)]/50 ${page === "events" ? "border-[#90E0EF] bg-[hsl(189,60%,35%)]/50" : "border-transparent"} rounded-full py-2 px-7 hover:cursor-pointer transition-all duration-300`}>
            <FaCalendarAlt />
              Events
            </div>
            <div onClick={() => {setPage("contact-us"), setIsSideBarOpen(false)}} className={`flex items-center justify-center gap-2 text-xl text-white border-2 hover:border-[#90E0EF] hover:bg-[hsl(189,60%,35%)]/50 ${page === "contact-us" ? "border-[#90E0EF] bg-[hsl(189,60%,35%)]/50" : "border-transparent"} rounded-full py-2 px-7 hover:cursor-pointer transition-all duration-300`}>
              <MdContactMail />
              Contact Us
            </div>
            <div onClick={logout} className='flex items-center justify-center gap-2 text-xl text-white border-2 border-transparent hover:border-[#90E0EF] hover:bg-[hsl(189,60%,35%)]/50 rounded-full py-2 px-7 hover:cursor-pointer transition-all duration-300'>
            <TbLogout2 />
              Logout
            </div>
            <div className='absolute bottom-40 self-center text-3xl text-blue-300 font-bold font-oregano'>Help. Inspire. Repeat.</div>        
        </div>
        <div className='fixed z-50 bottom-0 right-0 p-3 bg-[hsl(200,60%,30%)] w-full sm:w-auto h-10 sm:rounded-lg flex items-center justify-center text-[#90E0EF]'>
          <Icon icon="ph:copyright-light" width="24" height="24" />
          <p>2025 ENPA. All rights reserved / Developed by KiruTech</p>
        </div>

        {/* Home Page */}    
        <div className={`${page !== "home" && "hidden"} flex flex-col gap-10 text-white text-xl items-center justify-start px-5 p-10 w-[90%] sm:w-150 lg:w-230 xl:w-260 h-auto rounded-3xl bg-[#0077B6]/50 border-3 border-[#90E0EF] shadow-xl shadow-blue-400/80 text-shadow-sm text-shadow-black`}>
          <span className='font-bold font-oregano text-4xl'>🌟 Welcome, {authUser.name}! 👋</span>

          <span className='text-[#90E0EF] text-center text-2xl text-shadow-xl text-shadow-black'>
            This is your personal volunteer hub, designed to keep you informed and engaged. From here, you can:
          </span>

          <span className='flex flex-col items-start justify-center gap-2'>
            <span className="flex items-start gap-2">
              <span>🗓</span>
              <span className="flex flex-nowrap gap-1 relative">
                <span className="text-blue-300 whitespace-nowrap">Explore Events</span>
                <span className="text-white">– Check the Events page to find opportunities where you can contribute and get involved.</span>
              </span>
            </span>

            <span className="flex items-start gap-2">
              <span>📞</span>
              <span className="flex flex-nowrap gap-1">
                <span className="text-blue-300 whitespace-nowrap">Access Contact Information</span>
                <span className="text-white">– Visit the Contact Us page to reach out anytime for support or guidance.</span>
              </span>
            </span>

            <span className="flex items-start gap-2">
              <span>✉️</span>
              <span className="flex flex-nowrap gap-1">
                <span className="text-blue-300 whitespace-nowrap">Stay Updated</span>
                <span className="text-white">– We’ll notify you by email whenever new events are announced, so you never miss a chance to participate.</span>
              </span>
            </span>

            <span className="flex items-start gap-2">
              <span>👤</span>
              <span className="flex flex-nowrap gap-1">
                <span className="text-blue-300 whitespace-nowrap">Manage Account</span>
                <span className="text-white">– Access your account information, update your details, or stop volunteering if you wish to pause your participation.</span>
              </span>
            </span>
          </span>

          <span className='text-center underline'>
            Thank you for joining our community of volunteers and helping us create meaningful change! 💙
          </span>
        </div>

        {/* Events Page */}
        <div className={`${page === "events" ? "" : "hidden"} w-full h-auto flex flex-col items-center justify-center gap-15`}>
          {areEventsLoading ? <LuLoader className='animate-spin self-center text-white text-3xl mt-10' /> : events.map((event) => (
            <div className='relative self-center z-20 rounded-4xl pt-20 lg:pt-10 py-10 h-auto w-[90%] px-5 sm:w-150 lg:w-250 flex flex-wrap items-start justify-center gap-10 border-3 border-[#90E0EF] bg-[#0077B6]/60 shadow-xl shadow-[#0077B6]'>
                <img src={event.image} alt="" className='object-cover h-100 w-100 border-3 border-[hsl(201,100%,50%)] rounded-3xl' />
                <div className='flex flex-col items-start justify-center gap-5'>
                  <div className='flex items-center justify-center gap-3 mt-5'>
                      <p className='text-xl text-white font-bold'>Name: </p>
                      <h3 className='flex items-center justif-center py-2 px-6 border-2 border-[#90E0EF] text-2xl font-bold text-[#90E0EF] rounded-full'>{event.name}</h3>
                  </div>
                  <div className='flex items-center text-center p-5 border-3 w-100 border-[#90E0EF] text-xl text-[#90E0EF] rounded-2xl'>
                      {event.description} 
                  </div>
                </div>
                <h3 className={`absolute top-5 right-10 text-4xl font-bold ${event.isCompleted ? "text-yellow-400/70 text-shadow-yellow-200" : "text-green-500 text-shadow-green-200"}  text-shadow-md`}>{event.isCompleted ? "Completed" : "New"}</h3>
            </div>
          ))}
          {(events.length < 1 && !areEventsLoading) && <p className='text-3xl mt-5 font-oregano text-white text-shadow-lg text-shadow-black'>We have no events!</p>}
        </div>

      {/* Contact Page */}
      <div className={`${page === "contact-us" ? "" : "hidden"} w-full relative h-auto flex flex-col items-center justify-center px-10 sm:px-30 sm:ml-10 gap-15`}>
        <div className='flex relative z-20 items-center justify-start gap-10 rounded-3xl border-3 p-10 border-[#0077B6] bg-[#03045E]/70 h-auto w-full sm:w-150 lg:w-200'>
          <div className='flex flex-col items-start justify-center gap-10 text-white w-full'>
            <div className='flex flex-col items-start justify-center gap-3 text-xl'>
              <div className='flex items-center justify-center gap-2 text-white font-bold'>
                <FaPhone className='text-[hsl(201,100%,66%)]' />
                <p>+251911803260</p>
              </div>
              <div className='flex items-center justify-center gap-2 text-white font-bold'>
                <IoMail className='text-[hsl(201,100%,66%)]' />
                <p>kirud87@gmail.com</p>
              </div>
              <div className='flex items-start justify-center gap-2 text-white font-bold'>
                <GrLocation className='text-3xl text-[hsl(201,100%,66%)]' />
                <p>Woreda 9, Kolfe Keranyo, Yeka, Addis Ababa</p>
              </div>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-5 bg-[#063684]/80 border-2 border-[#0077B6] rounded-2xl w-full h-auto p-5'>
                <h3 className='self-start text-xl font-bold'>Any message?</h3>
                <div className='flex flex-wrap sm:flex-nowrap items-center justify-center gap-5 w-full'>
                    <input value={contactFormData.name} onChange={(e) => setContactFormData({ ...contactFormData, name: e.target.value})} type="text" placeholder='Name...' className='focus:outline-none rounded-full py-2 px-5 border-2 border-[#0077B6] w-full' />
                    <input value={contactFormData.email} onChange={(e) => setContactFormData({ ...contactFormData, email: e.target.value})} type="text" placeholder='Email...' className='focus:outline-none rounded-full py-2 px-5 border-2 border-[#0077B6] w-full' />
                </div>
                <textarea value={contactFormData.message} onChange={(e) => setContactFormData({ ...contactFormData, message: e.target.value})} placeholder='Message...' className='focus:outline-none rounded-2xl py-2 px-5 border-2 border-[#0077B6] w-full' />
                <button type='submit' className='flex items-center justify-center bg-[#0077B6] w-40 px-6 py-1 rounded-full font-bold text-lg shadow-md hover:shadow-[rgb(0,119,182)] border-2 border-transparent hover:border-[hsl(199,100%,27%)] hover:cursor-pointer transition-all duration-300'>{isSubmittingContactForm ? <LuLoader className='animate-spin' /> : "Submit"}</button>
            </form>
          </div>
        </div>
        <div className='w-full sm:150 lg:w-250 relative z-20 h-auto border-3 border-[#1618C3] bg-[#0077B6]/50 rounded-3xl flex flex-col items-center justify-start px-5 p-10 gap-15'>
          <h3 className='text-3xl font-bold text-green-500 text-shadow-md text-shadow-green-200'>Directions To EMPA</h3>
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d229539.71652921962!2d38.750233!3d9.009271!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b87906f9364db%3A0x2c957bcbd4ef19ea!2sENPA%20AMBA!5e1!3m2!1sen!2set!4v1756559581072!5m2!1sen!2set" className='w-full lg:w-200 h-80 sm:h-120 rounded-3xl' />
        </div>
      </div>
    </div>
  )
}

export default Volunteer