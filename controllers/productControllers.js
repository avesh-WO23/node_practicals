const { Product } = require("../models/productSchema");

//Get Products
const getProducts = async (req, res) => {
  try {
    // const allProducts = await Product.find(
    //   {
    //     /*queries*/
    //   },
    //   {
    //     /* if we want to omit or want any specific value field from the product then this projection object will use in this case if i want only name */
    //     name: 1,
    //     _id: 0,
    //   }
    // );

    if (!Object.keys(req.params).length && !Object.keys(req.query).length) {
      const allProducts = await Product.find();
      return res.status(200).send(allProducts);
    } else {
      const { id } = req.params;
      if (id) {
        //for params
        const getSingleProduct = await Product.findById(id);
        return res.status(200).send(getSingleProduct);
      }
      //for query
      const queryObj = {};
      for (let key in req.query) {
        if (req.query[key]) {
          queryObj[key] = req.query[key];
        }
      }

      //My Own custom method added inside the schema of the product
      // const products = await Product.findByProductName(req.query.name);

      //We can also create our own Custom mongoose query with where method
      // const products = await Product.where("price").lt(10);

      //We can also create our method that add inside the query
      // const products = await Product.find().byName(queryObj.name);

      //If we want to get specific field to populate
      // const products = await Product.find(queryObj).populate(
      //   "owner",
      //   "firstName lastName"
      // );

      //If we want to execute specific field and also want to add extra query inside the populate like for the filter for want specific document.
      const products = await Product.find(queryObj).populate({
        path: "owner",
        select: "lastName",
        //Added query
        match: {
          $and: [
            { firstName: { $eq: "user" } },
            { hobbies: { $in: ["sports"] } },
          ],
        },
      });
      return res.send(products);
      // products.owner = owner;

      //Custom created method for each instance in the product schema
      // console.log(products[0].sayPrice());
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
};

//Add Product
const addProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const result = await newProduct.save();
    //For specific what type of your model want add for populate
    // const result = await Product.create({
    //   ...req.body,
    //   docModal: "Person",
    // });
    res.status(201).send(result);
  } catch (error) {
    res.send(error.message);
  }
};

//Update the Product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.send(updatedProduct);
  } catch (error) {
    return res.send(error.message);
  }
};

//Delete The Product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      await Product.findByIdAndDelete(id);
      return res.send("Successfully Deleted!");
    }
  } catch (error) {
    return res.status(404).send(error.message);
  }
};

module.exports = {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
};
