import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength: 8
    },
    phone:{
        type: String,
        require: true
    },
    role:{
        type: String,
        default: "activeVolunteer"
    }
}, { timestamps: true })

const user = mongoose.model("User", UserSchema)

export default user