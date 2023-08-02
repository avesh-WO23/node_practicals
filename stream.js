//This is preferable way for large chunk of data

const fs = require("fs");

const rs = fs.createReadStream("./fs-text/lorem.txt", "utf-8");

const ws = fs.createWriteStream("./fs-text/new-lorem.txt", "utf-8");

// rs.on("data", (dataChunk) => {
//   ws.write(dataChunk);
// });

//most efficient method
rs.pipe(ws);

//For check directory exist and make or remove folder according to condition

// if (!fs.existsSync("./new")) {
//   fs.mkdir("./new", (err) => {
//     if (err) throw err;
//     console.log("created!");
//   });
// }

// if (fs.existsSync("./new")) {
//   fs.rmdir("./new", (err) => {
//     if (err) throw err;
//     console.log("removed!");
//   });
// }
