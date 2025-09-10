import React, { useEffect } from 'react'
import image from "../../assets/home3 (1).jpg"
import { useGlobalContext } from '../../contexts/GlobalContext'
import { LuLoader } from 'react-icons/lu'

const Events = () => {
  const {events, areEventsLoading, getAllEvents} = useGlobalContext()

  useEffect(() => {
    getAllEvents()
  }, [])
  return (
    <div className='relative mt-35'>
      <div className='relative z-20 w-full font-outfit'>
        <img src={image} alt="" className='w-full h-50 object-cover'  />
        <div className="absolute flex items-center justify-center top-0 right-0 left-0 bottom-0 bg-[#03045E]/70 shadow-lg shadow-[#0077B6]">
          <h3 className='relative z-10 text-3xl font-bold text-white'>Events</h3>
        </div>
      </div>
      <div className='w-full noise-bg h-auto py-20 flex flex-col items-center justify-center gap-15'>
        {areEventsLoading ? <LuLoader className='text-center animate-spin self-center text-white text-3xl mt-10' /> : events.map((event) => (
          <div className='relative z-20 rounded-4xl pt-20 sm:pt-10 py-10 h-auto w-[90%] px-5 sm:w-250 flex flex-wrap items-start justify-center gap-10 border-3 border-[#90E0EF] bg-[#0077B6]/60 shadow-xl shadow-[#0077B6]'>
            <img src={event.image} alt="" className='object-cover h-100 w-100 border-3 border-[hsl(201,100%,50%)] rounded-3xl' />
            <div className='flex flex-col items-start justify-center gap-10'>
              <div className='flex items-center justify-center gap-3 mt-1'>
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
      <div className='hidden sm:block absolute -bottom-50 -left-120 noise-bg size-200 rounded-full'/>
      <div className='hidden sm:block absolute -bottom-50 -right-120 noise-bg size-200 rounded-full'/>
    </div>
  )
}

export default Events