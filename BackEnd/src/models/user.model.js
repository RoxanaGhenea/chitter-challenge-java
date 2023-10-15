import mongoose from "mongoose";


const UserDetailsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
        default: "",
    },
})

const UserDetails = mongoose.model(`UserDetails`, UserDetailsSchema);

export default UserDetails;