import React, { useState, useEffect } from 'react'
import home from "../../assets/home.jpeg"
import home2 from "../../assets/home2.jpeg"
import home3 from "../../assets/home3.jpg"
import home4 from "../../assets/home4.jpg"
import graduation2 from "../../assets/graduation2.webp"
import graduation from "../../assets/enpa graduation.jpg"
import { Icon } from '@iconify/react';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../contexts/GlobalContext'

const Home = () => {
  const [heroImages, setHeroImages] = useState([]);
  const [current, setCurrent] = useState(0);
  const desktopImages = [home3, home, home2];
  const phoneImages = [home3, graduation2, home4];
  const [isLarge, setIsLarge] = useState(window.innerWidth < 640);
  const {images, getAllImages} = useGlobalContext()

  useEffect(() => {
    const handleResize = () => setIsLarge(window.innerWidth < 1240);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const updateImages = () => {
      if (window.innerWidth < 640) {
        setHeroImages(phoneImages); // below sm
      } else {
        setHeroImages(desktopImages); // sm and above
      }
    };
  
    updateImages(); // initial check
    window.addEventListener("resize", updateImages);
  
    return () => window.removeEventListener("resize", updateImages);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % heroImages.length);
      }, 300); // half second fade out
    }, 3000); // change every 2 seconds
    return () => clearInterval(interval);
  }, [heroImages]);

  useEffect(() => {
    getAllImages()
  }, [])

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;
  
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 2500);
  
    return () => clearInterval(interval);
  }, [images]);

  const prevImage = () => {
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    setCurrentIndex(prev => (prev + 1) % images.length);
  };

  return (
    <div className='mt-35'>
       {/*Hero section*/}
       <div className='relative w-full shadow-b-2 shadow-lg shadow-[#0077B6]'>
        <div className="relative w-full h-130 sm:h-150">
          {heroImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt=""
              className={`
                absolute inset-0 w-full h-full object-cover
                transition-opacity duration-700
                ${index === current ? "opacity-100" : "opacity-0"}
              `}
            />
          ))}
        </div>

        <div className='absolute top-0 left-0 right-0 bottom-0 opacity-[95%] bg-[#03045E]/70 sm:bg-transparent sm:bg-gradient-to-r sm:from-[#03045E] sm:to-[#000180]/20'>
            <h2 className='text-center font-oregano text-[17px] animate-pulse text-green-400 mt-10 mb-10 font-bold sm:hidden block'>Education for Needy People Association / አምባ</h2>
            <h1 className='font-piedra text-6xl text-center sm:text-start sm:ml-30  text-white sm:mt-30 leading-17'>Together, We Build <br /> Brighter Futures</h1>
            <div className='relative'>
              <p className='font-oregano text-white text-2xl mt-5 text-center sm:text-start sm:ml-30 text-shadow-lg sm:text-shadow-none text-shadow-black'>Empowering Kids Through learning and Care</p>
              <Icon className='absolute hidden sm:block -top-2 left-122' icon="twemoji:books" width="35" height="35" />
            </div>
            <div className='grid grid-cols-1 sm:flex items-center justify-start gap-5 text-center sm:text-start sm:ml-30 mt-3 sm:mt-7 text-white'>
                <p className='font-outfit text-xl text-shadow-lg sm:text-shadow-none text-shadow-black hidden sm:block'>Your Help Makes a Difference</p>
                <Link to="/donate"><button className='bg-[#0077B6] w-auto px-6 py-2 rounded-full font-bold text-lg shadow-md hover:shadow-[rgb(0,119,182)] border-2 border-transparent hover:border-[hsl(199,100%,27%)] hover:cursor-pointer transition-all duration-300'>Donate Now</button></Link>
            </div>
        </div>
        <div className='hidden sm:flex absolute bottom-5 right-5 bg-green-400/90 w-auto px-3 text-center animate-pulse h-10 rounded-lg items-center justify-center text-white text-lg font-bold'>
        🔔 “Want to make a difference? Become an Active Volunteer — {isLarge ? "sign up from the Login button above in the menu" : "sign up from the Login button above!"}”
        </div>
       </div>
      {/*Home about section*/}
       <div className='flex flex-wrap-reverse sm:flex-nowrap items-start justify-center gap-20 md:gap-40 w-full h-auto bg-gradient-to-br from-[#03045E] to-[#03045E]/70 px-10 py-20'>
        <div className='relative w-150 hover:scale-102 transition-all duration-300'>
          <img src={graduation} alt="" className='object-cover sm:w-150 h-140 rounded-3xl border-2 border-[hsl(201,100%,70%)]' />
          <div className='absolute z-10 top-0 left-0 right-0 bottom-0 bg-[#03045E]/40 rounded-3xl shadow-lg shadow-[#0077B6]' />
        </div>
        <div className='flex flex-col items-center justify-center gap-10 text-white font-outfit text-xl'>
          <h2 className='font-bold text-4xl'>Who We Are</h2>
          <p className='w-100 sm:w-120'>Education for Needy People Association (ENPA) is a local charity founded in 2008 and registered in 2010 to support disadvantaged communities. ENPA helps vulnerable children affected by poverty, HIV/AIDS, or loss of family, giving them access to education, safety, and hope.</p>
          <p className='w-100 sm:w-120'>Based in Yeka Kifle Ketema, northeast of Addis Ababa, ENPA addresses the high cost of schooling and limited health services. We provide education, healthcare support, and help children with disabilities, while empowering single mothers through vocational training to improve their livelihoods.</p>
          <Link to="/about"><button className='bg-[#0077B6] w-50 px-6 py-2 rounded-full font-bold text-lg shadow-md hover:shadow-[rgb(0,119,182)] border-2 border-transparent hover:border-[hsl(199,100%,27%)] hover:cursor-pointer transition-all duration-300'>Discover More</button></Link>
        </div>
        <div className='flex sm:hidden bg-green-400/40 w-full animate-pulse h-auto text-center p-3 rounded-lg items-center justify-center text-white text-lg font-bold'>
            🔔 “Want to make a difference? Become an Active Volunteer — sign up from the Login button above in the menu!”
        </div>
       </div>
      {/*Home gallery section*/}
       <div className='relative h-auto w-full noise-bg text-white px-1 sm:px-30 flex flex-col items-center justify-center gap-10 py-20'>
          <h2 className='font-bold text-4xl'>Gallery</h2> 
          <h3 className='font-jacques-francois-shadow text-4xl text-center'>Moments That Inspire</h3>
          <div className='relative z-20 flex items-center justify-center gap-1 lg:gap-5 w-full'>
            {/* Left Arrow */}
            <div
              className='size-10 sm:size-15 bg-[#0077B6]/60 border-2 border-[#0077B6] flex items-center justify-center rounded-full hover:scale-110 hover:cursor-pointer transition-all duration-300'
              onClick={prevImage}
            >
              <MdOutlineKeyboardArrowRight className='size-10 rotate-180' />
            </div>

            {/* Image */}
            <img
              src={images[currentIndex]?.image}
              alt=""
              className='w-full h-70 sm:w-180 lg:w-280 sm:h-150 object-cover rounded-3xl border-2 border-[hsl(201,100%,70%)] transition-opacity duration-700 ease-in-out opacity-100'
            />

            {/* Right Arrow */}
            <div
              className='size-10 sm:size-15 bg-[#0077B6]/60 border-2 border-[#0077B6] flex items-center justify-center rounded-full hover:scale-110 hover:cursor-pointer transition-all duration-300'
              onClick={nextImage}
            >
              <MdOutlineKeyboardArrowRight className='size-10' />
            </div>
          </div>
          <iframe src="https://www.youtube.com/embed/7ZdbGAEhDks" frameborder="0" className='relative z-20 w-[90%] h-70 sm:200 lg:w-280 sm:h-150 rounded-3xl mt-10' />
          <Link to="/gallery"><button className='relative z-20 bg-[#0077B6] w-60 px-6 py-2 rounded-full font-bold text-lg shadow-md hover:shadow-[rgb(0,119,182)] border-2 border-transparent hover:border-[hsl(199,100%,27%)] hover:cursor-pointer transition-all duration-300'>Go to Gallery Page</button></Link>
          <div className='hidden sm:block absolute -bottom-50 -left-120 noise-bg size-200 rounded-full'/>
          <div className='hidden sm:block absolute -bottom-50 -right-120 noise-bg size-200 rounded-full'/>
       </div>
    </div>
  )
}

export default Home