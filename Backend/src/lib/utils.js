import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
import User from "../models/User.js"

export const generateToken = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })

    res.cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // MS
        httpOnly: true, // prevent XSS attacks cross-site scripting attacks
        sameSite: "strict", // CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development"
    })

    return token;
}

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
})

export const sendEmail = async ({ from, to, subject, html, bcc }) => {
    try {
        await transporter.sendMail({ from, to, bcc, subject, html })
        return { success: true }
    } catch (error) {
        console.error("Error sending email:", error.message)
        return { success: false, error }
    }
}

export const notifyVolunteers = async ({ subject, message }) => {
    try {
        const volunteers = await User.find({ role: "activeVolunteer" })
        if (!volunteers.length) return

        const emails = volunteers.map(v => v.email)

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            bcc: emails,
            subject,
            html: `<p>${message}</p>`,
        })
    } catch (error) {
        console.error("Error notifying volunteers:", error.message)
    }
}
