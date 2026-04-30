import mongoose from "mongoose";

const techStackSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'Name is required'] },
    icon: {type: String},
    projectId: {type: mongoose.Schema.Types.ObjectId, ref: "Project"}
}, {timestamps: true});

export default mongoose.model("TechStack", techStackSchema);