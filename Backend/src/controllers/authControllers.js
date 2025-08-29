import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/utils.js"
import cloudinary from "../lib/cloudinary.js"

export const signUp = async(req, res) => {
    const {name, email, password, profilePic} = req.body
    try {
        if(!name || !email || !password){
            return res.status(400).json({ message: "All fields are required!" })
        }

        if(password.lenth < 8){
            return res.status(400).json({ message: "Password must have at least 8 characters!" })
        }
        
        const user = await User.findOne({ email })

        if(user){
            return res.status(400).json({ message: "Email already in use!" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        let uploadResponse = ""
        
        if(profilePic){
            uploadResponse = await cloudinary.uploader.upload(profilePic)
        }

        const newUser = new User({
            name, 
            email,
            password: hashedPassword,
            profilePic: uploadResponse?.secure_url || ""
        })

        if(newUser){
            generateToken(newUser._id, res)
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                profilePic: newUser.profilePic,
                role: newUser.role
            })
        } else {
            res.status(400).json({ message: "Invalid user data!" })
        }

    } catch (error) {
        console.log("Error in signup controller", err.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const addAdminAccount = async(req, res) => {
    const {name, email, password, profilePic} = req.body
    try {
        if(!name || !email || !password){
            return res.status(400).json({ message: "All fields are required!" })
        }

        if(password.lenth < 8){
            return res.status(400).json({ message: "Password must have at least 8 characters!" })
        }
        

        const user = await User.findOne({ email })

        if(user){
            return res.status(400).json({ message: "Email already in use!" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        let uploadResponse = ""
        
        if(profilePic){
            uploadResponse = await cloudinary.uploader.upload(profilePic)
        }

        const newUser = new User({
            name, 
            email,
            password: hashedPassword,
            profilePic: uploadResponse?.secure_url || "",
            role: "admin"
        })

        if(newUser){
            generateToken(newUser._id, res)
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                profilePic: newUser.profilePic,
                role: newUser.role
            })
        } else {
            res.status(400).json({ message: "Invalid user data!" })
        }

    } catch (error) {
        console.log("Error in signup controller", err.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const login = async(req, res) => {
    const {email, password} = req.body
    
    try {
        if(!email || !password) {
            return res.status(400).json({ message: "All fields are required!"})
        }

        const user = await User.findOne({email})

        if(!user) {
            return res.status(400).json({message: "Invalid Credentials"})
        }

       const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if(!isPasswordCorrect) {
            return res.status(400).json({message: "Invalid Credentials"})
        }

        generateToken(user._id, res)

        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
            role: user.role
        });
    } catch (error) {
        console.log("Error in login controller", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("token", "", {maxAge:0})
        res.status(200).json({ message: "Logged out successfully" })
    } catch (error) {
        console.log("Error in logout controller", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const updateProfilePic = async(req, res) => {
    try {
        const {profilePic} = req.body
        const userId = req.user._id

        if(!profilePic){
            return res.status(400).json({ message: "Profile pic is required" })
        }
        
        const uploadResponse = await cloudinary.uploader.upload(profilePic)
        const updatedUser = await User.findByIdAndUpdate(userId, {profilePic: uploadResponse.secure_url}, {new:true})

        res.status(200).json(updatedUser)
    } catch (error) {
        console.log("Error in update profile", error);
        res.status(500).json({ message: "Internal server error" })
    }
}

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller", error);
        res.status(500).json({ message: "Internal server error" })
    }
}

export const getAdmins = async(req, res) => {
    const userId = req.user._id
    try {
        const allAdmins = await User.find({role: "admin"})
        const normalAdmins = allAdmins.filter((admin) => admin._id !== userId)

        res.status(200).json(normalAdmins)
    } catch (error) {
        console.log("Error in getAdmins controller", error);
        res.status(500).json({ message: "Internal server error" })
    }
}

export const getActiveVolunteers = async(req, res) => {
    try {
        const activeVolunteers = await User.find({ role: "activeVolunteer" })
        res.status(200).json(activeVolunteers)
    } catch (error) {
        console.log("Error in getAdmins controller", error);
        res.status(500).json({ message: "Internal server error" })
    }
}

export const deleteAccount = async(req, res) => {
    const {id} = req.params
    try {
        await User.findByIdAndDelete({ _id: id })
        res.status(200).json({ message: "Account deleted successfully!" })
    } catch (error) {
        console.log("Error in getAdmins controller", error);
        res.status(500).json({ message: "Internal server error" })
    }
}

