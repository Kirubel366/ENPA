import express from "express"
import { addEvent, getAllEvents, updateCompletion, deleteEvent } from "../controllers/eventControllers.js"

const router = express.Router()

router.post("/addEvent", addEvent)
router.post("/deleteEvent", deleteEvent)
router.post("/updateCompletion", updateCompletion)
router.get("/getAllEvents", getAllEvents)

export default router