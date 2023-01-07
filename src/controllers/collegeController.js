const collegeModel = require("models/collegeModels")



const createCollege = async function(req,res){
    try {
        let reqData = req.body
        
        let savedData = await collegeModel.create(reqData)

        res.status(201).send({ status: true, data: savedData });
        
    } catch (error) {
        res.status(500).send({ status: false, error: error.message });
    }

}

module.exports = { createCollege }