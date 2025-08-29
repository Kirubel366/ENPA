import express from "express"
import { addImage, addVideo, getAllImages, getAllVideos } from "../controllers/galleryControllers.js"

const router = express.Router()

router.post("/addImage", addImage)
router.post("/addVideo", addVideo)
router.get("/getAllImages", getAllImages)
router.get("/getAllVideos", getAllVideos)

export default router