import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/utils.js"

export const signUp = async(req, res) => {
    const {name, email, password, phone} = req.body
    try {
        if(!name || !email || !password || !phone){
            return res.status(400).json({ message: "All fields are required!" })
        }

        if(password.length < 8){
            return res.status(400).json({ message: "Password must have at least 8 characters!" })
        }
        
        const user = await User.findOne({ email })

        if(user){
            return res.status(400).json({ message: "Email already in use!" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            name, 
            email,
            password: hashedPassword,
            phone
        })

        if(newUser){
            generateToken(newUser._id, res)
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                phone: newUser.phone,
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


export const addAdminUser = async () => {
    try {
        // Check if an admin already exists
        const existingAdmin = await User.findOne({ role: "admin" });
        if (existingAdmin) {
            console.log("Admin user already exists!");
            return;
        }

        // Manually set your admin details here
        const name = "Admin Name";
        const email = "admin@example.com";
        const password = "StrongPassword123"; // Make sure it's secure
        const phone = "1234567890";

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const adminUser = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            role: "admin" // assign admin role
        });

        await adminUser.save();
        console.log("Admin user created successfully!");
    } catch (err) {
        console.error("Error creating admin user:", err.message);
    }
};

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
            name: user.name,
            email: user.email,
            phone: user.phone,
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

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller", error);
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

export const updateAdminAccount = async (req, res) => {
    const { email, currentPassword, newPassword } = req.body;
    const userId = req.user._id;

    try {
        if (!email && (!currentPassword || !newPassword)) {
            return res.status(400).json({ message: "No new data provided for update!" });
        }

        if (newPassword && newPassword.length < 8) {
            return res.status(400).json({ message: "New password must have at least 8 characters!" });
        }

        // Check email uniqueness if changing email
        if (email) {
            const existingUser = await User.findOne({ email });
            if (existingUser && existingUser._id.toString() !== userId) {
                return res.status(400).json({ message: "Email already in use!" });
            }
        }

        const user = await User.findById(userId);

        // If updating password, compare current password
        if (currentPassword && newPassword) {
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Current password invalid" });
            }
            const hashedNewPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedNewPassword;
        }

        // Update email if provided
        if (email) user.email = email;

        await user.save();
        res.status(200).json(user);
    } catch (error) {
        console.log("Error in updateAdminAccount controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateVolunteerAccount = async(req, res) => {
    const {email, name, phone} = req.body
    const userId = req.user._id
    try {
        if(!email && !name && !phone){
            return res.status(400).json({ message: "No new data provided for update!" })
        }
        
        const existingUser = await User.findOne({ email })

        if(existingUser){
            return res.status(400).json({ message: "Email already in use!" })
        }

        const user = await User.findById({_id: userId})

        const name2 = !name ? user.name : name;
        let email2 = !email ? user.email : email;
        let phone2 = !phone ? user.phone : phone;

        const updatedUser = await User.findByIdAndUpdate({_id: userId},{email: email2, name: name2, phone: phone2},{new:true})
        return res.status(200).json(updatedUser)

    } catch (error) {
        console.log("Error in updateAdminAccount controller", error);
        res.status(500).json({ message: "Internal server error" })
    }
}


