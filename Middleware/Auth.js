const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const StudentModel = require("../Models/studentmodel");
const auth = async (req,res,next)=>{
    try{
        const {token} = req.cookies;
        console.log(token);
        if(!token){
            return res.json("No token found")
        }
        const decoded = await jwt.verify(token, "BACKEND05");
        console.log(decoded);
        if(!decoded){
            return res.json("no student found")
        }
        const {userId} = decoded;
        const userdata = await StudentModel.findById(userId);
        console.log(userdata);
        if(!userdata){
            return res.json("No user found")
        }
        req.user = userId;
        req.role = userdata.role;
        next();
    } catch(error){
        res.json({message:error.message})
    }
}

module.exports = auth;
