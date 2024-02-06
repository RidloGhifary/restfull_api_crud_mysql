const express = require("express");
const {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  editProduct,
  deleteProductById,
} = require("./products.service.js");

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await getAllProducts();
  res
    .status(200)
    .json({ status: 200, message: "Success getting datas", datas: products });
});

router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await getProductById(productId);

    res
      .status(200)
      .json({ status: 200, message: "Success get product", product });
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const productsData = req.body;
    const product = await addProduct(productsData);

    res.status(200).json({ message: "Success added data", product });
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const productsData = req.body;
    const product = await updateProduct(productId, productsData);

    res.status(200).json({ message: "Success update data", product });
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const productsData = req.body;

    const product = await editProduct(productId, productsData);

    res.status(200).json({ message: "Success update data", product });
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    await deleteProductById(productId);

    res.status(200).json({ messages: "Success deleted data" });
  } catch (err) {
    res.status(404).json({ status: 400, message: err.message });
  }
});

module.exports = router;
