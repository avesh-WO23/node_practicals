const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

//We can create individual methods for every instance of the Product class instances
ProductSchema.methods.sayPrice = function () {
  return `The price of this product is ${this.price}`;
};

//WE can also create our own methods that can available to all the instances for the ProductsSchema
//Create static Methods for the Product Class of the schema
ProductSchema.statics.findByProductName = function (name) {
  return this.where({ name: new RegExp(name, "i") });
};

//If we want to add our own method inside the query which will be chain up with the query
ProductSchema.query.byName = function (name) {
  return this.where({ name });
};

const Product = mongoose.model("product", ProductSchema);

module.exports = { Product };
