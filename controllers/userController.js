const userModel = require("../models/userModel");

exports.getUserDetails = async(req,res)=>{
    try {


        let email = req.user
        let userDetails = await userModel.findOne({email:email})
        res.status(200).json(userDetails)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Something went wrong in the server"})
    }
}


exports.updateProfile = async (req,res)=>{
    try {
        let {id} = req.params

        let {userName,password,bio}= req.body

        let proPic = req.file.filename

        let userDetails = await userModel.findByIdAndUpdate({_id:id},{userName,password,bio,proPic},{new:true})
        res.status(200).json({message:"User details updated successfully",userDetails})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Something went wrong in the server"})
        
    }
}

exports.getAllUsers = async(req,res)=>{
    try {

        let allUsers = await userModel.find({userType:{$ne:'admin'}}).select('-password')
        res.status(200).json(allUsers)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Something went rong in thr server'})
    }
}