const mongoose = require("mongoose");

const dsaQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },

  options: {
    type: [String],
    required: true
  },

  correctAnswer: {
    type: Number, // option index (0,1,2,3)
    required: true
  },

  explanation: {
    type: String
  },

  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "easy"
  }
});

module.exports = mongoose.model("DSAQuestion", dsaQuestionSchema);