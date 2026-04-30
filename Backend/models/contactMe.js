import mongoose from "mongoose";

const contactMeSchema = new mongoose.Schema({
    yourName: {type: String, require: [true, "yourname is required"]},
    email: {type: String, require: [true, "email is required"]},
    subject: {type: String},
    message: {type: String, require: [true, "message is required"]},
}, {timestamps: true});

export default mongoose.model("ContactMe", contactMeSchema);