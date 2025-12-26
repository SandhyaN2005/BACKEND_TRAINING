const mongoose = require('mongoose');
const express = require('express');
const app = express();

async function connectDB(){
    await mongoose.connect('mongodb+srv://BACKEND_DB:Sandyyy000@cluster0.mbome5m.mongodb.net/BACKEND')
        .then(()=>{
            console.log("connected")
        
    }).catch((error)=>{
        console.log(error)
    })
}

module.exports = connectDB;