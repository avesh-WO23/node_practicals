const EventEmitter = require("events");

const myEmitter = new EventEmitter();

// on / addEventListener
//off / removeEventListener
//emit / for calling or emit the event

// const functionOne = () => {
//   console.log("function one occured");
// };

// const functionTwo = () => {
//   console.log("function two occured");
// };

// myEmitter.on("event1", functionOne);

myEmitter.on("event1", () => {
  console.log("do event 1");
});

myEmitter.on("event2", () => {
  console.log("do event 2");
});

//For Call the Event
// myEmitter.emit("event1");

//For fire the event for only once

// myEmitter.once("eventOnce", () => {
//   console.log("do event for once");
// });

//It will fire event for only one
// myEmitter.emit("eventOnce");
// myEmitter.emit("eventOnce");
