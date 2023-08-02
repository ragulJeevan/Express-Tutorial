var mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First Name required"]
    },
    lastName: {
        type: String,
        required: [true, "Last Name Required"]
    },
    age: {
        type: Number,
        required: [true, "Age Required"]
    },
    dob: {
        type: String,
        required: [true, "Date of birth required"]
    },
    department: {
        type: String,
        required: [true, "department required"]
    }
});




// var studentSchema = mongoose.Schema({
//     firstName: String,
//     lastName: String,
//     age: Number,
//     dob: String,
//     department: String

// });

var StudentModel = mongoose.model("Student", studentSchema);


module.exports = StudentModel;