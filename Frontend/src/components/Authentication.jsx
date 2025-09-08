import React, { useState } from 'react'
import { FaX, FaLock, FaRegEye, FaRegEyeSlash, FaUser } from 'react-icons/fa6'
import { LuLoader, LuMail } from 'react-icons/lu'
import { useGlobalContext } from '../contexts/GlobalContext'
import toast from 'react-hot-toast'

const Authentication = () => {
  const {setIsAuthOpen, signUp, login, isSigningUp, isLoggining} = useGlobalContext();
  const [showPassword, setShowPassword] = useState(false)
  const [type, setType] = useState("Login")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  })

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!emailRegex.test(formData.email)) {
      return toast.error("Invalid email format!")
    }
    if(type === "Login"){
      login(formData)
    } else {
      signUp(formData)
    }
  }

  return (
    <div className='fixed z-500 top-0 right-0 left-0 bottom-0 bg-[hsl(239,50%,19%)]/80 flex items-center justify-center'>
      <form onSubmit={handleSubmit} className='relative flex flex-col gap-5 items-center justify-start p-10 h-auto w-130 bg-[#03045E] rounded-xl border-2 border-[#0077B6] shadow-lg shadow-[#0077B6] font-outfit transition-all duration-300'>
        <FaX onClick={() => setIsAuthOpen(false)} className='absolute top-5 right-5 text-xl text-green-400 hover:scale-105 hover:cursor-pointer duration-300 transition-all' />
        <h2 className='text-3xl font-bold text-[hsl(201,100%,43%)] font-piedra'>ENPA / <span className='text-green-400'>አምባ</span></h2>
        <div className={`${type === "Login" ? "hidden" : ""} flex items-center justify-start gap-2 text-lg text-[#90E0EF] bg-[hsl(239,45%,30%)] p-3 rounded-lg w-full`}>
          <FaUser />
          <input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value})} type="text" placeholder='Full Name' className='focus:outline-none rounded-lg placeholder:text-[#90E0EF]/80'/>
        </div>
        <div className='flex items-center justify-start gap-2 text-lg text-[#90E0EF] bg-[hsl(239,45%,30%)] p-3 rounded-lg w-full'>
          <LuMail />
          <input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value})} type="text" placeholder='Email' className='focus:outline-none rounded-lg placeholder:text-[#90E0EF]/80'/>
        </div>
        <div className='flex items-center justify-between gap-2 text-lg text-[#90E0EF] bg-[hsl(239,45%,30%)] p-3 rounded-lg w-full'>
          <div className='flex items-center justify-start gap-2'>
            <FaLock />
            <input value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value})} type={`${showPassword === true ? "text" : "password"}`} placeholder='Password' className='focus:outline-none rounded-lg placeholder:text-[#90E0EF]/80' />
          </div>
          <FaRegEye onClick={() => setShowPassword(true)} className={`${showPassword === true ? "hidden" : ""} hover:cursor-pointer`}/>
          <FaRegEyeSlash onClick={() => setShowPassword(false)} className={`${showPassword === true ? "" : "hidden"} hover:cursor-pointer`}/>
        </div>
        <div className={`${type === "Login" ? "hidden" : ""} flex items-center justify-start gap-2 text-lg text-[#90E0EF] bg-[hsl(239,45%,30%)] p-3 rounded-lg w-full`}>
          <LuMail />
          <input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value})} type="tel" placeholder='Phone no.' className='focus:outline-none rounded-lg placeholder:text-[#90E0EF]/80'/>
        </div>
        <button type='submit' className='mt-5 bg-green-400/80 w-full px-6 py-2 rounded-full font-bold text-xl shadow-md hover:shadow-green-400/70 border-2 border-transparent flex items-center justify-center hover:border-green-500 text-white hover:cursor-pointer transition-all duration-300'>{type === "Login" ? isLoggining ? <LuLoader className='animate-spin' /> : "Login" : isSigningUp ? <LuLoader className='animate-spin' /> :"Sign Up"}</button>
        <div className={`${type === "Sign Up" ? "hidden" : ""} mt-5 flex text-lg items-center justify-center text-[#90E0EF] gap-2`}>
          Do you want to be a new active volunteer?
          <span onClick={() => setType("Sign Up")} className='text-green-400 hover:cursor-pointer hover:underline'>Sign Up</span>
        </div>
        <div className={`${type === "Login" ? "hidden" : ""} mt-5 flex text-lg items-center justify-center text-[#90E0EF] gap-2`}>
          Are you already an active volunteer?
          <span onClick={() => setType("Login")} className='text-green-400 hover:cursor-pointer hover:underline'>Login</span>
        </div>
      </form>
    </div>
  )
}

export default Authentication