import express from "express"
import { signUp, login, logout, getActiveVolunteers, checkAuth, deleteAccount, updateAdminAccount, updateVolunteerAccount } from "../controllers/authControllers.js"
import { protectRoute } from "../middlewares/protectRoute.js"

const router = express.Router()

router.post("/signUp", signUp)
router.post("/login", login)
router.post("/logout", logout)
router.get("/checkAuth", protectRoute, checkAuth)
router.post("/updateAdminAccount", protectRoute, updateAdminAccount)
router.post("/updateVolunteerAccount", protectRoute, updateVolunteerAccount)
router.get("/getActiveVolunteers", getActiveVolunteers)
router.post("/deleteAccount/:id", deleteAccount)

export default router