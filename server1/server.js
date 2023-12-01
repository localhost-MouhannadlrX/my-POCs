const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");
const PotentialSinks = require("./models/sink");
const PotentialSources = require("./models/source.js");
const PotentialMsgs = require("./models/msg.js");
const PotentialMsgHandlers = require("./models/msgHandlers.js");
const blackListedSourceUrl = function blackListedSourceUrl(url) {
  const black_prefixes = ["https://www.recaptcha", "https://www.google.com/"];

  for (let i = 0; i < black_prefixes.length; i++)
    if (
      url.startsWith(black_prefixes[i]) ||
      /^https?:\/\/[^/]*(google|googlesyndication)\.com\//.test(url)
    )
      return true;

  return false;
};
const blackListedSourceValue = function blackListedSourceUrl(value) {
  const black_prefixes = ["dsq-app"];

  for (let i = 0; i < black_prefixes.length; i++)
    if (value.startsWith(black_prefixes[i])) return true;

  return false;
};

const blackListedSinkValue = function blackListedSinkValue(value) {
  const black_prefixesValues = ["[0,12,2,0,11,2", "apiproxy"];
  for (let i = 0; i < black_prefixesValues.length; i++)
    if (value.startsWith(black_prefixesValues[i])) return true;

  return false;
};

const interstingSinks = [
  "jQuery.add",
  "form.action",
  "element.setAttribute.src",
  "jQuery.attr.src",
];
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/potentials-dom-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the DB!!!");
  });

app.listen(3000, () => {});

app.get("/get-urls", async (req, res) => {
  var ourFile = await fs.readFileSync("/root/Desktop/rest-shufled.txt", "utf8");
  var urls = await ourFile.split(/\r?\n/);
  var ob = { ...urls };
  res.send(ob);
});

app.post("/", async (req, res) => {
  body = req.body;
  // console.log(body)
  delete body.stackTrace;
  delete body.canary;
  body.url = body.url.replace(
    /d0mxsslocation.href|d0mxsslocation.search|d0mxsslocation.hash/g,
    ""
  );
  if (body.sink && !blackListedSinkValue(body.value)) {
    let isExist = await PotentialSinks.find({ value: body.value });
    if (!isExist.length) {
      const newPotentialSink = new PotentialSinks(req.body);
      newPotentialSink.save()
    } else {
      let toUpdate = await PotentialSinks.find({ value: body.value });
      toUpdate = toUpdate[0]
        ? toUpdate[0].url
        : toUpdate.url
        ? toUpdate.url
        : [];

      if (!toUpdate.includes(body.url)) {
        toUpdate.push(body.url);

        let doc = await PotentialSinks.findOneAndUpdate(
          { value: body.value },
          { url: toUpdate },
          {
            new: true,
          }
        );
        // if (!doc)
        //   console.error(
        //     "documnet NOT updated !!! for this url : " + body.url 
        //   );
      }
    }
  }

  if (
    body.source &&
    !blackListedSourceUrl(body.url) &&
    !(blackListedSourceValue(body.value) && body.source == "window.name")
  ) {
    let isExist = await PotentialSources.find({ value: body.value });
    if (!isExist.length) {
      const newPotentialSource = new PotentialSources(req.body);
      newPotentialSource.save()
    } else {
      let toUpdate = await PotentialSources.find({ value: body.value });
      toUpdate = toUpdate[0]
        ? toUpdate[0].url
        : toUpdate.url
        ? toUpdate.url
        : [];

      if (!toUpdate.includes(body.url)) {
        toUpdate.push(body.url);

        let doc = await PotentialSources.findOneAndUpdate(
          { value: body.value },
          { url: toUpdate },
          {
            new: true,
          }
        );
      //   if (!doc)
      //     console.error(
      //       "documnet Source NOT updated !!! for this url : " + body.url           );
      }
    }
  }
  if (body.confidence && body.isInteresting) {
    let ob = {
      url: body.url,
      confidence: body.confidence,
    };
    const newPotentialMsg = new PotentialMsgs(ob);
    newPotentialMsg
      .save()
      .then(() => {
        console.log(
          "//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// \n\
          //////////////////////////////////////// Certain Message saved////////////////////////////////////////\n\
          ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////"
        );
        console.log(ob);
      })
      .catch((e) => {
        console.log(
          " intersting message not saved for this url : " + body.url + "\n" + e
        );
      });
    // }
  }
  if (body.confidence) {
    let isExist = await PotentialMsgHandlers.find({
      eventListener: body.eventListener,
    });
    if (!isExist.length) {
      const newPotentialMsgHandler = new PotentialMsgHandlers(req.body);
      newPotentialMsgHandler
        .save()
  
      // }
    }
  }


}
)
