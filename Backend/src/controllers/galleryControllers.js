import Image from "../models/Image.js"
import Video from "../models/Video.js"
import cloudinary from "../lib/cloudinary.js"


export const addImage = async() => {
    const {image, category} = req.body
    try {
        if(!image || !category) return res.status(400).json({ message: "All fields are required!" })

        const uploadResponse = await cloudinary.uploader.upload(image)
        
        const newImage = new Image({
            category,
            image: uploadResponse.secure_url
        })

        newImage.save()

        res.status(200).json(newImage)
    } catch (error) {
        console.log("Error in addEvent controller", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const addVideo = async (req, res) => {
    const { video, category } = req.body
    try {
        if (!video || !category) {
            return res.status(400).json({ message: "All fields are required!" })
        }

        let videoUrl

        const urlRegex = /^https?:\/\/[^\s]+$/
        if (urlRegex.test(video)) {
            videoUrl = video
        } else {
            const uploadResponse = await cloudinary.uploader.upload(video, {
                resource_type: "video",
            })
            videoUrl = uploadResponse.secure_url
        }

        const newVideo = new Video({
            category,
            video: videoUrl,
        })

        await newVideo.save()

        res.status(200).json(newVideo)
    } catch (error) {
        console.log("Error in addVideo controller:", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}


export const getAllImages = async() => {
    try {
        const images = await Image.find({})
        res.status(200).json(images)
    } catch (error) {
        console.log("Error in getAllImages controller", error.message)
        res.status(500).json({ message: "Internal Server Error" }) 
    }
}

export const getAllVideos = async() => {
    try {
        const videos = await Video.find({})
        res.status(200).json(videos)
    } catch (error) {
        console.log("Error in getAllVideos controller", error.message)
        res.status(500).json({ message: "Internal Server Error" }) 
    }
}