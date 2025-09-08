import mongoose from "mongoose"

const VideoSchema = new mongoose.Schema({
    video:{
        type: String,
        required: true,
    },
    filePath: { 
        type: String 
    },
}, { timestamps: true })

const video = mongoose.model("Video", VideoSchema)

export default video