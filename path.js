const path = require("path");

const someFile = "./fs-text/inside/rename-reply.txt";

console.log(path.dirname(someFile)); //directory
console.log(path.basename(someFile));
console.log(path.extname(someFile)); //file extension
console.log(path.resolve("server.js"));
