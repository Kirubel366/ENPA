import Event from "../models/Event.js"
import { notifyVolunteers } from "../lib/utils.js"
import cloudinary from "../lib/cloudinary.js" 

function toTitleCase(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

export const addEvent = async(req, res) => {
    const {name, description, image} = req.body
    try {
        if(!name || !description){
            return res.status(400).json({ message: "All fields are required!" })
        }

        let uploadResponse = ""
        
        if(image){
            uploadResponse = await cloudinary.uploader.upload(image)
        }

        const newEvent = new Event({
            name: toTitleCase(name), 
            description,
            image: uploadResponse?.secure_url || "https://res.cloudinary.com/db5gkuilb/image/upload/v1757188547/qxhvwnexl6rycmayd8sv.png"
        })

        await newEvent.save()

        await notifyVolunteers({
            subject: `New Event: ${name}`,
            message: `Hey Volunteer! 🎉\n\nA new event has been added:\n\n${name}\n${description}`
        })

        res.status(201).json({
            _id: newEvent._id,
            name: newEvent.name,
            description: newEvent.description,
            image: newEvent.image,
        })
    } catch (error) {
        console.log("Error in addEvent controller", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const getAllEvents = async(req, res) => {
    try {
        const events = await Event.find().sort({ isCompleted: 1, createdAt: -1 });
        res.status(200).json(events)
    } catch (error) {
        console.log("Error in getAllEvents controller", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const deleteEvent = async(req, res) => {
    const {id} = req.params
    try {
        await Event.findByIdAndDelete({_id: id})
        res.status(200).json({ message: "Event deleted successfully!" })
    } catch (error) {
        console.log("Error in deleteEvent controller", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const updateCompletion = async (req, res) => {
    const { id } = req.params;
    try {
      const event = await Event.findById(id);
      if (!event) return res.status(404).json({ message: "Event not found" });
  
      event.isCompleted = !event.isCompleted;
      await event.save();
  
      res.status(200).json({ message: "Event completion updated", event });
    } catch (error) {
      console.log("Error in updateCompletion controller", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  