const express = require("express");
const prisma = require("../database/prisma.js");
const {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  editProduct,
  deleteProduct,
} = require("./products.service.js");

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await getAllProducts();
  res
    .status(200)
    .json({ status: 200, message: "Success getting datas", datas: products });
});

router.get("/:id", async (req, res) => {
  const productId = req.params.id;
  const product = await getProductById(productId);

  if (!product)
    res
      .status(404)
      .json({ status: 404, message: "Cannot find product", product: {} });

  res
    .status(200)
    .json({ status: 200, message: "Success get product", product });
});

router.post("/", async (req, res) => {
  const productsData = req.body;
  const product = await addProduct(productsData);

  if (product.status === 404)
    res.status(404).json({ status: 404, message: "Failed added data" });

  res.status(200).json({ message: "Success added data", product });
});

router.put("/:id", async (req, res) => {
  const productId = req.params.id;
  const productsData = req.body;
  const product = await updateProduct(productId, productsData);

  if (product.status === 400)
    res.status(400).json({ status: 400, message: "Failed update data" });

  res.status(200).json({ message: "Success update data", product });
});

router.patch("/:id", async (req, res) => {
  const productId = req.params.id;
  const productsData = req.body;

  const product = await editProduct(productId, productsData);

  res.status(200).json({ message: "Success update data", product });
});

router.delete("/:id", async (req, res) => {
  const productId = req.params.id;
  await deleteProduct(productId);

  res.status(200).json({ messages: "Success deleted data" });
});

module.exports = router;
