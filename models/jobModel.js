const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
  jobId: {
    type: String,
    required: true,
    unique: true,
  },

  jobRole: {
    type: String,
    required: true,
    unique: true,
  },

  jobDesc: {
    type: String,
    required: true,
    unique: true,
  },

  publishedDate: {
    type: String,
    required: true,
    unique: true,
  },

  lastDate: {
    type: String,
    required: true,
    unique: true,
  },

  salary: {
    type: String,
    required: true,
    unique: true,
  },

  experience: {
    type: String,
    required: true,
    unique: true,
  },
});

const jobModel = new mongoose.model('jobs',jobSchema)

module.exports = jobModel