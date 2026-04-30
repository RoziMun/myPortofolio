import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Users from "../models/users.js";

dotenv.config();
export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if(!authHeader){
        return res.status(401).json({message: "Token not found"});
    }
    const token = authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({message: "Token invalid"});
    }
    const SecretKey = process.env.SECRET_KEY;
    jwt.verify(token, SecretKey, (err, user) => {
        if(err)return res.status(403).json({message: "Token invalid or expired"});

        req.user = Users;
        next();
    });

};