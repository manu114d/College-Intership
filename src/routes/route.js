const express =require("express");
const router= express.Router();
const {collegeValidation, internValidation, } = require("../validator/validator")
const {createCollege} = require("../controllers/collegeController")
const {createIntern, getcollegeIntern} = require("../controllers/internController")



router.post("/functionup/colleges", collegeValidation, createCollege )// API for Creation of Author

router.post("/functionup/interns",internValidation, createIntern )// API for Creation of Author

router.get("/functionup/collegeDetails", getcollegeIntern)// API for Creation of Author


module.exports= router;