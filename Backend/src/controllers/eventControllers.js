import Event from "../models/Event.js"
import { notifyVolunteers } from "../lib/utils.js"
import cloudinary from "../lib/cloudinary.js" 

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
            name, 
            description,
            image: uploadResponse?.secure_url || ""
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
        const events = await Event.find()
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

export const updateCompletion = async(req, res) => {
    const {id} = req.params
    try {
        await Event.findByIdAndUpdate({_id: id}, {isCompleted: true})
        res.status(200).json({ message: "Event is completed!" })
    } catch (error) {
        console.log("Error in updateCompletion controller", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}