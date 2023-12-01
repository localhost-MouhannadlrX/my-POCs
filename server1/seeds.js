const mongoose = require("mongoose");
const PotentialSink = require("./models/sink.js");
const PotentialSource = require("./models/source.js");
const PotentialMsg = require("./models/msg.js");

mongoose
  .connect("mongodb://localhost:27017/potentials-dom-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!");
    console.log(err);
  });

const seedPotentialSinks = [
  {
    sink: "inner",
    value: "d0mxss",
    outerHTML: "h1",
    tagName: "h2",
    event: "message",
    framePath: "top",
    url: "https://google.com",
  },
];

PotentialSink.insertMany(seedPotentialSinks)
  .then((res) => {
    console.log("yes its insterd!!\n" + res);
  })
  .catch((e) => {
    console.log(e);
  });

const seedPotentialSources = [
  {
    sink: "window.name",
    value: "d0mxss",
    outerHTML: "h1",
    tagName: "h2",
    event: "message",
    framePath: "top",
    url: "https://google.com",
  },
];

PotentialSource.insertMany(seedPotentialSources)
  .then((res) => {
    console.log("yes its insterd!!\n" + res);
  })
  .catch((e) => {
    console.log(e);
  });



  const seedPotentialMsgs = [
    {
        confidence:"haha",
        url: "https://mouhannadlrx.com"
    },
  ];
  
  PotentialMsg.insertMany(seedPotentialMsgs)
    .then((res) => {
      console.log("yes its insterd!!\n" + res);
    })
    .catch((e) => {
      console.log(e);
    });
