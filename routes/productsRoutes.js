const router = require("express").Router();
const Product = require("../models/Product");

router.post("/", async (req, res) => {
  const { productname, quantity, price } = req.body;
  if (!productname) {
    res.status(422).json({ message: "O nome do produto é obrigatório !!" });
    return;
  }
  const product = {
    productname,
    quantity,
    price,
  };
  try {
    await Product.create(product);
    res.status(201).json({ message: "Produto inserido com sucesso!!" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/", async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findOne({ _id: id });
    if (!product) {
      res.status(422).json({ message: "O produto não foi encontrado" });
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const { productname, quantity, price } = req.body;
  const product = {
    productname,
    quantity,
    price,
  };
  try {
    const productUpdate = await Product.updateOne({ _id: id }, product);
    if (productUpdate.matchedCount === 0) {
      res.status(422).json({ message: "O produto não foi encontrado" });
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const product = await Product.findOne({ _id: id });
  if (!product) {
    res.status(422).json({ message: "O produto não foi encontrado" });
    return;
  }
  try {
    await Product.deleteOne({ _id: id });
    res.status(200).json({ message: "O produto foi deletado com sucesso" });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
