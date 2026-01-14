const applicationModel = require("../models/applicationModel");

exports.ApplyJob = async (req, res) => {
  try {
    let { fullName, email, phoneNumber, jobId, jobTitle } = req.body;

    let resume = req.file.filename;

    let existingApplication = await applicationModel.findOne({ email, jobId });

    if (existingApplication) {
      res.status(409).json({ message: "Already Applied to this Job Role" });
    } else {
      let newApplication = new applicationModel({
        fullName,
        email,
        phoneNumber,
        jobId,
        jobTitle,
        resume,
      });

      await newApplication.save();

      res.status(201).json({ message: "Successfully Applied", newApplication });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong in the server" });
  }
};

exports.getAllApplications = async(req,res)=>{
  try {

    let allApplications = await applicationModel.find()

    res.status(200).json(allApplications)
    
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"Something went wrong in the server"})
  }
}
