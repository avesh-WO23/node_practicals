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
      console.log("queries", req.query);
      const products = await Product.find({ $or: [] });
      return res.send(products);
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
    return res.status(404).send("Not Found!");
  }
};

module.exports = {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
};
