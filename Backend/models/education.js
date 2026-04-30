import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
    institution: {type: String},
    major: {type: String},
    startDate: {type: Date},
    endDate: {type: Date},
    description: {type: String}
}, {timestamps: true});

export default mongoose.model("Education", educationSchema);