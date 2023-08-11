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
  owner: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Person",
    },
  ],
  //Like if we want to add multiple schema for different products for the owner like if product is 'pizza' it belongs to owner which is Person schema if product is "belt" then it belongs to owner Animal schema dog

  // like we want to add different schemas for different Product.owner

  // owner: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     refPath: "docModal",
  //   },
  // ],
  // docModal: {
  //   type: String,
  //   enum: ["Person"],
  // },
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
