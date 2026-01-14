const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    let userName = req.body.userName;
    let password = req.body.password;
    let email = req.body.email;

    if (userName && password && email) {
      let existingUser = await userModel.findOne({ email: email });
      if (existingUser) {
        res
          .status(409)
          .json({ message: "user with this emailId already registered" }); //means conflict
      } else {
        let newUser = new userModel({ userName, email, password });
        await newUser.save();
        res.status(201).json({ message: "Successfully Registered", newUser });
      }
    } else {
      res.status(400).json9({ message: "please fill the field" });
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong in server" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    let { email } = req.body;
    let { password } = req.body;

    let existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      if (existingUser.password == password) {
        let payload = {
          userName: existingUser.userName,
          email: existingUser.email,
          userType: existingUser.userType,
        };

        let token = jwt.sign(payload, process.env.jwtSecretKey);

        res.status(200).json({ message: "Login Successfull", token, existingUser });
      } else {
        res.status(400).json({ message: "Invalid password" });
      }
    } else {
      res
        .status(400)
        .json({ message: "User with this email is already exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error Occured in server" });
  }
};

exports.googleLoginAPI = async (req, res) => {
  try {
    let { email, userName, proPic } = req.body;

    let existingUser = await userModel.findOne({ email: email });

    if (existingUser) {
      //login Logic

      let payload = {
        userName: existingUser.userName,
        email: existingUser.email,
        userType: existingUser.userType,
      };

      let token = jwt.sign(payload, process.env.jwtSecretKey);

      res.status(200).json({ message: "Login Successfull", token, existingUser});
    } else {
      //register Logic
      let newUser = new userModel({
        userName,
        email,
        password: "googlePswd",
        proPic,
      });
      await newUser.save();


      let payload = {
        userName : newUser.userName,
        email:newUser.email,
        userType:newUser.userType
      }

       let token = jwt.sign(payload, process.env.jwtSecretKey);

        res.status(201).json({ message: "Login Successfull", token });

    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong inthe server.." });
  }
};
