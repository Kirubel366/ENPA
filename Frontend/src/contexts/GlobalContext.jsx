import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast"
import { axiosInstance } from "../libs/axios"

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalContextProvider = ({ children }) => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isLoggining, setIsLoggining] = useState(false);
  const [isAdminUpdating, setIsAdminUpdating] = useState(false);
  const [isVolunteerUpdating, setIsVolunteerUpdating] = useState(false);
  const [isVolunteerDeletingAccount, setIsVolunteerDeletingAccount] = useState(false);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [events, setEvents] = useState([]);
  const [areEventsLoading, setAreEventsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [areImagesLoading, setAreImagesLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const [areVideosLoading, setAreVideosLoading] = useState(false);
  const [isAddingVideo, setIsAddingVideo] = useState(false);
  const [isDeletingVideo, setIsDeletingVideo] = useState(null);
  const [isAddingImage, setIsAddingImage] = useState(false);
  const [activeVolunteers, setActiveVolunteers] = useState([]);
  const [areVolunteersLoading, setAreVolunteersLoading] = useState(false);
  const [isSubmittingContactForm, setIsSubmittingContactForm] = useState(false);
  const [isSubmittingFooterMessage, setIsSubmittingFooterMessage] = useState(false);

  // Authentication
  const fetchAuthUser = async () => {
    try {
      const res = await axiosInstance.get("/auth/checkAuth");
      setAuthUser(res.data); 
    } catch {
      setAuthUser(
        null
      );
    } finally {
      setIsAuthChecking(false);
    }
  };
  
  useEffect(() => {
    fetchAuthUser();
  }, [])
  
  const signUp = async(data) => {
    setIsSigningUp(true)
    try {
      const res = await axiosInstance.post("/auth/signUp", data);
      setAuthUser(res.data);
      setIsAuthOpen(false);
      toast.success("Signed Up successfully!")
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setIsSigningUp(false)
    }
  }

  const login = async(data) => {
    setIsLoggining(true)
    try {
      const res = await axiosInstance.post("/auth/login", data);
      setAuthUser(res.data);
      setIsAuthOpen(false);
      toast.success("Logged in successfully!")
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setIsLoggining(false)
    }
  }

  const logout = async() => {
    try {
      await axiosInstance.post("/auth/logout");
      setAuthUser(null);
    } catch (error) {
      console.error(error?.response?.data?.message || "Something went wrong!");
    } 
  }

  const updateAdminAccount = async(data) => {
    setIsAdminUpdating(true)
    try {
      const res = await axiosInstance.post("/auth/updateAdminAccount", data);
      setAuthUser(res.data);
      toast.success("Account updated successfully!")
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setIsAdminUpdating(false)
    }
  }

  const updateVolunteerAccount = async(data) => {
    setIsVolunteerUpdating(true)
    try {
      const res = await axiosInstance.post("/auth/updateVolunteerAccount", data);
      setAuthUser(res.data);
      toast.success("Account updated successfully!")
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setIsVolunteerUpdating(false)
    }
  }

  const deleteVolunteerAccount = async() => {
    setIsVolunteerDeletingAccount(true)
    try {
      await axiosInstance.post(`/auth/deleteAccount/${authUser._id}`);
      setAuthUser(null);
    } catch (error) {
      console.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setIsVolunteerDeletingAccount(false)
    } 
  }

  // Admin and Landing page functions
  const addEvent = async(data) => {
    setIsAddingEvent(true)
    try {
      await axiosInstance.post("/event/addEvent", data)
      getAllEvents()
      toast.success("Event added successfully")
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setIsAddingEvent(false)
    }
  }

  const getAllEvents = async() => {
    setAreEventsLoading(true)
    try {
      const res = await axiosInstance.get("/event/getAllEvents")
      setEvents(res.data)
    } catch (error) {
      console.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setAreEventsLoading(false)
    }
  }

  const deleteEvent = async(id) => {
    try {
      await axiosInstance.post(`/event/deleteEvent/${id}`)
      setEvents(prev => prev.filter((event) => event._id !== id));
    } catch (error) {
      console.error(error?.response?.data?.message || "Something went wrong!");
    }
  }

  const updateEventCompletion = async(id) => {
    try {
      await axiosInstance.post(`/event/updateCompletion/${id}`)
      setEvents(prev =>
        prev.map(event =>
          event._id === id ? { ...event, isCompleted: !event.isCompleted } : event
        )
      );
    } catch (error) {
      console.error(error?.response?.data?.message || "Something went wrong!");
    }
  }

  const getAllVideos = async() => {
    setAreVideosLoading(true)
    try {
      const res = await axiosInstance.get("/gallery/getAllVideos")
      setVideos(res.data)
    } catch (error) {
      console.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setAreVideosLoading(false)
    }
  }

  const getAllImages = async(data) => {
    setAreImagesLoading(true)
    try {
      const res = await axiosInstance.get("/gallery/getAllImages")
      setImages(res.data)
    } catch (error) {
      console.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setAreImagesLoading(false)
    }
  }
  
  const addVideo = async (data) => {
    setIsAddingVideo(true);
  
    try {
      await axiosInstance.post("/gallery/addVideo", data, {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      });
  
      getAllVideos();
      toast.success("Video added successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setIsAddingVideo(false);
    }
  };
  
  const addImage = async(data) => {
    setIsAddingImage(true)
    try {
      await axiosInstance.post("/gallery/addImage", data)
      getAllImages()
      toast.success("Image added successfully")
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setIsAddingImage(false)
    }
  }

  const deleteVideo = async(id) => {
    setIsDeletingVideo(id)
    try {
      await axiosInstance.post(`/gallery/deleteVideo/${id}`)
      setVideos(prev => prev.filter((video) => video._id !== id));
    } catch (error) {
      console.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setIsDeletingVideo(null)
    }
  }

  const deleteImage = async(id) => {
    try {
      await axiosInstance.post(`/gallery/deleteImage/${id}`)
      setImages(prev => prev.filter((image) => image._id !== id));
    } catch (error) {
      console.error(error?.response?.data?.message || "Something went wrong!");
    }
  }

  const getActiveVolunteers = async(data) => {
    setAreVolunteersLoading(true)
    try {
      const res = await axiosInstance.get("/auth/getActiveVolunteers")
      setActiveVolunteers(res.data)
    } catch (error) {
      console.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setAreVolunteersLoading(false)
    }
  }

  const sendContactForm = async(data) => {
    setIsSubmittingContactForm(true)
    try {
      await axiosInstance.post("/sendemail", data);
      toast.success("Message submitted successfully!")
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setIsSubmittingContactForm(false)
    }
  }

  const sendFooterMessage = async(data) => {
    setIsSubmittingFooterMessage(true)
    try {
      await axiosInstance.post("/sendFooterEmail", data);
      toast.success("Message submitted successfully!")
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setIsSubmittingFooterMessage(false)
    }
  }

  
  const value = {
    // modal
    isAuthOpen, 
    setIsAuthOpen,

    // Authentication resources
    authUser,
    setAuthUser,
    isAuthChecking,
    signUp,
    isSigningUp,
    login,
    isLoggining,
    logout,
    updateAdminAccount,
    isAdminUpdating,
    updateVolunteerAccount,
    isVolunteerUpdating,
    deleteVolunteerAccount,
    isVolunteerDeletingAccount,

    // Admin, Volunteer and Landing page resources
    isAddingEvent,
    addEvent,
    areEventsLoading,
    events,
    getAllEvents,
    deleteEvent,
    updateEventCompletion,
    isAddingVideo,
    videos,
    addVideo,
    areVideosLoading,
    getAllVideos,
    areImagesLoading,
    isAddingImage,
    images,
    addImage,
    getAllImages,
    deleteVideo,
    isDeletingVideo,
    deleteImage,
    areVolunteersLoading,
    activeVolunteers,
    getActiveVolunteers,
    isSubmittingContactForm,
    isSubmittingFooterMessage,
    sendFooterMessage,
    sendContactForm
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
