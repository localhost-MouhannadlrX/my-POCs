const mongoose = require("mongoose");


const potentialMsgSchema = new mongoose.Schema({
  confidence:String,
  url: String
});


module.exports= mongoose.model("PotentialMsgs", potentialMsgSchema);