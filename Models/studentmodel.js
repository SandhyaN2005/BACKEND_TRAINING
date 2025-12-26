const mongoose = require('mongoose');
const validator = require('validator');
const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    dept:{
        type:String
    },
    age:{
        type:Number
    },
    role:{
        type:String,
        required:true,
        enum:['student','admin']
    },
    AssignedCourses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'course'
    }]
},{timestamp:true}
);

const StudentModel = mongoose.model("student", studentSchema)
module.exports = StudentModel;