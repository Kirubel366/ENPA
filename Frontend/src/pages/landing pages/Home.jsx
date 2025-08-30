import React, { useState, useEffect } from 'react'
import home from "../../assets/home.jpeg"
import home2 from "../../assets/home2.jpeg"
import home3 from "../../assets/home3.jpg"
import { Icon } from '@iconify/react';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from 'react-router-dom';

const Home = () => {
  const images = [home3, home, home2];
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // start fade out
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % images.length);
        setFade(true); // fade in new image
      }, 300); // half second fade out
    }, 3000); // change every 2 seconds
    return () => clearInterval(interval);
  }, []);
  return (
    <div className='mt-35'>
       {/*Hero section*/}
       <div className='relative w-full shadow-b-2 shadow-lg shadow-[#0077B6]'>
              <img 
                src={images[current]}
                alt="" 
                className={`
                  w-full h-150 object-cover
                  transition-opacity duration-700
                  ${fade ? 'opacity-100' : 'opacity-0'}
                `}
              />
            <div className='absolute top-0 left-0 right-0 bottom-0 opacity-[95%] bg-gradient-to-r from-[#03045E] to-[#000180]/20'>
                <h1 className='font-piedra text-6xl ml-30 mt-30 text-white leading-17'>Together, We Build <br /> Brighter Futures</h1>
                <div className='relative'>
                  <p className='font-oregano text-white text-2xl mt-5 ml-30'>Empowering Kids Through learning and Care</p>
                  <Icon className='absolute -top-2 left-122' icon="twemoji:books" width="35" height="35" />
                </div> 
                <div className='flex items-center justify-start gap-5 ml-30 mt-7 text-white'>
                    <p className='font-outfit text-xl'>Your Help Makes a Difference</p>
                    <Link to="/donate"><button className='bg-[#0077B6] w-auto px-6 py-2 rounded-full font-bold text-lg shadow-md hover:shadow-[rgb(0,119,182)] border-2 border-transparent hover:border-[hsl(199,100%,27%)] hover:cursor-pointer transition-all duration-300'>Donate Now</button></Link>
                </div>
            </div>
       </div>
      {/*Home about section*/}
       <div className='flex items-start justify-center gap-40 w-full h-auto bg-gradient-to-br from-[#03045E] to-[#03045E]/70 px-30 py-20'>
        <div className='relative w-150 hover:scale-102 transition-all duration-300'>
          <img src={home} alt="" className='object-cover w-150 h-140 rounded-3xl border-2 border-[hsl(201,100%,70%)]' />
          <div className='absolute z-10 top-0 left-0 right-0 bottom-0 bg-[#03045E]/40 rounded-3xl shadow-lg shadow-[#0077B6]' />
        </div>
        <div className='flex flex-col items-center justify-center gap-10 text-white font-outfit text-xl'>
          <h2 className='font-bold text-4xl'>Who We Are</h2>
          <p className='w-120'>Education for Needy People Association (ENPA) is a local charity founded in 2008 and registered in 2010 to support disadvantaged communities. ENPA helps vulnerable children affected by poverty, HIV/AIDS, or loss of family, giving them access to education, safety, and hope.</p>
          <p className='w-120'>Based in Yeka Kifle Ketema, northeast of Addis Ababa, ENPA addresses the high cost of schooling and limited health services. We provide education, healthcare support, and help children with disabilities, while empowering single mothers through vocational training to improve their livelihoods.</p>
          <Link to="/about"><button className='bg-[#0077B6] w-50 px-6 py-2 rounded-full font-bold text-lg shadow-md hover:shadow-[rgb(0,119,182)] border-2 border-transparent hover:border-[hsl(199,100%,27%)] hover:cursor-pointer transition-all duration-300'>Discover More</button></Link>
        </div>
       </div>
      {/*Home gallery section*/}
       <div className='relative h-auto w-full noise-bg text-white px-30 flex flex-col items-center justify-center gap-10 py-20'>
          <h2 className='font-bold text-4xl'>Gallery</h2> 
          <h3 className='font-jacques-francois-shadow text-4xl'>Moments That Inspire</h3>
          <div className='flex items-center jutify-center gap-5'>
            <div className='size-15 bg-[#0077B6]/60 border-2 border-[#0077B6] flex items-center justify-center rounded-full hover:scale-110 hover:cursor-pointer transition-all duration-300'>
              <MdOutlineKeyboardArrowRight className='size-10 rotate-180' />
            </div>
            <img src={home} alt="" className='w-280 h-150 object-cover rounded-3xl border-2 border-[hsl(201,100%,70%)]' />
            <div className='size-15 bg-[#0077B6]/60 border-2 border-[#0077B6] flex items-center justify-center rounded-full hover:scale-110 hover:cursor-pointer transition-all duration-300'>
              <MdOutlineKeyboardArrowRight className='size-10' />
            </div>
          </div>
          <iframe src="https://www.youtube.com/embed/7ZdbGAEhDks" frameborder="0" className='relative z-20 w-280 h-150 rounded-3xl mt-10' />
          <Link to="/gallery"><button className='bg-[#0077B6] w-60 px-6 py-2 rounded-full font-bold text-lg shadow-md hover:shadow-[rgb(0,119,182)] border-2 border-transparent hover:border-[hsl(199,100%,27%)] hover:cursor-pointer transition-all duration-300'>Go to Gallery Page</button></Link>
          <div className='absolute -bottom-50 -left-120 noise-bg size-200 rounded-full'/>
          <div className='absolute -bottom-50 -right-120 noise-bg size-200 rounded-full'/>
       </div>
    </div>
  )
}

export default Home