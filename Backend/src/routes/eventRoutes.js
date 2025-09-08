import express from "express"
import { addEvent, getAllEvents, updateCompletion, deleteEvent } from "../controllers/eventControllers.js"

const router = express.Router()

router.post("/addEvent", addEvent)
router.post("/deleteEvent/:id", deleteEvent)
router.post("/updateCompletion/:id", updateCompletion)
router.get("/getAllEvents", getAllEvents)

export default router