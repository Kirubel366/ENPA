import express from "express"
import { addImage, addVideo, getAllImages, getAllVideos, deleteImage, deleteVideo, uploadVideo } from "../controllers/galleryControllers.js"

const router = express.Router()

router.post("/addImage", addImage)
router.post("/addVideo", uploadVideo.single("deviceVideo"), addVideo)
router.post("/deleteImage/:id", deleteImage)
router.post("/deleteVideo/:id", deleteVideo)
router.get("/getAllImages", getAllImages)
router.get("/getAllVideos", getAllVideos)

export default router