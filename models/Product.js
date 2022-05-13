const mongoose = require("mongoose");

const Product = mongoose.model("Product", {
  productname: String,
  quantity: Number,
  price: Number,
});

module.exports = Product;
