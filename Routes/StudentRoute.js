const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const router = express.Router();
const validator = require('validator');
const StudentModel = require('../Models/studentmodel');
const jwt = require('jsonwebtoken');
const auth = require('../Middleware/Auth');


//signup route
router.post('/signup', async(req,res)=>{
    try{
        const {name, email, password, dept, age, role} = req.body;
        if(!validator.isEmail(email)){
            return res.json("Invalid email")
        }
        if(!validator.isStrongPassword(password)){
            return res.json("Password is not strong")
        }
        const hashedpassword = await bcrypt.hash(password,10);
        const signupstudent = new StudentModel({
            name,
            email,
            password:hashedpassword,
            dept,
            role,
            age
        })
        await signupstudent.save();
        res.json({message:"student registered successfully", data:signupstudent})
    } catch(error){
        res.json({message:error.message})
    }
})

//login route
router.post("/login", async(req,res)=>{
    try{
        const {email, password}= req.body;
        const user = await StudentModel.findOne({email:email});
        const verifypassword = await bcrypt.compare(password,user.password)
        if(user.role !== 'student'){
            return res.json("access denied")
        }
        
        console.log(verifypassword)
        if(verifypassword === false){
            return res.json({message:"invalid credentials"})
        }
        const token = await jwt.sign({userId:user._id}, "BACKEND05")
        console.log(token)
        res.cookie("token", token)
        res.json(`message:${user.name} login successfully`)
    } catch(error){
        res.json({message:error.message})
    }
})

router.get('/get',auth, (req, res) => {
    console.log("get method")
    res.send("get");
});

router.get('/student', auth, async (req, res) => {
    try{
        

        const students = await StudentModel.find();
        if(!students){
            return res.json({message:"no students found"})
        }
        res.send({message:"students found", data:students});
    }catch(error){
        res.send({message:error.message});
    }
});

//get student by id
router .get("/student/:ids", async (req, res) => {
    try{
        const loggeduser = req.user;
        console.log(loggeduser);
        const {ids} = req.params;
        const student = await StudentModel.findById(ids);
        if(!student){
            return res.json({message:"no student found"})
        }
        res.json({message:"student found", data:student});
    }catch(error){
        res.json({message:error.message})
    }
})


router.get("/studentcourse/:studentId", async (req, res) => {
    try{
        const {studentId} = req.params;
        const data = await StudentModel.findById(studentId).populate("AssignedCourses");
        res.json({message:"student courses", data:data})
    }catch(error){
        res.json({message:error.message})
    }
})

// router.post("/add", async (req, res) => {
//     try{
//     const {name, email,dept, age} = req.body;
//     const newStudent = new StudentModel({name, email, dept, age})
//     await newStudent.save();
//     res.send(newStudent);
// }catch(error){
//     res.send(error.message);
//     }
// });
router.put('/replace/:ids', auth, async(req,res)=>{
    try{
        const loggeduser = req.user;
        console.log(loggeduser);
        const {ids}= req.params;
        const {name, email, dept, age} = req.body;
        const updated = await StudentModel.findByIdAndUpdate(ids, {name, email, dept, age}, {new:true})
        res.json({message:"updated successfully", data:updated})
    } catch(error){
        res.json({message:error.message})
    }
})

router.delete('/delete/:ids', auth, async (req,res)=>{
    try{
        const loggeduser = req.user;
        console.log(loggeduser);
        const {ids}= req.params;
        const deleted = await StudentModel.findByIdAndDelete(ids);
        if(!deleted){
            return res.json({message:"no student found"})
        }
        
        res.json({message:"student deleted",data:deleted.name});
    }catch(error){
        res.json({message:error.message});
    }
    
});

module.exports = router;