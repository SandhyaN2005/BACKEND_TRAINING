const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const CourseModel = require('../Models/coursemodel');
const auth = require('../Middleware/Auth');

router.get('/course', auth, async (req, res) => {
    try{
        const courses = await CourseModel.find();
        res.send(courses);
    }catch(error){
        res.send(error.message);
    }
})
router.post('/add', auth, async (req, res) => {
    try{
    const{id, subject, price} = req.body;
    const newCourse = new CourseModel ({id, subject, price});
    await newCourse.save();
    res.send(newCourse);
    }catch(error){
    res.send(error.message);
    }
});
module.exports = router;