import mongoose from "mongoose";

const projectShcema = new mongoose.Schema({
    thumbnail: {type: String},
    nameProject: {type: String, require: true},
    overview: {type: String},
    feature: {type: String},
    documentation: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Documentation"
    }],
    techStack: [{
        type: mongoose.Schema.Types.ObjectId, ref: "TechStack"
    }],
    duration: {type: String},
    status: [{
        type: String,
        enum: ['Pending', 'Ongoing', 'Complete'],
        default: 'pending'
    }],
    typeProject : {type: String}

}, {timestamps: true});

export default mongoose.model("Project", projectShcema);