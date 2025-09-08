import React from 'react'
import image from "../../assets/home3 (1).jpg"
import { Icon } from '@iconify/react';
import telebirr from "../../assets/telebirr.png"
import materials from "../../assets/materials.png"

const Donate = () => {
  return (
    <div className='mt-35'>
      <div className='relative z-20 w-full'>
        <img src={image} alt="" className='w-full h-50 object-cover'  />
        <div className="absolute flex items-center justify-center gap-3 top-0 right-0 left-0 bottom-0 bg-[#03045E]/70 shadow-lg shadow-[#0077B6]">
          <Icon className='text-6xl' icon="streamline-color:blood-donate-drop"/>
          <h3 className='relative z-10 text-3xl font-bold text-white'>Donate</h3>
        </div>
      </div>
      <div className='w-full relative noise-bg h-auto py-20 flex items-center justify-center px-10 sm:px-30 gap-15'>
        <div className='relative z-20 flex flex-col items-center justify-center gap-15 w-full sm:w-250 h-auto rounded-3xl bg-[#03045E]/70 border-3 border-[#0077B6] p-10 shadow-xl shadow-[#0077B6]'>
          <div className='flex flex-wrap items-center justify-center gap-15'>
            <div className='flex flex-col items-center justify-center gap-5'>
              <div className='flex items-center justify-center gap-3'>
                <Icon className='hover:cursor-pointer hover:scale-120 transition-all duration-500' icon="noto:bank" width="30" height="30" />
                <h3 className='text-3xl font-bold text-white'>Bank Accounts</h3>
              </div>
              <div className='flex flex-col gap-5 items-start justify-center'>
                <div className='felx flex-col items-start justify-center text-white text-lg'>
                  <p>Commercial Bank of Ethiopia: <span className='font-bold text-2xl text-[#90E0EF]'>1000440036604</span></p>
                  <p>Swift code: <span className='font-bold text-2xl text-[#90E0EF]'>CEBETAA</span></p>
                </div>
                <div className='felx flex-col items-start justify-center text-white text-lg'>
                  <p>Commercial Bank of Ethiopia: <span className='font-bold text-2xl text-[#90E0EF]'>1000440036604</span></p>
                  <p>Swift code: <span className='font-bold text-2xl text-[#90E0EF]'>NIBIETAA</span></p>
                </div>
                <div className='felx flex-col items-start justify-center text-white text-lg'>
                  <p>Commercial Bank of Ethiopia: <span className='font-bold text-2xl text-[#90E0EF]'>1000440036604</span></p>
                  <p>Swift code: <span className='font-bold text-2xl text-[#90E0EF]'>CEBETAA</span></p>
                </div>
              </div>
            </div>
            <div className='flex flex-col items-start justify-center gap-10'>
              <div className='flex items-center justify-center gap-3 rounded-full py-3 px-6 bg-[#0077B6]/60 border-2 border-[#90E0EF]'>
                <img src={telebirr} alt="" className='h-10 w-30 object-cover' />
                <p className='font-bold text-xl text-[#90E0EF]'>+251911803260</p>
              </div>
              <div className='flex flex-col items-center justify-center gap-2 rounded-3xl py-3 px-6 bg-[#0077B6]/60 border-2 border-[#90E0EF]'>
                <p className='text-xl text-white font-bold'>Contact to confirm donation</p>
                <p className='font-bold text-2xl text-[#90E0EF]'>+251911803260</p>
              </div>
            </div>
          </div>
          <div className='flex flex-wrap items-center justify-center gap-3 rounded-2xl text-center sm:rounded-full py-3 px-3 w-full sm:w-200 bg-[#0077B6]/60 border-2 border-[#90E0EF]'>
                <img src={materials} alt="" className=' object-cover' width={60} height={200} />
                <p className='font-semibold text-xl text-green-400'>Do you want to donate materials?  <span className='text-white'>Contact Here: </span><span className='text-[#90E0EF] text-2xl'>+251911803260</span></p>
              </div>
        </div>
        <div className='hidden sm:block absolute -bottom-50 -left-120 noise-bg size-200 rounded-full'/>
        <div className='hidden sm:block absolute -bottom-50 -right-120 noise-bg size-200 rounded-full'/>
      </div>
    </div>
  )
}

export default Donate