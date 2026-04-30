import Users from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// =================== GET ACCOUNT ====================
export const getUsers = async (req, res) => {
    try {
        const users = await Users.find();
        res.json(users);
    } catch (error) {
        console.log("Users Error ⚠️");
        console.log(error);
        res.status(500).json({message : "Internal Server Error"});
    }
}


// =================== REGISTER ACCOUNT ====================
export const register = async (req, res) => {
    const {username, password, confPassword} = req.body;
    if (password !== confPassword) return res.status(400).json({msg: "Password and Confirmation Password not same"});
    try {
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);
        await Users.create({
            username: username,
            password: hashPassword
        });
        res.json({username : username, hashPassword});
    } catch (error) {
        console.log("Reqister Error ⚠️");
        console.log(error);
        res.status(500).json({message : "Internal Server Error"});
    }
}

// =================== DELETE ACCOUNT ====================
export const deleteAcc = async (req, res) => {
    const {username, password, confPassword} = req.body;
    if(password !== confPassword) return res.satus(400).json({message : "Password and Confirmation Password not the same"});
    try {
        const user = await Users.findOne({username : username});
        if(!user) return res.status(404).json({message: "User not found"});
        
        const match = await bcrypt.compare(password, user.password);
        if(!match) return res.status(404).json({message: "Wrong Password"});

        const result = await Users.deleteOne({username : username});

        if(result.deletedCount > 0){
            res.json({message : "Delete account is successfully"})
        }else{
            res.status(404).json({message: "Failed to delete, User not found"});
        }

    } catch (error) {
        console.log("Delete Account Error ⚠️");
        console.log(error);
        res.status(500).json({message : "Internal Server Error"});
    }
}

// =================== LOGIN ACCOUNT ====================
export const login = async (req, res) => {
    const SecretKey = process.env.SECRET_KEY;
    try {
        const {username, password} = req.body;
        const users = await Users.findOne({username : username});
        if(!users)return res.status(404).json(({message:"Username not found"}));
        if(!users){
            console.log("Username not found")
        };

        const match = await bcrypt.compare(password, users.password)
        if(!match)return res.status(400).json({message: "Wrong Password!"});

        const userId = users._id;
        const userName = users.username;

        const accessToken =jwt.sign({userId, userName}, SecretKey, {expiresIn: "1d"});
        console.log("Secret Key:", SecretKey);

        res.json({
            message: "Login Succcessfully", accessToken: accessToken
        });
        
    } catch (error) {
        console.log("Login Error ⚠️");
        console.log(error);
        res.status(500).json({message : "Internal Server Error"});
    }
}

export const handleLogout = async (req, res) => {
    try {
        res.status(200).json({message: "Logout successfully"});
    } catch (error) {
        console.log("Logout Error ⚠️");
        console.log(error);
        res.status(500).json({message : "Internal Server Error"});
    }
}