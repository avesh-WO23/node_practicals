const { EventEmitter } = require("node:events");

class Products extends EventEmitter {
  constructor(name) {
    super();
    this.name = name;
    this.order = 0;
  }

  addProduct(number) {
    this.order += number;
    this.emit("add", number);
  }

  displayOrder() {
    console.log(`The product name ${this.name} and Total = ${this.order} `);
  }
}

module.exports = { Products };
