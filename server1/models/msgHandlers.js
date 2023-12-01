const mongoose = require("mongoose");


const potentialMsgSchema = new mongoose.Schema({
  confidence:String,
  url: String,
  dataAccessed:Boolean,
  description:Object,
  framePathFrom:String,
  framePathTo:String,
  isInteresting:Boolean,
  eventListener:String,



});


module.exports= mongoose.model("PotentialMsgHandlers", potentialMsgSchema);