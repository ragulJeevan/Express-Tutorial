var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
const studentModel = require('../models/student-model');


// TO ADD STUDENT 
router.post("/addStudent", async (req, res) => {
    // TRY CATCH METHOD 
    try {
        // INSTANCE STUDENT MODEL 
        let newStudent = new studentModel(req.body);
        // METHID TO ADD 
        await newStudent.save()
            .then((savedStudent) => {
                console.log(savedStudent);
                // SEND OBJECT 
                res.status(200).json({ statusMessage: "Student Added successfully", studentObject: newStudent })
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ errorMessage: "Unable to create Student" });
            });
    }
    catch (error) {
        console.log(error);

    }

});

// TO GET STUDENT 

router.get('/getStudent', async (req, res) => {
    try {
        // STUDENT MODEL FROM MODELS AND FIND ALL DATA 
        studentModel.find()
            .then((students) => {
                console.log(students);
                // SEND OBJECTS 
                res.status(200).json({ statysMessage: "Students Details Provided", Students: students });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({ errorMessage: "Unable to fetch students" });
            });
    }
    catch (error) {
        console.log(error);

    }
})

// GET STUDENT BY ID 
router.get('/getStudent/:id', async (req, res) => {
    try {
        // GET THE ID FORM URL 
        const id = req.params.id;
        // FIND DATA BY ID 
        studentModel.findById(id)
            .then((students) => {
                console.log(students);
                res.status(200).json({ statysMessage: "Students Details Provided", Students: students });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({ errorMessage: "Unable to fetch students" });
            });
    }
    catch (error) {
        console.log(error);

    }
});

// SEARCH STUDENT 
router.get('/searchStudent', async (req, res) => {
    try {
        // get the search term from the url //
        const searchTerm = req.query.searchTerm;
        // for searching all texts \\
        const searchRegex = new RegExp(searchTerm, 'i');
        // logic for search //
        const searchedStudent = await studentModel.find({
            // or condition to search //
            $or: [
                { firstName: searchRegex },
                { lastName: searchRegex },
                { department: searchRegex }
            ]
        })
            .then((students) => {
                res.status(200).json({ statusMessage: "students details provided", Students: students });
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json({ erroMessage: "No Data Found" });
            })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ errorMessage: "Error" });
    }
})


// UPDATE STUDENT 
router.put('/updateStudent/:id', async (req, res) => {
    try {
        // GET ID IN URL FOR PICKING PARTICULAR RECORD TO UPDATE 
        const id = req.params.id;
        //  FETCHED DATA 
        const fetchedStudent = req.body;
        // METHOD TO UODATE THE PARTICULAR DATA 
        const updatedStudent = await studentModel.findOneAndUpdate({ _id: id }, fetchedStudent, { new: true })
            //METHOD TO EXECUTE THE UPDATED DATA 
            .then((updStudent) => {
                res.status(200).json({ statusMessage: "STudent Updated Succesfully", updatedData: updStudent });
            })
            // TO CATCH ERROR 
            .catch((err) => {
                console.log(err);
                // TO SEND CATCHED ERROR 
                res.status({ erroMessage: "Failed To Update", reason: err });
            })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ erroMessage: "Unable to update", data: error.erroMessage });
    }
})
// DELETE STUDENT 

router.delete('/deleteStudent/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await studentModel.findByIdAndDelete(id)
            .then((deletedStudent) => {
                res.status(200).json({ statusMessage: "Student Deleted Succesfully", Student: deletedStudent });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({ erroMessage: "Unable to delete please try again", data: err });
            })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ errorMessage: "Unable to delete" });
    }
})

module.exports = router;
