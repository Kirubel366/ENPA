import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
import User from "../models/User.js"
import dotenv from "dotenv";
dotenv.config();

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

export const getEmbedUrl = (url) => {
    if (url.includes("youtube.com/watch") || url.includes("youtu.be/")) {
      const videoId = url.includes("youtu.be/")
        ? url.split("youtu.be/")[1].split("?")[0]
        : url.split("v=")[1].split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    } 
    if (url.includes("vimeo.com/")) {
      const videoId = url.split("vimeo.com/")[1].split("?")[0];
      return `https://player.vimeo.com/video/${videoId}`;
    } 
    if (url.includes("tiktok.com/")) {
      const videoId = url.split("/video/")[1].split("?")[0];
      return `https://www.tiktok.com/embed/${videoId}`;
    }
    if (url.includes("facebook.com/")) {
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}`;
    }
    if (url.includes("linkedin.com/")) {
      return url.replace("linkedin.com/posts/", "www.linkedin.com/embed/feed/update/");
    }
    if (url.includes("instagram.com/")) {
      // Instagram embed
      const trimmedUrl = url.split("?")[0]; // remove any query params
      return `${trimmedUrl}embed/`;
    }
    return null; // unsupported
};
  
