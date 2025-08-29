import express from "express"
import { signUp, login, logout, updateProfilePic, getActiveVolunteers, checkAuth, addAdminAccount, getAdmins, deleteAccount } from "../controllers/authControllers.js"
import { protectRoute } from "../middlewares/protectRoute.js"

const router = express.Router()

router.post("/signUp", signUp)
router.post("/login", login)
router.post("/logout", logout)
router.post("/updateProfilePic", protectRoute, updateProfilePic)
router.post("/checkAuth", protectRoute, checkAuth)
router.get("/getActiveVolunteers", getActiveVolunteers)
router.post("/addAdminAccount", addAdminAccount)
router.get("/getAdmins", protectRoute, getAdmins)
router.post("/deleteAccount/:id", deleteAccount)

export default router