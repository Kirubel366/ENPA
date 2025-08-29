import mongoose from "mongoose"

const ImageSchema = new mongoose.Schema({
    category:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true,
    }
}, { timestamps: true })

const image = mongoose.model("Image", ImageSchema)

export default image