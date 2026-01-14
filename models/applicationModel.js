const mongoose = require("mongoose");

const applicationSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },

  phoneNumber: {
    type: Number,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  resume: {
    type: String,
    required: true,
  },

  jobId: {
    type: String,
    required: true,
  },

  jobTitle: {
    type: String,
    required: true,
  },

});

const applicationModel = mongoose.model("applications", applicationSchema);

module.exports = applicationModel;
