const mongoose = require("mongoose");

const potentialSinkSchema = new mongoose.Schema({
  sink: String,
  value: String,
  outerHTML: String,
  tagName: String,
  event: String,
  framePath: String,
  url: Array,
});

module.exports = mongoose.model("PotentialSink", potentialSinkSchema);
