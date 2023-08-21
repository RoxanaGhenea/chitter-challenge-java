import mongoose from "mongoose";

const peepSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserDetails",
        // required: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
    content: {
        type: String,
        required: true,
    }, 
})

const PeepDetails = mongoose.model(`PeepDetails`, peepSchema);

export default PeepDetails;