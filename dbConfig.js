// a file to configure database and node.js

const mongoose = require("mongoose");

mongoose
  //added the project name in between /and ?
  .connect(process.env.connectionString)
  .then((res) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });