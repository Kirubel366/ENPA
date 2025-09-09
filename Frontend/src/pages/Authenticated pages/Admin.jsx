import React, { useEffect, useRef, useState } from 'react'
import { FaArrowDown, FaLock, FaPhone, FaTrash, FaUser, FaX } from 'react-icons/fa6';
import { LuLoader, LuMail, LuX } from 'react-icons/lu';
import { MdAddPhotoAlternate, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Icon } from '@iconify/react/dist/iconify.js';
import adminicon from "../../assets/adminicon.png"
import activeVols from "../../assets/activVols.png"
import { IoIosList, IoMdAddCircleOutline } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";
import { HiHome } from "react-icons/hi2";
import { TiInputChecked } from "react-icons/ti";
import { useGlobalContext } from '../../contexts/GlobalContext';
import { FiUpload, FiSidebar } from "react-icons/fi";

const Admin = () => {
  const eventImageRef = useRef()
  const emailInputRef = useRef()
  const passwordInputRef = useRef()
  const imageRef = useRef()
  const videoRef = useRef()
  const [isOpen, setIsOpen] = useState(false)
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)
  const [openCategoryList, setOpenCategoryList] = useState(false)
  const [isEmailReadOnly, setIsEmailReadOnly] = useState(true)
  const [isPasswordReadOnly, setIsPasswordReadOnly] = useState(true)
  const [page, setPage] = useState("home")
  const [galleryNew, setGalleryNew] = useState("nothing-selected")
  const {authUser, setAuthUser, logout, addEvent, getAllEvents, isAddingEvent, getAllImages, getAllVideos, events, areEventsLoading, deleteEvent, updateEventCompletion, updateAdminAccount, isAdminUpdating, addVideo, isAddingVideo, isDeletingVideo, areVideosLoading, videos, deleteVideo, isAddingImage, addImage, images, areImagesLoading, deleteImage, areVolunteersLoading, activeVolunteers, getActiveVolunteers} = useGlobalContext();
  const [selectedImg, setSelectedImg] = useState("")
  const [selectedVideo, setSelectedVideo] = useState("")
  const [selectedImage, setSelectedImage] = useState("")
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [imageFormData, setImageFormData] = useState({
    image: "",
    category: "Select Category"
  })
  const [midVideoFormData, setMidVideoFormData] = useState({
    deviceVideo: "",
    internetVideo: ""
  })
  const [videoFormData, setVideoFormData] = useState({
    video: ""
  })
  const [eventFormData, setEventFormData] = useState({
    name: "",
    description: "",
    image: "",
  })
  const [formData, setFormData] = useState({ 
    email: authUser.email,
    currentPassword: "",
    newPassword: "",
  })

  useEffect(() => {
    getAllEvents()
    getAllImages()
    getAllVideos()
    getActiveVolunteers()
  }, [])

  useEffect(() => {
    setFormData({ 
      email: authUser.email,
      currentPassword: "",
      newPassword: "",
    })
  }, [authUser])

  const handleEventImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      setEventFormData(prev => ({ ...prev, image: base64Image }));
    };
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      setImageFormData(prev => ({ ...prev, image: base64Image }));
    };
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const videoUrl = URL.createObjectURL(file);
    setSelectedVideo(videoUrl);
  
    setMidVideoFormData({
      deviceVideo: file, 
      internetVideo: ""
    });
  };

  const handleEventSubmit = async(e) => {
    e.preventDefault()
    await addEvent(eventFormData)
    setEventFormData({
      name: "",
      description: "",
      image: "",
    })
    setSelectedImg("")
    const fileInput = document.getElementById("event-image");
    if (fileInput) fileInput.value = null;
  };

  useEffect(() => {
    setIsButtonDisabled(
      formData.email === authUser.email &&
      (!formData.currentPassword || !formData.newPassword)
    )
  }, [formData, authUser])

  const handleUpdate = async(e) => {
    e.preventDefault()
    if(!isButtonDisabled){
        if(formData.email === authUser.email){
          const res = await updateAdminAccount({ ...formData, email: ""})
          setAuthUser(res.data)
          setIsEmailReadOnly(true)
          setIsPasswordReadOnly(true)
        } else {
          const res = await updateAdminAccount(formData)
          setAuthUser(res.data)
          setIsEmailReadOnly(true)
          setIsPasswordReadOnly(true)
        }
    }
  }
  
  const handleInternetVideo = (url) => {
    if (!url) return;
  
    const fileInput = document.getElementById("video");
    if (fileInput) fileInput.value = null;
    setSelectedVideo("")
  
    setMidVideoFormData({
      deviceVideo: "",
      internetVideo: url
    });
  
    setVideoFormData({ video: url });
  };

  const handleVideoSubmition = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
  
    if (midVideoFormData.deviceVideo) {
      formData.append("deviceVideo", midVideoFormData.deviceVideo);
    }
  
    if (midVideoFormData.internetVideo) {
      formData.append("internetVideo", midVideoFormData.internetVideo);
    }
  
    await addVideo(formData); 
  
    setMidVideoFormData({ deviceVideo: null, internetVideo: "" });
    setVideoFormData({ video: "" });
    setSelectedVideo("");
  
    const fileInput = document.getElementById("video");
    if (fileInput) fileInput.value = null;
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault()
    await addImage(imageFormData)
    setImageFormData({
      image: "",
      category: "Select Category",
    })
    setSelectedImage("")
    const fileInput = document.getElementById("image");
    if (fileInput) fileInput.value = null;
  }

  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [openId, setOpenId] = useState(null)
  

  return (
    <div className='flex flex-col items-center justify-start gap-15 sm:pl-60 pb-15 pt-55 sm:pt-40 font-outfit noise-bg-3 h-auto min-h-[100vh]'>
        <div className='px-5 md:px-30 fixed z-100 top-0 h-30 right-0 left-0 bg-gradient-to-r from-[#03045E] to-130% to-green-400 p-10 border-b-2 border-[#90E0EF]'>
          <div className='flex items-center justify-between'><div onClick={() => setPage("home")} className='text-3xl sm:text-4xl sm:font-bold text-white font-piedra hover:scale-105 hover:cursor-pointer duration-300 transition-all flex items-center justify-center -mt-3 sm:-mt-7'><img src={adminicon} alt="" width={isMobile ? 50 : 80}/> <span>ENPA Admin Panel</span></div> <p onClick={() => setIsOpen(true)} className={`text-3xl font-bold text-shadow-lg text-shadow-[#003E5E] font-oregano hover:cursor-pointer duration-500 transition-all hover:text-[#003E5E] hover:text-shadow-[#81FEAB] -mt-5 sm:-mt-9 flex items-center justify-center ${isOpen ? "text-[#003E5E] text-shadow-[#81FEAB]" : "text-white"}`}><p>{isMobile ? <FaUser /> : "Account Info."}</p><MdOutlineKeyboardArrowRight className='-rotate-270 size-10' /></p></div>
          <form onSubmit={handleUpdate} className={`${isOpen ? "" : "hidden"} absolute top-33 right-3 flex flex-col gap-5 items-center justify-start p-10 px-5 sm:px-10 h-auto w-105 sm:w-130 bg-gradient-to-br from-[#003E5E] to-130% to-[#81FEAB] rounded-3xl border-3 border-green-400/60`}>
            <FaX onClick={() => setIsOpen(false)} className='absolute top-3 right-3 text-xl text-green-400/80 hover:scale-105 bg-[hsl(200,100%,30%)] rounded-full p-2 flex items-center justify-center size-10 hover:cursor-pointer duration-300 transition-all' />
            <h2 className='text-3xl font-bold text-green-400 font-piedra'>Account Info.</h2>
            <div className='flex items-center justify-start gap-2 text-lg text-[#90E0EF] bg-[#003E5E] p-3 rounded-lg w-full'>
              <LuMail />
              <input ref={emailInputRef} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value})} type="text" placeholder='Email' className='focus:outline-none rounded-lg placeholder:text-[#90E0EF]/80' readOnly={isEmailReadOnly}/>
              <button 
                type="button" 
                onClick={() => { setIsEmailReadOnly(false); emailInputRef.current.focus(); }}
                className={`${isEmailReadOnly ? "block" : "hidden"} ml-auto bg-blue-400/80 px-3 py-1 rounded-lg font-bold text-sm text-white hover:cursor-pointer`}
              >
                Edit
              </button>
            </div>
            <div className='flex items-center justify-start gap-2 text-lg text-[#90E0EF] bg-[#003E5E] p-3 rounded-lg w-full'>
              <FaLock />
              <input type="text" value={formData.currentPassword} onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value})} ref={passwordInputRef} placeholder='Current Password' className='focus:outline-none rounded-lg placeholder:text-[#90E0EF]/80' readOnly={isPasswordReadOnly} />
              {isPasswordReadOnly && (
                <button 
                  type='button' 
                  onClick={() => { setIsPasswordReadOnly(false); passwordInputRef.current.focus(); }}
                  className='ml-auto bg-blue-400/80 px-3 py-1 rounded-lg font-bold text-sm text-white hover:cursor-pointer'
                >
                  Edit
                </button>
              )}
            </div>
            <div className={`${isPasswordReadOnly ? "hidden" : ""} flex items-center justify-start gap-2 text-lg text-[#90E0EF] bg-[#003E5E] p-3 rounded-lg w-full`}>
              <FaLock />
              <input type="text" value={formData.newPassword} onChange={(e) => setFormData({ ...formData, newPassword: e.target.value})} placeholder='New Password' className='focus:outline-none rounded-lg placeholder:text-[#90E0EF]/80'/>
            </div>
            <button disabled={isButtonDisabled} type='submit' className={`${isButtonDisabled ? "opacity-50" : "opacity-100 hover:border-green-500 hover:shadow-green-400/70 hover:cursor-pointer"} flex items-center justify-center mt-5 bg-green-400/80 w-full px-6 py-2 rounded-full font-bold text-xl shadow-md border-2 border-transparent text-white  transition-all duration-300`}>{isAdminUpdating ? <LuLoader className='animate-spin' /> : "Update"}</button>
          </form>
        </div>
        <TbLogout2 onClick={() => setIsSideBarOpen(true)} className='absolute top-33 bg-[#0077B6]/60 border-l-3 border-[hsl(201,100%,40%)] text-white h-20 rounded-l-full left-0 rotate-180 text-5xl' />
        <div className={`${isSideBarOpen || !isMobile ? "flex" : "hidden" } fixed z-10 flex-col gap-1.5 items-start justify-start top-30 left-0 h-[100vh] w-70 bg-[#03045E] pt-10 px-6 border-r-2 border-[#90E0EF]`}>
            <LuX onClick={() => setIsSideBarOpen(false)} className={`${isMobile ? "" : "hidden"} text-[hsl(201,50%,80%)] text-3xl self-end -mt-6`} />
            <div onClick={() => {setPage("home"), setIsSideBarOpen(false)}} className={`flex items-center justify-center gap-2 text-xl text-white border-2 hover:border-[#90E0EF] hover:bg-[hsl(189,60%,35%)]/50 ${page === "home" ? "border-[#90E0EF] bg-[hsl(189,60%,35%)]/50" : "border-transparent"} rounded-full py-2 px-7 hover:cursor-pointer transition-all duration-300`}>
            <HiHome />
            Home
            </div>
            <div onClick={() => {setPage("add-event"), setIsSideBarOpen(false)}} className={`flex items-center justify-center gap-2 text-xl text-white border-2 hover:border-[#90E0EF] hover:bg-[hsl(189,60%,35%)]/50 ${page === "add-event" ? "border-[#90E0EF] bg-[hsl(189,60%,35%)]/50" : "border-transparent"} rounded-full py-2 px-7 hover:cursor-pointer transition-all duration-300`}>
            <IoMdAddCircleOutline />
              Add Event
            </div>
            <div onClick={() => {setPage("list-events"), setIsSideBarOpen(false)}} className={`flex items-center justify-center gap-2 text-xl text-white border-2 hover:border-[#90E0EF] hover:bg-[hsl(189,60%,35%)]/50 ${page === "list-events" ? "border-[#90E0EF] bg-[hsl(189,60%,35%)]/50" : "border-transparent"} rounded-full py-2 px-7 hover:cursor-pointer transition-all duration-300`}>
              <IoIosList />
              List Events
            </div>
            <div onClick={() => {setPage("update-gallery"), setIsSideBarOpen(false)}} className={`flex items-center justify-center gap-2 text-xl text-white border-2 hover:border-[#90E0EF] hover:bg-[hsl(189,60%,35%)]/50 ${page === "update-gallery" ? "border-[#90E0EF] bg-[hsl(189,60%,35%)]/50" : "border-transparent"} rounded-full py-2 px-7 hover:cursor-pointer transition-all duration-300`}>
             <MdAddPhotoAlternate />
             Update Gallery
            </div>
            <div onClick={() => {setPage("active-volunteers"), setIsSideBarOpen(false)}} className={`flex items-center justify-center gap-2 text-lg text-white border-2 hover:border-[#90E0EF] hover:bg-[hsl(189,60%,35%)]/50 ${page === "active-volunteers" ? "border-[#90E0EF] bg-[hsl(189,60%,35%)]/50" : "border-transparent"} rounded-full py-2 px-7 hover:cursor-pointer transition-all duration-300`}>
             <img src={activeVols} alt="" className='size-6' />
             Active Volunteers
            </div>
            <div onClick={logout} className='flex items-center justify-center gap-2 text-xl text-white border-2 border-transparent hover:border-[#90E0EF] hover:bg-[hsl(189,60%,35%)]/50 rounded-full py-2 px-7 hover:cursor-pointer transition-all duration-300'>
            <TbLogout2 />
              Logout
            </div>        
        </div>
        <div className='fixed z-50 bottom-0 right-0 p-3 bg-[hsl(200,60%,30%)] w-full sm:w-auto h-10 sm:rounded-lg flex items-center justify-center text-[#90E0EF]'>
          <Icon icon="ph:copyright-light" width="24" height="24" />
          <p>2025 ENPA. All rights reserved / Developed by KiruTech</p>
        </div>

        {/* Home Page */}    
        <div className={`${page === "home" ? "" : "hidden"} flex flex-col gap-10 text-white text-xl items-center justify-start px-3 p-10 w-[90%] sm:w-150 lg:w-230 xl:w-260 h-auto rounded-3xl bg-[#02405F]/70 border-3 border-[#90E0EF] shadow-xl shadow-blue-400/80`}>
          <span className='font-bold font-oregano text-4xl'> 📌 Welcome, Admin 👋<br /></span>

          <span className='text-[#90E0EF] text-shadow-sm text-shadow-black text-center'>This dashboard is your control center for keeping our organization active and impactful.
          From here, you can:<br /></span>

          <span>
            <span className="flex items-start text-blue-300">
                <TiInputChecked className='text-4xl' />
                <span className="flex flex-nowrap gap-1">
                  <span className="whitespace-nowrap text-shadow-sm text-shadow-black">Manage Events</span>
                  <span className="text-white">– Add upcoming activities/events or remove outdated ones.</span>
                </span>
            </span>

            <span className="flex items-start text-blue-300">
                <TiInputChecked className='text-4xl' />
                <span className="flex flex-nowrap gap-1">
                  <span className="whitespace-nowrap text-shadow-sm text-shadow-black">Update the Gallery</span>
                  <span className="text-white">– Upload inspiring photos and videos, or delete media no longer needed.</span>
                </span>
            </span>

            <span className="flex items-start text-blue-300">
                <TiInputChecked className='text-4xl' />
                <span className="flex flex-nowrap gap-1">
                  <span className="whitespace-nowrap text-shadow-sm text-shadow-black">Check Active Volunteers</span>
                  <span className="text-white">– View details of our volunteers and stay connected with their contributions.</span>
                </span>
            </span>
          </span>

          
          <span className='text-center underline'>Please ensure all updates are accurate and reflect the mission of our organization.<br />
          Thank you for helping us stay organized and making a real difference! 💙</span>
        </div>

        {/* Add Event Page */}
        <form onSubmit={handleEventSubmit} className={`${page === "add-event" ? "" : "hidden"} flex flex-col gap-10 items-center justify-start p-10 w-[90%] sm:w-150 lg:w-230 xl:w-250 h-auto rounded-3xl bg-[#02405F]/70 border-3 border-[#90E0EF]`}>
          <h3 className='text-3xl text-white font-bold'>Add Event</h3>
          <div 
            onClick={() => eventImageRef.current.click()} 
            className="relative flex items-center justify-center size-70 bg-[#376881] border-2 border-[#81FEAB] rounded-3xl hover:cursor-pointer overflow-hidden"
          >
            {selectedImg ? (
              <img
                src={selectedImg}
                alt="Preview"
                className="absolute inset-0 w-full h-full object-cover rounded-3xl"
              />
            ) : (
              <p className="text-xl text-[#81FEAB] mx-2 text-center flex flex-col items-center justify-center gap-2">
                <FiUpload className="text-4xl" /> click to upload event image
              </p>
            )}

            <input id="event-image" ref={eventImageRef} onChange={handleEventImageUpload} type="file" className="hidden" />
          </div>
          <div className='flex flex-col gap-1 items-start justify-center w-full'>
            <p className='text-lg text-white'>Name</p>
            <input
              type="text"
              value={eventFormData.name}
              onChange={(e) => setEventFormData({ ...eventFormData, name: e.target.value})}
              placeholder='Enter event name'
              className='bg-[#376881] p-5 rounded-xl focus:outline-none focus:border-green-500 text-white/90 w-full border-1 border-[#81FEAB]'
            />
        </div>
        <div className='flex flex-col gap-1 items-start justify-center w-full'>
            <p className='text-lg text-white'>Description</p>
            <textarea
              type="text"
              value={eventFormData.description}
              onChange={(e) => setEventFormData({ ...eventFormData, description: e.target.value})}
              placeholder='Enter event description'
              className='bg-[#376881] p-5 rounded-xl focus:outline-none focus:border-green-500 text-white/90 w-full border-1 border-[#81FEAB]'
            />
        </div>
        <button type='submit' className='flex items-center justify-center mt-5 bg-green-400/80 w-full px-6 py-2 rounded-full font-bold text-xl shadow-md hover:shadow-green-400/70 border-2 border-transparent hover:border-green-500 text-white hover:cursor-pointer transition-all duration-300'>{isAddingEvent ? <LuLoader className='animate-spin' /> : "Add Event"}</button>
        </form>

        {/* Current Events Page */}
        <div className={`${page === "list-events" ? "" : "hidden"} flex flex-col items-center justify-center p-10 w-110 sm:w-120 lg:w-240 h-auto rounded-3xl bg-[#02405F]/70 border-3 border-[#90E0EF]`}>
          <h3 className='text-3xl text-white font-bold mb-10'>Current Events</h3>
          <div className='flex items-center justify-center gap-15 px-10 py-6 bg-[#81FEAB]/50 w-full lg:w-220'>
            <h4 className='font-semibold text-xl text-[#51F678]/80 w-40'>Image</h4>
            <h4 className='font-semibold text-xl text-[#51F678]/80 w-40'>Name</h4>
            <h4 className='font-semibold text-xl text-[#51F678]/80 w-45 hidden lg:block'>Description</h4>
            <h4 className='font-semibold text-xl text-[#51F678]/80 w-45 hidden lg:block'>Completion</h4>
            <h4 className='font-semibold text-xl text-[#51F678]/80 hidden lg:block'>Delete</h4>
          </div>
          <div className='flex flex-col items-center justify-center'>
            {areEventsLoading ? <LuLoader className='animate-spin self-center text-white text-3xl mt-10' /> : events.map((event) => (
              <div className='relative flex flex-col items-start justify-start gap-15 px-10 pt-6 bg-[#306078]/70 text-white w-full min-h-47 lg:min-h-auto h-auto lg:w-220 border-b-2 border-[#90E0EF] hover:bg-[#306078]/50 duration-300 transition-all'>
                <div className={`${openId === event._id ? "" : "h-45"} flex items-start justify-center gap-15 h-auto mb-3`}>
                  <img src={event.image} className='font-semibold text-xl w-40 h-25 object-cover' />
                <h4 className='text-xl w-40'>{event.name}</h4>
                <h4 className='text-xl w-45 wrap-anywhere hidden lg:block'>{event.description}</h4>
                <input type="checkbox" checked={event.isCompleted} onChange={() => updateEventCompletion(event._id)} className='hidden lg:block w-30 mr-15 size-7' />
                <h4 onClick={() => deleteEvent(event._id)} className='hidden lg:block text-2xl text-red-500 mr-50 hover:cursor-pointer hover:scale-110 duration-300 transition-all'><FaTrash /></h4>
                </div>
                <button onClick={() => setOpenId(event._id)} className={`${openId === event._id ? "hidden" : ""} lg:hidden absolute top-34 left-10 w-31 py-1 rounded-lg bg-green-400/40 border-2 border-green-400/60`}>Details</button>
                <div className={`${openId === event._id ? "" : "hidden"} self-center mb-5 -mt-8 w-60 h-auto flex flex-col gap-3 items-start justify-center p-3 rounded-xl bg-[hsl(200,63%,20%)]/80`}>
                      <div className='relative h-3'>
                        <LuX onClick={() => setOpenId(null)} className='absolute -top-1 -right-53 text-xl text-green-400'/>
                      </div>
                      <div className='flex flex-col w-full items-start text-white/80 justify-center bg-[hsl(200,73%,16%)]/60 border-1 border-green-500/80 p-4 rounded-lg'>
                        <p className='text-green-300 text-lg font-bold font-serif'>Description</p>
                        <p className='mt-2 wrap-anywhere w-full'>{event.description}</p>
                      </div>
                      <div className='flex flex-col w-full items-start text-white/80 justify-center bg-[hsl(200,73%,16%)]/60 border-1 border-green-500/80 p-4 rounded-lg'>
                        <p className='text-green-300 font-bold font-serif'>Completion</p>
                        <input type="checkbox" checked={event.isCompleted} onChange={() => updateEventCompletion(event._id)} className='mt-2 size-7' />
                      </div>
                      <div className='flex flex-col w-full items-start text-white/80 justify-center bg-[hsl(200,73%,16%)]/60 border-1 border-green-500/80 p-4 rounded-lg'>
                        <p className='text-green-300 font-bold font-serif'>Delete</p>
                        <FaTrash onClick={() => deleteEvent(event._id)} className='text-3xl mt-2 text-red-500' />
                       </div>
                </div>
              </div>
            ))}
            {(events.length === 0 && !areEventsLoading) && <p className='text-2xl mt-10 font-oregano text-white text-shadow-lg text-shadow-black'>No events found!</p>}
          </div>
        </div>

        {/* Gallery Management Page */}
      <div className={`${page === "update-gallery" ? "" : "hidden"} flex flex-col gap-15 w-full`}>
         <div className={`${galleryNew === "nothing-selected" ? "" : "hidden"} flex flex-col items-center justify-center p-10 self-center w-[90%] sm:w-150 lg:w-200 h-auto rounded-4xl bg-[#02405F]/70 border-3 border-[#90E0EF]`}>
          <h3 className='text-3xl text-white font-bold mb-5'>Add New</h3>
          <div className='flex flex-wrap items-center justify-center gap-5'>
            <button onClick={() => setGalleryNew("add-video")} className='mt-5 bg-[#0077B6] border-2 border-[#1FB666] w-70 px-6 py-2 rounded-full font-bold text-xl shadow-md hover:shadow-[#0077B6] text-white hover:cursor-pointer transition-all duration-300'>Video</button>
            <button onClick={() => setGalleryNew("add-image")} className='mt-5 bg-[#00DF4A]/80 border-2 border-[#1877F2] w-70 px-6 py-2 rounded-full font-bold text-xl shadow-md hover:shadow-green-400/70 text-white hover:cursor-pointer transition-all duration-300'>Image</button>
          </div>
         </div>          

         <form onSubmit={handleVideoSubmition} className={`${galleryNew === "add-video" ? "" : "hidden"} relative flex flex-col items-center justify-center p-10 w-[90%] sm:w-150 lg:w-200 h-auto self-center rounded-4xl bg-[#02405F]/70 border-3 border-[#90E0EF]`}>
          <h3 className='text-3xl text-white font-bold mb-10'>Add Video</h3>
          <p onClick={() => setGalleryNew("nothing-selected")} className='absolute top-5 left-10 font-semibold text-green-400/80 hover:cursor-pointer hover:text-green-400 text-lg'>Back</p>
           <div className='flex flex-wrap items-start justify-center gap-10'>
              <div 
                onClick={() => videoRef.current.click()} 
                className="relative flex items-center justify-center size-70 bg-[#376881] border-2 border-[#81FEAB] rounded-3xl hover:cursor-pointer overflow-hidden"
              >
                {selectedVideo ? (
                  <video
                    src={selectedVideo}
                    controls
                    className="absolute inset-0 w-full h-full object-cover rounded-3xl"
                  />
                ) : (
                  <p className="text-xl text-[#81FEAB] mx-2 text-center flex flex-col items-center justify-center gap-2">
                    <FiUpload className="text-4xl" /> click to upload video
                  </p>
                )}

                <input id="video" ref={videoRef} onChange={handleVideoUpload} type="file" className="hidden" />
              </div>
              <div className='flex flex-col gap-1 items-start justify-center w-80 mt-5'>
                <p className='text-lg text-white text-center'>or paste video URL here</p>
                <input
                  type="text"
                  value={midVideoFormData.internetVideo}
                  onChange={(e) => handleInternetVideo(e.target.value)}
                  placeholder='Enter URL...'
                  className='bg-[#376881] py-3 px-5 rounded-full focus:outline-none focus:border-green-500 text-white/90 w-full border-1 border-[#81FEAB]'
                />
              </div>
            </div>
            <button type='submit' className='flex items-center justify-center mt-15 bg-[#00DF4A]/80 border-2 border-[#1877F2] w-full sm:w-130 px-6 py-2 rounded-full font-bold text-xl shadow-md hover:shadow-green-400/70 text-white hover:cursor-pointer transition-all duration-300'>{isAddingVideo ? <LuLoader className='animate-spin' /> : "Add Video"}</button>
         </form>

         <form onSubmit={handleImageSubmit} className={`${galleryNew === "add-image" ? "" : "hidden"} relative flex flex-col items-center justify-center self-center p-10 w-[90%] sm:w-150 lg:w-200 h-auto rounded-4xl bg-[#02405F]/70 border-3 border-[#90E0EF]`}>
          <h3 className='text-3xl text-white font-bold mb-10'>Add Image</h3>
          <p onClick={() => setGalleryNew("nothing-selected")} className='absolute top-5 left-10 font-semibold text-green-400/80 hover:cursor-pointer hover:text-green-400 text-lg'>Back</p>
           <div className='flex flex-wrap items-start justify-center gap-10'>
           <div 
                onClick={() => imageRef.current.click()} 
                className="relative flex items-center justify-center size-70 bg-[#376881] border-2 border-[#81FEAB] rounded-3xl hover:cursor-pointer overflow-hidden"
              >
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="image"
                    className="absolute inset-0 w-full h-full object-cover rounded-3xl"
                  />
                ) : (
                  <p className="text-xl text-[#81FEAB] mx-2 text-center flex flex-col items-center justify-center gap-2">
                    <FiUpload className="text-4xl" /> click to upload image
                  </p>
                )}

                <input id="image" ref={imageRef} onChange={handleImageUpload} type="file" className="hidden" />
              </div>
          <div className='flex flex-col gap-1 items-start justify-center w-90'>
            <p className='text-lg text-white'>Category</p>
            <div className={`${openCategoryList === false ? "border-green-400/40" : "border-green-400/80"} flex flex-col items-start justify-center text-lg text-white/90 gap-2 bg-[#376881] rounded-xl w-full p-2 border-1`}>
              <div className='flex items-center justify-between w-full'>
                <input
                  value={imageFormData.category}
                  type="text"
                  readOnly
                  className='p-2 w-full rounded-xl focus:outline-none text-white/70'
                />
                <FaArrowDown onClick={() => setOpenCategoryList(!openCategoryList)} className='hover:cursor-pointer'/>
              </div>
              <div className={`${openCategoryList === false ? "hidden" : ""} flex flex-col items-start justify-center bg-amber-100/10 p-3 rounded-lg w-full border-2 border-blue-400/50`}>
                {["Compound","Students","Traning program","Others"].map(cat => (
                  <p
                    key={cat}
                    className='hover:text-blue-400 hover:scale-105 hover:cursor-pointer'
                    onClick={() => { setImageFormData(prev => ({ ...prev, category: cat })); setOpenCategoryList(false); }}
                  >
                    {cat}
                  </p>
                ))}
              </div>
            </div>
          </div>
            </div>
            <button type='submit' className='flex items-center justify-center mt-15 bg-[#00DF4A]/80 border-2 border-[#1877F2] w-full sm:w-130 px-6 py-2 rounded-full font-bold text-xl shadow-md hover:shadow-green-400/70 text-white hover:cursor-pointer transition-all duration-300'>{isAddingImage ? <LuLoader className='animate-spin' /> : "Add Image"}</button>
         </form>

         <div className='flex flex-col items-center justify-center self-center p-10 w-[90%] sm:w-150 lg:w-240 xl:w-250 h-auto rounded-4xl bg-[#02405F]/70 border-3 border-[#90E0EF]'>
           <h3 className='text-3xl text-white font-bold mb-10'>Current Media</h3>
           <div className='flex flex-wrap items-start justify-center gap-10'>
            <div className='flex flex-col items-center justify-center w-100'>
              <div className='flex items-center justify-center px-10 py-6 bg-[#81FEAB]/50 w-full'>
                  <h4 className='font-semibold text-2xl text-[#51F678]/80'>videos</h4>
              </div>
              <div className='flex flex-col items-center justify-center w-full'>
                {areVideosLoading ? <LuLoader className='animate-spin self-center text-white text-3xl mt-10' /> : videos.map((videoItem) => {
                  const urlRegex = /^https?:\/\/[^\s]+$/;
                  console.log(videoItem.video)
                  if(urlRegex.test(videoItem.video)){
                    return (
                      <div className='relative flex items-center justify-center px-10 py-6 bg-[#306078]/70 text-red-500 w-full border-b-2 border-[#90E0EF] hover:bg-[#306078]/50 duration-300 transition-all'>
                        <iframe src={videoItem.video} className='w-90 h-50 rounded-xl' />
                        <h4 onClick={() => deleteVideo(videoItem._id)} className='absolute top-45 right-7 text-lg flex items-center justify-center gap-1 bg-black rounded-lg px-3 shadow-sm shadow-red-500  text-red-500 mr-3 hover:cursor-pointer hover:scale-105 duration-300 transition-all font-semibold'>{isDeletingVideo === videoItem._id ? <LuLoader className='animate-spin m-2' /> : " Delete" } <FaTrash className={`${isDeletingVideo === videoItem._id ? "hidden" : ""}`} /></h4>
                      </div>
                    )
                  } else {
                    return (
                      <div className='relative flex items-center justify-center px-10 py-6 bg-[#306078]/70 text-red-500 w-full border-b-2 border-[#90E0EF] hover:bg-[#306078]/50 duration-300 transition-all'>
                        <video controls src={videoItem.video} className='w-90 h-40 rounded-xl' />
                        <h4 onClick={() => deleteVideo(videoItem._id)} className='absolute top-36 right-19 text-lg flex items-center justify-center gap-1 bg-black rounded-lg shadow-sm shadow-red-500 px-3 text-red-500 mr-3 hover:cursor-pointer hover:scale-105 duration-300 transition-all font-semibold'>{isDeletingVideo === videoItem._id ? <LuLoader className='animate-spin m-2' /> : " Delete" } <FaTrash className={`${isDeletingVideo === videoItem._id ? "hidden" : ""}`} /></h4>
                      </div>
                    )
                  }
                })}
                {(videos.length < 1 && !areVideosLoading) && <p className='text-2xl mt-5 font-oregano text-white text-shadow-lg text-shadow-black'>No videos found!</p>}
              </div>
            </div>
            <div className='flex flex-col items-center justify-center w-100'>
              <div className='flex items-center justify-center px-10 py-6 bg-[#81FEAB]/50 w-full'>
                  <h4 className='font-semibold text-2xl text-[#51F678]/80'>Images</h4>
              </div>
              <div className='flex items-center justify-center gap-15 px-10 py-6 bg-[#0077B6]/50 w-full'>
                <h4 className='font-semibold text-xl text-[#51F678]/80 w-20'>Image</h4>
                <h4 className='font-semibold text-xl text-[#51F678]/80 w-25'>Category</h4>
                <h4 className='font-semibold text-xl text-[#51F678]/80'>Delete</h4>
              </div>
              <div className='flex flex-col items-center justify-center w-full'>
                {areImagesLoading ? <LuLoader className='animate-spin self-center text-white text-3xl mt-10' /> : images.map((imageItem) => (
                  <div className='flex items-start justify-center gap-15 px-10 py-6 bg-[#306078]/70 text-white w-full border-b-2 border-[#90E0EF] hover:bg-[#306078]/50 duration-300 transition-all'>
                    <img src={imageItem.image} className='font-semibold text-xl w-20 h-15 object-cover' />
                    <h4 className='text-xl'>{imageItem.category}</h4>
                    <h4 onClick={() => deleteImage(imageItem._id)} className='text-2xl text-red-500 mr-7 hover:cursor-pointer hover:scale-110 duration-300 transition-all'><FaTrash /></h4>
                  </div>
                ))}
                {(images.length === 0 && !areImagesLoading) && <p className='text-2xl mt-5 font-oregano text-white text-shadow-lg text-shadow-black'>No images found!</p>}
              </div>
            </div>
           </div>
        </div>
      </div>

        {/* Active Volunteers Page */}
       <div className={`${page === "active-volunteers" ? "" : "hidden"} relative flex flex-col items-center justify-center self-center p-5 pt-10 sm:p-10 w-[90%] sm:w-160 md:w-170 xl:w-250 h-auto rounded-3xl bg-[#02405F]/70 border-3 border-[#90E0EF]`}>
        <div className='absolute top-3 right-3 w-auto py-2 px-4 flex flex-col items-center justify-center rounded-xl bg-green-400/40 text-center text-white text-lg font-bold'><span className='text-center text-xl font-bold text-blue-400 text-shadow-md text-shadow-black/50'>{activeVolunteers.length}</span>Total Volunteers</div>
        <h3 className='text-3xl text-white font-bold mb-10 mt-13'>Active Volunteers</h3>
        <div className='flex items-center justify-center sm:justify-start gap-15 px-10 py-6 bg-[#81FEAB]/50 w-full sm:w-160'>
          <h4 className='font-semibold text-xl text-[#51F678]/80 w-auto sm:w-40'>{isMobile ? "Full Name/Phone no./Email" : "Full Name"}</h4>
          <h4 className='font-semibold text-xl text-[#51F678]/80 hidden sm:block w-45'>Email</h4>
          <h4 className='font-semibold text-xl text-[#51F678]/80 hidden sm:block'>Phone no.</h4>
        </div>
        {areVolunteersLoading ? <LuLoader className='animate-spin self-center text-white text-3xl mt-10' /> : activeVolunteers.map((volunteer) => 
          {if(isMobile){
            return (<div className='flex flex-col items-center justify-center gap-3 px-10 py-10 h-50 bg-[#306078]/70 text-white w-full border-b-2 border-[#90E0EF] hover:bg-[#306078]/50'>
                      <h4 className='text-xl relative text-nowrap'>{volunteer.name}</h4>
                      <p className='flex gap-2 items-center justify-center text-lg text-green-400'><FaPhone /> {volunteer.phone}</p>
                      <p className='flex gap-2 items-center justify-center text-lg text-green-400'><LuMail /> {volunteer.email}</p>
                    </div>)
          }else {
            return (<div className='relative flex justify-center sm:justify-start gap-15 px-10 py-10 h-auto bg-[#306078]/70 text-white w-full sm:w-160 border-b-2 border-[#90E0EF] hover:bg-[#306078]/50 duration-300 transition-all'>
              <h4 className='text-xl w-40'>{volunteer.name}</h4>
              <h4 className='text-xl w-45 break-words'>{volunteer.email}</h4>
              <h4 className='text-xl'>{volunteer.phone}</h4>
          </div>)
          }
          }
        )}
        {(activeVolunteers.length === 0 && !areVolunteersLoading) && <p className='text-2xl mt-10 font-oregano text-white text-shadow-lg text-shadow-black'>You have no active volunteers</p>}
       </div>
    </div>
  )
}

export default Admin