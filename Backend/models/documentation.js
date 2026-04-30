import mongoose from "mongoose";

const documentationSchema = new mongoose.Schema({
    name: {type: String},
    imageUrl: {type: String},
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    }
}, {timestamps: true});

export default mongoose.model("Documentation", documentationSchema);