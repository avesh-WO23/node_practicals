const http = require("http");
const uc = require("upper-case");
const fs = require("fs");
const path = require("path");
const calc = require("./export-module/calculation");
const fsPromises = require("fs").promises;
const { customLogEvent } = require("./middlewares/logEvents");
const EventEmitter = require("events");
const { Products } = require("./products");

//CReate basic http server
// http
//   .createServer((req, res) => {
//     res.writeHead(200, { "Content-Type": "text/html" });
//     res.write(uc.upperCase("Hello World!"));
//     res.end();
//   })
//   .listen(8080);

//FS module

//It gives the data in buffer format if we didn't mention encoded system
// fs.readFile("./fs-text/index.txt", (err, data) => {
//   console.log("data", data.toString());
// });

//mention encoded system
// fs.readFile("./fs-text/index.txt", "utf8", (err, data) => {
//   console.log(data);
// });

//Path

//Global variable for the path __dirname that give current path of the file

//Read file

// fs.readFile(
//   path.join(__dirname, "fs-text", "inside", "index.txt"),
//   "utf8",
//   (err, data) => {
//     if (err) throw err;
//     console.log("path", data);
//   }
// );

//Write file

// const addData = "hey added some data";

// fs.writeFile(
//   path.join(__dirname, "fs-text", "inside", "index.txt"),

//   addData,
//   (err) => {
//     if (err) throw err;
//     console.log("Write complete");
//   }
// );

//Append file is use to update existin file or create file if doesn't exist

// fs.appendFile(
//   path.join(__dirname, "fs-text", "inside", "index.txt"),

//   " (appended new data)",
//   (err) => {
//     if (err) throw err;
//     console.log("Append complete");
//   }
// );

//fs Callbacks

// fs.writeFile(
//   path.join(__dirname, "fs-text", "inside", "reply.txt"),
//   "Enter in Reply file",
//   (err) => {
//     if (err) throw err;
//     console.log("written Reply file");

//     fs.appendFile(
//       path.join(__dirname, "fs-text", "inside", "reply.txt"),
//       "\n\n Append some new data in reply file",
//       (err) => {
//         if (err) throw err;
//         console.log("Append reply file");

//         fs.rename(
//           path.join(__dirname, "fs-text", "inside", "reply.txt"),
//           path.join(__dirname, "fs-text", "inside", "rename-reply.txt"),
//           (err) => {
//             if (err) throw err;
//             console.log("Rename reply file");
//           }
//         );
//       }
//     );
//   }
// );

// fs promisses we can control the flow of the operations and code will look more clear in promises
// const fsOperations = async () => {
//   try {
//     const data = await fsPromises.readFile(
//       path.join(__dirname, "fs-text", "file.txt"),
//       "utf-8"
//     );
//     await fsPromises.writeFile(
//       path.join(__dirname, "fs-text", "index.txt"),
//       `Copied from file.txt: ${data}`
//     );
//     await fsPromises.appendFile(
//       path.join(__dirname, "fs-text", "index.txt"),
//       "\n Append some new Data"
//     );
//     await fsPromises.rename(
//       path.join(__dirname, "fs-text", "index.txt"),
//       path.join(__dirname, "fs-text", "changeIndex.txt")
//     );
//     const newData = await fsPromises.readFile(
//       path.join(__dirname, "fs-text", "changeIndex.txt"),
//       "utf-8"
//     );
//     console.log("newData", newData);
//     //Delete the file in fs module
//     await fsPromises.unlink(
//       path.join(__dirname, "fs-text", "inside", "index.txt")
//     );
//   } catch (error) {
//     if (error) throw error;
//   }
// };

// fsOperations();

//Export module
// const x = 10;
// const y = 2;

// console.log(calc.add(x, y));
// console.log(calc.sub(x, y));
// console.log(calc.mul(x, y));
// console.log(calc.div(x, y));

//Buffer

// const b = Buffer.alloc(5);
// console.log(b.fill(22));

//Custom LogEvent practical

// class MyEmitter extends EventEmitter {}

//Use instance of our class and initialize the object
// const myEmitter = new MyEmitter();

// //add event listener for the logs
// myEmitter.on("log", (msg) => customLogEvent(msg));

// setTimeout(() => {
//   //emit the event
//   myEmitter.emit("log", "this my first log");
// }, 2000);

//for product - 1
const myProduct = new Products();
myProduct.name = "watch";

//Event emit listener it will call as per the number of emit will be called in class products.
myProduct.on("add", (number) => {
  console.log(`order received ${number}`);
});

myProduct.addProduct(2);
myProduct.displayOrder();

//for product - 2

const shoes = new Products();
shoes.name = "Air Jordan";

//listener
shoes.on("add", (number) => {
  console.log(`order received! shoes order ${number} pair`);
});

shoes.addProduct(2);
shoes.displayOrder();
