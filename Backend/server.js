import express from "express"
import {connectDB} from "./src/lib/db.js"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import path from "path"

import authRoutes from "./src/routes/authRouter.js"
import eventRoutes from "./src/routes/eventRoutes.js"
import galleryRoutes from "./src/routes/galleryRoutes.js"
import { sendEmail, notifyVolunteers } from "./src/lib/utils.js"
import { fileURLToPath } from "url";
import { addAdminUser } from "./src/controllers/authControllers.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config()

const app = express()

app.use(express.json({ limit: "20mb" })); 
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/event", eventRoutes)
app.use("/api/gallery", galleryRoutes)
app.use("/uploads", express.static(path.join(process.cwd(), "src/uploads"), {
    setHeaders: (res, filePath) => {
      // explicitly set correct MIME type for mp4
      if (path.extname(filePath) === ".mp4") {
        res.setHeader("Content-Type", "video/mp4");
        res.setHeader("Content-Disposition", "inline"); // make browser play instead of download
      }
    }
  }));
  
app.get("/", (req, res) => {
    res.send("Welcome Home")
})

app.post("/api/sendemail", async (req, res) => {
    const { name, email, message } = req.body
    if (!name || !email || !message) {
        return res.status(400).json({ message: "All fields are required!" })
    }

    const result = await sendEmail({
        from: email,
        to: "kaleb.enpa@gmail.com",
        subject: `New Contact Form Submission from ${name}`,
        html: `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong> ${message}</p>
        `,
    })

    if (result.success) {
        res.status(200).json({ message: "Email sent successfully!" })
    } else {
        res.status(500).json({ message: "Error sending email." })
    }
})

app.post("/api/sendFooterEmail", async (req, res) => {
    const { email, message } = req.body
    if (!email || !message) {
        return res.status(400).json({ message: "All fields are required!" })
    }

    const result = await sendEmail({
        from: email,
        to: "kaleb.enpa@gmail.com",
        subject: `You Have a Message From ${email}`,
        html: `
            <p><strong>Message:</strong> ${message}</p>
        `,
    })

    if (result.success) {
        res.status(200).json({ message: "Email sent successfully!" })
    } else {
        res.status(500).json({ message: "Error sending email." })
    }
})

app.post("/api/notify-volunteers", async (req, res) => {
    const { subject, message } = req.body
    try {
        await notifyVolunteers({ subject, message })
        res.status(200).json({ message: "Emails sent successfully to volunteers" })
    } catch {
        res.status(500).json({ message: "Internal Server Error" })
    }
})

//addAdminUser()

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    connectDB()
})
