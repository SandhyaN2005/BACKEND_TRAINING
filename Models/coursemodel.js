const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseid: {
    type: Number,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  price: {
    type: Number
  }
});

const CourseModel = mongoose.model("course", courseSchema);
module.exports = CourseModel;
