import Image from "../models/Image.js"
import multer from "multer";
import path from "path";
import Video from "../models/Video.js";
import { getEmbedUrl } from "../lib/utils.js";
import fs from "fs";
import cloudinary from "../lib/cloudinary.js"

const videoUploadPath = path.join("src", "uploads", "videos");

if (!fs.existsSync(videoUploadPath)) {
  fs.mkdirSync(videoUploadPath, { recursive: true });
}

// Storage configuration for local upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, videoUploadPath); // save inside src/uploads/videos
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const uploadVideo = multer({
  storage,
  limits: { fileSize: 500 * 1024 * 1024 }, 
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("video/")) cb(null, true);
    else cb(new Error("Only video files are allowed!"), false);
  },
});


export const addImage = async (req, res) => {
  const { image, category } = req.body;
  try {
    if (!image || category === "Select Category") return res.status(400).json({ message: "All fields are required!" });

    const uploadResponse = await cloudinary.uploader.upload(image);

    const newImage = new Image({
      category: category.toLowerCase(),
      image: uploadResponse.secure_url,
      public_id: uploadResponse.public_id
    });

    await newImage.save();

    res.status(200).json(newImage);
  } catch (error) {
    console.log("Error in addImage controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const addVideo = async (req, res) => {
  try {
    let videoUrl;
    let filePath;

    if (req.file) {
      videoUrl = `${req.protocol}://${req.get("host")}/uploads/videos/${req.file.filename}`;
      filePath = path.join(videoUploadPath, req.file.filename);
    } else if (req.body.internetVideo) {
      const url = req.body.internetVideo;
      const embedUrl = getEmbedUrl(url);
      if (!embedUrl) return res.status(400).json({ message: "Unsupported video URL!" });
      videoUrl = embedUrl;
    } else {
      return res.status(400).json({ message: "Video is required!" });
    }

    const newVideo = new Video({ video: videoUrl, filePath });
    await newVideo.save();

    res.status(200).json(newVideo);
  } catch (error) {
    console.log("Error in addVideo controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const deleteImage = async (req, res) => {
  const { id } = req.params;
  try {
    const image = await Image.findById(id);
    if (!image) return res.status(404).json({ message: "Image not found" });

    if (image.public_id) {
      await cloudinary.uploader.destroy(image.public_id);
    }

    await Image.findByIdAndDelete(id);
    res.status(200).json({ message: "Image deleted successfully!" });
  } catch (error) {
    console.log("Error in deleteImage controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  try {
    const video = await Video.findById(id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    if (video.filePath) {
      const filePath = path.resolve(video.filePath);
      fs.unlink(filePath, (err) => {
        if (err) console.error("Error deleting video file:", err);
      });
    }

    await Video.findByIdAndDelete(id);
    res.status(200).json({ message: "Video deleted successfully!" });
  } catch (error) {
    console.log("Error in deleteVideo controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllImages = async(req, res) => {
    try {
      const images = await Image.aggregate([
        {
          $addFields: {
            categoryPriority: { $cond: [{ $eq: ["$category", "students"] }, 1, 2] }
          }
        },
        {
          $sort: { categoryPriority: 1, createdAt: -1 }
        }
      ]);        res.status(200).json(images)
    } catch (error) {
        console.log("Error in getAllImages controller", error.message)
        res.status(500).json({ message: "Internal Server Error" }) 
    }
}

export const getAllVideos = async(req, res) => {
    try {
        const videos = await Video.find({}).sort({createdAt: -1 });
        res.status(200).json(videos)
    } catch (error) {
        console.log("Error in getAllVideos controller", error.message)
        res.status(500).json({ message: "Internal Server Error" }) 
    }
}