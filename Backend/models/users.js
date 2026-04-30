import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    username: {type: String, require: [true, "username is required"]},
    password: {type: String,require: [true, "password is required"] }
}, {timestamps: true});

export default mongoose.model("Users", usersSchema);