const path = require("path");

console.log(path.dirname(path.resolve("path.js"))); //directory
console.log(path.basename(path.resolve("path.js"))); //main child file name
console.log(path.extname(path.resolve("path.js"))); //file extension
console.log(path.resolve("server.js")); // to find path of any file
