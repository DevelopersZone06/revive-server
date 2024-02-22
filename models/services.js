const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: [true, "Description must be provided"],
  },
  duration: {
    type: Number,
  },
  price: {
    type: Number,
    required: true,
  },
  pdf: {
    type: String,
  },
  video: {
    type: String,
  },
  benefit: {
    type: [String],
    required: true
  },
  
  trainer: {
    type: String,
    required: true,
  },
  trainerTitle: {
    type: String,
    required: true,
  },
  trainerImg: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  bmi: {
    type: String,
    required: true,
  },
  serviceImg: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Service', serviceSchema)