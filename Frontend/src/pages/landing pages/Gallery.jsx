import React, { useEffect, useState } from 'react'
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import image from "../../assets/home3 (1).jpg"
import { useGlobalContext } from '../../contexts/GlobalContext';
import { LuLoader } from 'react-icons/lu';

const Gallery = () => {
  const { images, areImagesLoading, getAllImages, videos, areVideosLoading, getAllVideos } = useGlobalContext();

  const compoundImages = images.filter((image) => image.category === "compound")
  const studentImages = images.filter((image) => image.category === "students")
  const traningImages = images.filter((image) => image.category === "traning program")
  const othersImages = images.filter((image) => image.category === "others")

  useEffect(() => {
    getAllImages()
    getAllVideos()
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
    <div className='w-full min-h-screen mt-35 noise-bg-2'>
      {/* Banner */}
      <div className='relative w-full'>
        <img src={image} alt="" className='w-full h-50 object-cover' />
        <div className="absolute z-10 flex items-center justify-center top-0 right-0 left-0 bottom-0 bg-[#03045E]/70 shadow-lg shadow-[#0077B6]">
          <h3 className='relative z-10 text-3xl font-bold text-white'>Gallery</h3>
        </div>
      </div>

      <div className='relative h-auto w-full noise-bg text-white px-3 sm:px-30 flex flex-col items-center justify-center gap-10 py-20'>
        <h3 className='font-jacques-francois-shadow text-4xl text-center'>Moments That Inspire</h3>
        <div className='relative z-20 flex items-center justify-center gap-1 lg:gap-5 w-full'>
          {/* Left Arrow */}
          <div
            className='size-10 sm:size-15 bg-[#0077B6]/60 border-2 border-[#0077B6] flex items-center justify-center rounded-full hover:scale-110 hover:cursor-pointer transition-all duration-300'
            onClick={prevImage}
          >
            <MdOutlineKeyboardArrowRight className='size-10 rotate-180' />
          </div>

          {/* Current Image */}
          <div className="w-full sm:w-180 lg:w-280 h-70 sm:h-150 overflow-hidden rounded-3xl border-2 border-[hsl(201,100%,70%)]">
            <img
              src={images[currentIndex]?.image}
              alt=""
              className="w-full h-full object-cover transition-opacity duration-700 ease-in-out opacity-100"
            />
          </div>

          {/* Right Arrow */}
          <div
            className='size-10 sm:size-15 bg-[#0077B6]/60 border-2 border-[#0077B6] flex items-center justify-center rounded-full hover:scale-110 hover:cursor-pointer transition-all duration-300'
            onClick={nextImage}
          >
            <MdOutlineKeyboardArrowRight className='size-10' />
          </div>
        </div>
      </div>

      {(areVideosLoading || areImagesLoading) && (
        <div className='relative flex items-center justify-center w-full py-30 noise-bg-2 z-10'>
          <LuLoader className='text-6xl text-white animate-spin' />
        </div>
      )}

      <div className={`${(areVideosLoading || areImagesLoading) ? "hidden" : ""} relative z-20 py-20 px-10 flex flex-col items-center noise-bg-2 h-auto`}>
        <div className='flex flex-col items-center justify-center gap-30'>

          {/* Compound */}
          {compoundImages.length > 0 && (
            <div className='flex flex-col items-center justify-center gap-15 w-full'>
              <h3 className='text-3xl font-bold text-white text-shadow-lg text-shadow-[#0077B6]'>Our Compound</h3>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-full'>
                {compoundImages.map((imageItem) => (
                  <div key={imageItem.image} className="relative hover:-translate-y-2 transition-all duration-500">
                    <img src={imageItem.image} alt="" className='h-90 w-120 object-cover rounded-3xl shadow-xl shadow-[#0077B6]' />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Students */}
          {studentImages.length > 0 && (
            <div className='flex flex-col items-center justify-center gap-15 w-full'>
              <h3 className='text-3xl font-bold text-white text-shadow-lg text-shadow-[#0077B6]'>Our Students</h3>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-full'>
                {studentImages.map((imageItem) => (
                  <div key={imageItem.image} className="relative hover:-translate-y-2 transition-all duration-500">
                    <img src={imageItem.image} alt="" className='h-90 w-120 object-cover rounded-3xl shadow-xl shadow-[#0077B6]' />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Traning */}
          {traningImages.length > 0 && (
            <div className='flex flex-col items-center justify-center gap-15 w-full'>
              <h3 className='text-3xl font-bold text-white text-shadow-lg text-shadow-[#0077B6]'>Traning Programs</h3>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-full'>
                {traningImages.map((imageItem) => (
                  <div key={imageItem.image} className="relative hover:-translate-y-2 transition-all duration-500">
                    <img src={imageItem.image} alt="" className='h-90 w-120 object-cover rounded-3xl shadow-xl shadow-[#0077B6]' />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Others */}
          {othersImages.length > 0 && (
            <div className='flex flex-col items-center justify-center gap-15 w-full'>
              <h3 className='text-3xl font-bold text-white text-shadow-lg text-shadow-[#0077B6]'>Others</h3>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-full'>
                {othersImages.map((imageItem) => (
                  <div key={imageItem.image} className="relative hover:-translate-y-2 transition-all duration-500">
                    <img src={imageItem.image} alt="" className='h-[360px] w-120 object-cover rounded-3xl shadow-xl shadow-[#0077B6]' />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Videos */}
      <div className='relative w-full noise-bg h-auto py-25 px-10 md:px-30 flex flex-col items-center justify-center gap-20'>
        <h3 className='text-5xl text-shadow-lg text-shadow-[#0077B6] text-white font-bold'>Videos</h3>
        <div className='relative z-20 grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-10 w-full'>
          {videos.map((videoItem, index) => {
            const urlRegex = /^https?:\/\/[^\s]+$/;
            return urlRegex.test(videoItem.video) ? (
              <iframe key={index} src={videoItem.video} className='relative z-10 w-full xl:w-180 h-90 sm:h-110 rounded-3xl' />
            ) : (
              <video key={index} controls src={videoItem.video} className='relative z-10 w-full xl:w-180 h-90 sm:h-110 rounded-3xl' />
            )
          })}
        </div>
        <div className='hidden sm:block absolute -bottom-50 -left-120 noise-bg size-200 rounded-full'/>
        <div className='hidden sm:block absolute -bottom-50 -right-120 noise-bg size-200 rounded-full'/>
      </div>
    </div>
  )
}

export default Gallery
