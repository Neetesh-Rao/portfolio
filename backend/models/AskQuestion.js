const mongoose=require("mongoose");

const askQuestionSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    question:{
        type:String,
        required:true
    },
     question:{
        type:String,
        default:""
    },
      createdAt: {
    type: Date,
    default: Date.now
  }

});
module.exports=mongoose.model("AskQuestion",askQuestionSchema);