const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const { EventEmitter } = require("stream");
const { logged } = require("./middlewares/logEvents");
const { errorEvents } = require("./middlewares/errorLogEvents");
const { subRoutes } = require("./routes/subDir");
const { homeRoutes } = require("./routes/root");
const { employeesRoutes } = require("./routes/api/employees");
const boolParser = require("express-query-boolean");
const { connectDb } = require("./config/mongoConfig");
const { productRoutes } = require("./routes/api/products");
const { authRoutes } = require("./routes/api/auth");
const authentication = require("./middlewares/authentication");
const cookieParser = require("cookie-parser");
const sendMail = require("./nodemailer");
const fs = require("fs");
const handlebars = require("handlebars");

// Node mailer function for sending the mail

//first read the file
const dynamicTemplateFile = fs.readFileSync(
  path.join(__dirname, "templates", "index.htm"),
  "utf-8"
);

//create template with handlebars
const template = handlebars.compile(dynamicTemplateFile);

//pass dynamic parameters that template requires
const htmlOptions = template({ email: "aveshhasnfatta1155@gmail.com" });

//message contains body
const options = {
  from: "avesh.webosmotic@gmail.com",
  to: "aveshhasanfatta1155@gmail.com",
  subject: "Congratulations You've made it!",
  html: htmlOptions,
};

app.get("/send", (req, res) => {
  sendMail(options)
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
});

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

//Custom Middleware
app.use(logged);

//For parse the data we get from the req.body
app.use(express.json());

//for parse the data we get from the content-type - urlencoded x-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//for parse the convert boolean query to value
app.use(boolParser());

//for cookie parser
app.use(cookieParser());

//for cors-origin error

//We can also added cors enable options for allow only for specific domains

// const enabledDomains = ["https://www.google.com"];

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (enabledDomains.includes(origin) || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed By origins CORS"));
//     }
//   },
//   optionsSuccessStatus: 200,
// };

// app.use(cors(corsOptions));

//For all Origins
app.use(cors());

//Serve static file using express
app.use(express.static(path.join(__dirname, "public")));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "views", "index.htm"));
// });

//if any old routes written and want redirect on new or other routes
// app.get("/index", (req, res) => {
//   res.redirect("/");
// });

//Routes
app.use(homeRoutes);
app.use("/sub", subRoutes);
app.use("/auth", authRoutes);
//added JWT Verification middleware
app.use("/employees", authentication, employeesRoutes);
app.use("/products", authentication, productRoutes);

//it will going to able to find the file so it will send 200 response but if you want send manually status or chang status then use res.status()

//Error handling
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: err.status || 500,
    message: err.message,
  });
});

//app.all Is actually use for all type of requests it could be any type of request
//404
app.all("*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.htm"));
});

//For error logs
app.use(errorEvents);

// --------------------------------MONGO--------------------------

connectDb();

app.listen(8000, () => {
  console.log("server connected!");
});

// call route like middleware for Specific path

// app.get(
//   "/check/:id",
//   (req, res, next) => {
//     console.log("id", req.params.id);
//     if (req.params.id === "0") next("route");
//     else next();
//   },
//   (req, res) => {
//     res.send("simple");
//   }
// );

// app.get("/check/:id", (req, res) => {
//   res.send("special");
// });

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

// const one = (req, res, next) => {
//   console.log("enter one");
//   next();
// };

// const two = (req, res, next) => {
//   console.log("enter two");
//   next();
// };
// const three = (req, res) => {
//   res.sendFile(path.join(__dirname, "views", "message.htm"));
// };

// app.get("/message", [one, two, three]);

// app.post("/message", async (req, res) => {
//   //for ON method we have to remove or off the previous event
//   // myEmitter.once("log", (msg) => customLogEvent(msg));
//   // myEmitter.emit("log", req?.body?.userInput);
//   res.send("success");
// });
