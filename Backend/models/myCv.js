import mongoose from "mongoose";

const myCvSchema = new mongoose.Schema({
    pdf: {type: String}
}, {timestamps: true});

export default mongoose.model("MyCv", myCvSchema);