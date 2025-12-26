const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./Connection/Connect');
const cookieParser = require('cookie-parser');
const app = express();
app.use(express.json());
app.use(cookieParser());

const studentRoute = require('./Routes/StudentRoute');
const courseRoute = require('./Routes/CourseRoute');
const adminRoute = require('./Routes/AdminRoute');
app.use('/courses', courseRoute);
app.use('/students', studentRoute);
app.use('/admin', adminRoute);
connectDB().then(() => {
    app.listen(5555, () => {
        console.log("http://localhost:5555");
    });
});