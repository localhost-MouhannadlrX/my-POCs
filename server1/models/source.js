const mongoose = require("mongoose");

const potentialSourceSchema = new mongoose.Schema({
  source: String,
  value: String,
  event: String,
  framePath: String,
  url: Array,
});

module.exports = mongoose.model("potentialSources", potentialSourceSchema);

