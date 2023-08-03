const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const http = require("http");
const bodyParser = require("body-parser");
const { EventEmitter } = require("stream");
const { customLogEvent } = require("./node-events/logEvents");

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

// app.use(bodyParser.json({ limit: "30mb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// app.use(express.json());

app.use(express.json());

//for cors-origin error
// app.use(cors());

//Serve static file using express
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.htm"));
});

app.get("/index", (req, res) => {
  res.redirect("/");
});

//Routes chaining handling just like middle ware next argument, it will just goto the next function

// app.get(
//   "/message",
//   (req, res, next) => {
//     console.log("enter one");
//     next();
//   },
//   (req, res, next) => {
//     console.log("enter two");
//     next();
//   },
//   (req, res) => {
//     res.sendFile(path.join(__dirname, "views", "message.htm"));
//   }
// );

//OR for chaining route handling

const one = (req, res, next) => {
  console.log("enter one");
  next();
};

const two = (req, res, next) => {
  console.log("enter two");
  next();
};
const three = (req, res) => {
  res.sendFile(path.join(__dirname, "views", "message.htm"));
};

app.get("/message", [one, two, three]);

app.post("/message", async (req, res) => {
  //for ON method we have to remove or off the previous event
  console.log("req", req.body);
  myEmitter.once("log", (msg) => customLogEvent(msg));
  myEmitter.emit("log", req?.body?.userInput);
  res.send("success");
});

//it will going to able to find the file so it will send 200 response but if you want send manually status or chang status then use res.status()
app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.htm"));
});

app.listen(8000, () => {
  console.log("server is on");
});
