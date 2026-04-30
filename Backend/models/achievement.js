import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema({
    imageAchievement: {type: String},
    nameAchievement: {type: String},
    dateAchievement: {type: Date},
    typeAchievement: {type: String},
}, {timestamps: true});

export default mongoose.model("Achievement", achievementSchema);