const collegeModel = require("../../../Project-2-College_Internship/src/models/collegeModels");
const internModel = require("../../../Project-2-College_Internship/src/models/internModel");
const mongoose = require("mongoose");

/////////////////// createIntern ////////////////////////////////////////////////////

const createIntern = async function (req, res) {
  try {
    let reqData = req.body;
    let { name, mobile, email } = { ...reqData };
    let Name = req.body.collegeName;

    let data = await collegeModel.findOne({ name: Name });
    if (!data) {
      return res.status(400).send({ status: false, msg: "College not exist" });
    }
    let collegeId = data["_id"];

    let toCreateIntern = { name, mobile, email, collegeId };
    let savedData = await internModel.create(toCreateIntern);

    res.status(201).send({ status: true, data: savedData });
  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};

//////////////////// getCollegeIntern ///////////////////

const getcollegeIntern = async function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  try {
    const collegeName = req.query.collegeName;
    if (!collegeName) return res.status(404).send({ status: false, msg: "Please send collegeName from queries" });

    let collegeDetails = await collegeModel.findOne({ name: collegeName, isDeleted: false });
    if (!collegeDetails) { return res.status(404).send({ status: "false", msg: "College not exist" })}

    let objectOfCollegeDetails = collegeDetails.toObject();

    let { name, fullName, logoLink } = { ...objectOfCollegeDetails };

    let internDetails = await internModel.find({ collegeId: collegeDetails._id, isDeleted: false }).select({ name: 1, email: 1, mobile: 1 });
    if (!internDetails[0]) { return res.status(404).send({ status: "false", msg: "No intern applied for this college" })}

    let internsOf_a_College = { name, fullName, logoLink, interns: internDetails };

    return res.status(200).send({ status: true, data: internsOf_a_College });
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

module.exports = { createIntern, getcollegeIntern };