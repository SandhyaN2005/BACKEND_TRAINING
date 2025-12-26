const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const StudentModel = require("../Models/studentmodel");


//login route
router.post("/adminlogin", async(req,res)=>{
    try{
        const {email, password}= req.body;
        const user = await StudentModel.findOne({email:email});
        const verifypassword = await bcrypt.compare(password,user.password)
        if(user.role !== 'admin'){
            return res.json("access denied")
        }
        
        console.log(verifypassword)
        if(verifypassword === false){
            return res.json({message:"invalid credentials"})
        }
        const token = await jwt.sign({userId:user._id}, "BACKEND05")
        res.cookie("token", token)


        res.json(`message:${user.name} login successfully`)
    } catch(error){
        res.json({message:error.message})
    }
})

router.patch("/assigncourse/:studentId", async(req,res)=>{
    try{
        const {studentId} = req.params;
        console.log(studentId);
        const {courseId} = req.body;
        console.log(courseId);
        const student = await StudentModel.findById(studentId);
        if(!student){
            return res.json("no student found")
        }
        const assign = await StudentModel.findByIdAndUpdate(studentId,{AssignedCourses:courseId});
        res.json("course assigned successfully");
    } catch(error){
        res.json({message:error.message})
    }
})

module.exports = router;